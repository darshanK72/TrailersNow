'use strict';

import {generateSidebar} from './sidebar.js';
import {fetchData} from './api.js'
import {createMovieCard} from "./movie-card.js";
import {search} from "./search.js"

generateSidebar();
search();

const pageContent = document.querySelector("[page-content]");

let currentPage = 1;
let totalPages = 0;
let urlParam = window.localStorage.getItem("urlParam");
let genreName = window.localStorage.getItem("genreName");

fetchData(`https://api.themoviedb.org/3/discover/movie?include_adult=false&page=${currentPage}&sort_by=popularity.desc&${urlParam}`,function({results:movieList,total_pages}){

    totalPages = total_pages;
    document.title = `${genreName} Movies - TrailersNow`;

    const movieListElement = document.createElement("section");

    movieListElement.classList.add("movie-list","genre-list");
    movieListElement.ariaLabel = `${genreName} Movies`;

    movieListElement.innerHTML = `
        <div class="title-wrapper">
            <h1 class="heading">All ${genreName} Movies</h1>
        </div>

        <div class="grid-list"></div>

        <button class="btn load-more" load-more>
            Load More
        </button>
    `;

    for(const movie of movieList){

        const movieCard = createMovieCard(movie);

        movieListElement.querySelector(".grid-list").appendChild(movieCard);
    }

    pageContent.appendChild(movieListElement);

    document.querySelector("[load-more]").addEventListener('click',function(){

        if(currentPage >= totalPages){
            this.style.display = 'none';
            return;
        }
        currentPage++;
        this.classList.add("loading");

        fetchData(`https://api.themoviedb.org/3/discover/movie?include_adult=false&page=${currentPage}&sort_by=popularity.desc&${urlParam}`,function({results:movieList}){
            document.querySelector("[load-more]").classList.remove("loading");

            for(const movie of movieList){

                const movieCard = createMovieCard(movie);
        
                movieListElement.querySelector(".grid-list").appendChild(movieCard);
            }
        });
    });

});
