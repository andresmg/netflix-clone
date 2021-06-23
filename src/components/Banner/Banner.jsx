import './Banner.css'
import React, {useEffect, useState} from 'react'
import axios from '../../api/tmdb'
import requests from '../../api/Request'

function Banner() {

    const [movie, setMovie] = useState([])

    const base_url = 'https://image.tmdb.org/t/p/original/'

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )

            return request
        }
        fetchData()
    }, [])

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    const getRate = (rate) => {
        const int = Math.trunc(rate)
        const getStars = document.querySelectorAll('.Banner__star')
        const decimal = rate % 1

        for (let i = 0; i < int; i++) {
            getStars[i].classList.add('full')
        }

        if (decimal >= 0.5) {
            document.querySelector('.Banner__star:not(.full)').classList.add('half')
        }

    }

    return (
        <header className="Banner" style={{
            backgroundImage: `url(${base_url}${movie?.backdrop_path})`
        }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-8 Banner__contents">
                        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
                        <div className="d-flex">
                            <button className="Banner__button play">Play trailer</button>
                            <button className="Banner__button info">More info</button>
                        </div>
                        <h4 className="Banner__description col-12 col-sm-6">
                            {truncate(movie?.overview, 150)}
                        </h4>
                        <div className="Banner__rating col-12 d-flex">
                            {getRate((movie?.vote_average / 2))}
                            <div className="Banner__star"></div>
                            <div className="Banner__star"></div>
                            <div className="Banner__star"></div>
                            <div className="Banner__star"></div>
                            <div className="Banner__star"></div>
                            <div className="Banner__vote">{(movie?.vote_average / 2).toFixed(1)}<span>({movie?.vote_count} votes)</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Banner__fadeBottom" />
        </header>
    )
}

export default Banner
