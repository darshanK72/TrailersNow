'use strict';

import {generateSidebar} from './sidebar.js';
import {imageBaseUrl,fetchData} from './api.js'
import {createMovieCard} from "./movie-card.js";
import {search} from "./search.js"

const pageContent = document.querySelector('[page-content]');

generateSidebar();
search();

const homePageSections = [
    {
        title:"Upcoming Movies",
        path:"/movie/upcoming?page=1"
    },
    {
        title:"Weeks\'s Trending Movies",
        path:"/trending/movie/week"
    },
    {
        title:"Top Rated Movies",
        path:"/movie/top_rated?page=1"
    }
]

const genreList = {

    asString(generList){
        let newGenerList = [];

        for(const genreId of generList){
            this[genreId] && newGenerList.push(this[genreId]);//this = gelerList
        }
        return newGenerList.join(", ");
    }

};

fetchData('https://api.themoviedb.org/3/genre/movie/list',function({genres}){
        
    for(const {id,name} of genres){
            genreList[id]=name;
    }

    fetchData('https://api.themoviedb.org/3/movie/popular?page=1',heroBanner);

 
});

const heroBanner = function({results:movieList}){

    const banner = document.createElement('section');
    banner.classList.add('banner');
    banner.setAttribute("aria-label","popular movies");

    banner.innerHTML = `
        <div class="banner-slider">
        </div>

        <div class="slider-control">

            <div class="control-inner">
            </div>

        </div>
    `;

    let controlItemIndex = 0;

    for(const [index,movie] of movieList.entries()){

        const {
            backdrop_path,
            title,
            release_date,
            genre_ids,
            overview,
            poster_path,
            vote_average,
            id
        } = movie;

        const sliderItem = document.createElement('div');
        sliderItem.classList.add("slider-item");
        sliderItem.setAttribute('slider-item','');

        sliderItem.innerHTML = `

                <img src="${imageBaseUrl}w1280${backdrop_path}" alt="${name}" class="img-cover" loading="${index === 0 ? 'eager':'lazy'}">

                <div class="banner-content">

                    <h2 class="heading">
                        ${title}
                    </h2>

                    <div class="meta-list">
                        <div class="meta-item">${release_date.split('-')[0]}</div>
                        <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
                    </div>

                    <p class="genre">${genreList.asString(genre_ids)}</p>

                    <p class="banner-text">
                        ${overview}
                    </p>

                    <a href="./detail.html" class="btn" onclick="getMovieDetail(${id})">
                        <img src="./img/play_circle.png" height="24" width="24" aria-hidden="true"
                            alt="play circle">
                        <span class="span">Watch Now</span>
                    </a>

                </div>
        
        `;

        banner.querySelector(".banner-slider").appendChild(sliderItem);

        const controlItem = document.createElement("button");
        controlItem.classList.add("poster-box","slider-item");
        controlItem.setAttribute("slider-control",`${controlItemIndex}`)

        controlItemIndex++;

        controlItem.innerHTML = `
                <img src="${imageBaseUrl}w154${poster_path}" alt="${name}" loading="lazy"
                draggable="false" class="img-cover">
        `;

        banner.querySelector(".control-inner").appendChild(controlItem);
    }

    pageContent.appendChild(banner);

    addHeroSlide();

    for(const {title,path} of homePageSections){
        fetchData(`https://api.themoviedb.org/3${path}`,createMovieList,title);
    }

}

const addHeroSlide = function(){

    const sliderItem = document.querySelectorAll("[slider-item]");

    const sliderControl = document.querySelectorAll("[slider-control]");

    let lastSliderItem = sliderItem[0];
    let lastSliderControl = sliderControl[0];

    lastSliderItem.classList.add("active");
    lastSliderControl.classList.add("active");

    const sliderStart = function(){
        lastSliderItem.classList.remove("active");
        lastSliderControl.classList.remove("active");

        sliderItem[Number(this.getAttribute("slider-control"))].classList.add("active");
        this.classList.add("active");

        lastSliderItem = sliderItem[Number(this.getAttribute("slider-control"))];
        lastSliderControl = this;
    }

    addEventOnElements(sliderControl,'click',sliderStart);
    

}

const createMovieList = function({results:movieList},title){
    const movieListElement = document.createElement("section");
    movieListElement.classList.add("movie-list");
    movieListElement.ariaLabel = `${title}`;

    movieListElement.innerHTML = `

        <div class="title-wrapper">
            <h3 class="title-large">${title}</h3>
        </div>

        <div class="slider-list">

            <div class="slider-inner">
                
            </div>
        </div>
    `;

    for(const movie of movieList){
        const movieCard = createMovieCard(movie);
        movieListElement.querySelector(".slider-inner").appendChild(movieCard);
    }

    pageContent.appendChild(movieListElement);
}


