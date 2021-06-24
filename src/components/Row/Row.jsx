import './Row.css'
import React, {useState, useEffect} from 'react'
import axios from '../../api/tmdb'

function Row({title, fetchUrl, isLargeRow = false, isTrending = false}) {

    const [movies, setMovies] = useState([])

    const base_url = 'https://image.tmdb.org/t/p/original/'

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }

        fetchData()
    }, [fetchUrl])

    console.log(movies)

    const getYear = (date) => {
        return date.split('-')[0]
    }

    return (
        <div className="Row row">
            <h2>{title}</h2>
            <div className="Row__posters col-12">
                {!isTrending ? movies.map(movie =>
                    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) &&
                    (
                        <div className={`Row__poster col-sm-1 col-3 ${isLargeRow && 'Row__poster_large'}`} key={movie.id} style={{
                            backgroundImage: `url(${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path})`
                        }}>
                            <div className="Row__poster__movieInfo">
                                <h4>{movie?.original_name || movie?.name || movie?.title || movie?.original_tiitle} <span>({getYear(movie?.first_air_date || movie?.release_date)})</span></h4>
                                <p className="overview">{truncate(movie?.overview, 50)}</p>
                                <div className="Row__rating col-12 d-flex align-items-center">
                                    <div className="Row__vote">{(movie?.vote_average / 2).toFixed(1)}</div>
                                    <div className="Row__star full"></div>
                                </div>
                            </div>
                        </div>
                    )) : movies.slice(0, 10).map(movie =>
                        <div className="Row__poster col-sm-1 col-3 Row__poster__trending" key={movie.id} style={{
                            backgroundImage: `url(${base_url}${movie.poster_path})`
                        }}></div>
                    )}
            </div>
        </div>
    )
}

export default Row