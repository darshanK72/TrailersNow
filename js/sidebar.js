'use strict';

import {fetchData} from './api.js';

export function generateSidebar(){

    const genreList = {};

    fetchData('https://api.themoviedb.org/3/genre/movie/list',function({genres}){
        
        for(const {id,name} of genres){
            genreList[id]=name;
        }

        generLink();

    });

    const sidebarInner = document.createElement("div");

    sidebarInner.classList.add('sidebar-inner');

    sidebarInner.innerHTML = `

        <div class="sidebar-list">

            <p class="title">Genre</p>

            <a href="./movie-list.html" menu-close class="sidebar-link">Action</a>
            <a href="./movie-list.html" menu-close class="sidebar-link">Horror</a>
            <a href="./movie-list.html" menu-close class="sidebar-link">Comedy</a>
            <a href="./movie-list.html" menu-close class="sidebar-link">Adventure</a>
            <a href="./movie-list.html" menu-close class="sidebar-link">Drama</a>
            <a href="./movie-list.html" menu-close class="sidebar-link">Sci-Fi</a>

        </div>

        <div class="sidebar-list">

            <p class="title">Language</p>

            <a href="./movie-list.html" menu-close class="sidebar-link">English</a>
            <a href="./movie-list.html" menu-close class="sidebar-link">Hindi</a>
            <a href="./movie-list.html" menu-close class="sidebar-link">French</a>
            <a href="./movie-list.html" menu-close class="sidebar-link">German</a>
            <a href="./movie-list.html" menu-close class="sidebar-link">Spanish</a>
            <a href="./movie-list.html" menu-close class="sidebar-link">Chinese</a>
            <a href="./movie-list.html" menu-close class="sidebar-link">Bengali</a>

        </div>

        <div class="sidebar-footer">
            <p class="copyright">
                Copyright 2023 <a href="#">darshanK72</a>
            </p>
            <img src="./img/tmdb-logo.svg" width="130" height="17" alt="the movie database logo">
        </div>

    `;

    const generLink = function(){

        for(const [genreId,genreName] of Object.entries(genreList)){
            
            const link = document.createElement('a');
            link.classList.add("sidebar-link");
            link.setAttribute("href","./movie-list.html");
            link.setAttribute("menu-close","");
            // link.setAttribute('onclick',`getMovieList("with_genres=${genreId}","${genreName}")`);
            link.textContent = genreName;

            sidebarInner.querySelectorAll('.sidebar-list')[0].appendChild(link);

        }

        const sidebar = document.querySelector("[sidebar]");

        sidebar.appendChild(sidebarInner);

        toggleSidebar(sidebar);

    }

    const toggleSidebar = function(sidebar){
        const sidebarTogglers = document.querySelectorAll('[menu-toggler]');
        const sidebarClose = document.querySelectorAll('[menu-close]');


        const sidebarBtn = document.querySelector('[menu-btn]');
        const overlay = document.querySelector('[overlay]');

        addEventOnElements(sidebarTogglers,'click',function(){
            sidebar.classList.toggle("active");

            sidebarBtn.classList.toggle("active");
            overlay.classList.toggle("active");
        });

        addEventOnElements(sidebarClose,'click',function(){
            sidebar.classList.remove("active");
            
            sidebarBtn.classList.remove("active");
            overlay.classList.remove("active");
        });
    }

    

}