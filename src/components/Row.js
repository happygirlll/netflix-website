import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/Row.css';

export default function Row({ title, fetchUrl, isLargeRow, id }) {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await axios.get(fetchUrl);
                setMovies(data.results || []);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [fetchUrl]);


    const getImageUrl = (movie) => {
        const BASE_URL = 'https://image.tmdb.org/t/p/original/';
        return `${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path
            }`;
    };

    return (
        <section className="row">
            <h2 className="row-title">{title}</h2>

            <div className="slider-container">
                <button className="slider-arrow left-arrow">{"<"}</button>

                <div id={id} className="posters-container">
                    {movies.map((movie) => (
                        <img
                            key={movie.id}
                            className={`poster ${isLargeRow ? "large-poster" : ""}`}
                            src={getImageUrl(movie)}
                            alt={movie.name || movie.title || "Movie"}
                            loading="lazy" 
                        />
                    ))}
                </div>

                <button className="slider-arrow right-arrow">{">"}</button>
            </div>
        </section>
    )
}
