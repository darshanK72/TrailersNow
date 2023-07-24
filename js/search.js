'use strict';

import { fetchData } from './api.js'
import { createMovieCard } from "./movie-card.js";

export function search() {

    let searchWrapper = document.querySelector("[search-wrapper]");
    let searchField = document.querySelector("[search-field]");

    const searchModel = document.createElement("div");
    searchModel.classList.add("search-model");

    document.querySelector("main").appendChild(searchModel);

    let searchTimeout;

    searchField.addEventListener('input', function () {

        let query = searchField.value.trim();

        if (!query) {
            searchModel.classList.remove("active");
            searchWrapper.classList.remove("searching");
            clearTimeout(searchTimeout);
            return;
        }

        searchWrapper.classList.add("searching");
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(function () {

            fetchData(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&page=1`, function ({ results: movieList }) {

                searchWrapper.classList.remove("searching");
                searchModel.classList.add("active");

                searchModel.innerHTML = `

                    <p class="label">Results for</p>

                    <h1 class="heading">${searchField.value.trim()}</h1>

                    <div class="movie-list">

                        <div class="grid-list"></div>

                    </div>
                `;

                console.log(movieList);

                for (const movie of movieList) {
                    console.log(movie);
                    const movieCard = createMovieCard(movie);
                    searchModel.querySelector(".grid-list").appendChild(movieCard);
                }

            });

        }, 500)

    })
}
