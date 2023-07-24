'use strict';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDYwMTBjY2YxODkzODM5NDIwN2Y5ZGY5ZmU3YmNkMSIsInN1YiI6IjY0YmI2NDdlNThlZmQzMDBmZjFhYmE4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4medMn1JYdEBzh_oz8LRtB1Pm9GF_ibDwNhDVwoG2oc';
const imageBaseUrl = 'https://image.tmdb.org/t/p/';

const fetchData = function (url, callback, optionalParam) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    

    fetch(url,options)
        .then(response => response.json())
        .then(data => {
            return callback(data,optionalParam)
        });

}

export { imageBaseUrl, fetchData }