// 'use strict';

/**
 * Adde Event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
    for (const element of elements) {
        element.addEventListener(eventType, callback);
    }
}

/**
 * Toggle search box in mobile or small screen
 */

const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers,'click',function(){
    searchBox.classList.toggle('active');
})

const getMovieDetail = function(id){
    if(localStorage.getItem("movieId")){
        localStorage.removeItem("movieId");
    }
    localStorage.setItem("movieId",String(id));
}

const getMovieList = function(urlParam,genreName){
    if(localStorage.getItem("urlParam")){
        localStorage.removeItem("urlParam");
    }

    if(localStorage.getItem("genreName")){
        localStorage.removeItem("genreName");
    }


    window.localStorage.setItem("urlParam",urlParam);
    window.localStorage.setItem("genreName",genreName);
}