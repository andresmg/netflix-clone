import './SeasonsScreen.css'
import React, {useEffect, useState} from 'react'
import SelectInput from '../SelectInput/SelectInput'
import axios from '../../api/tmdb'

function SeasonsScreen({showInfo}) {

    const [selectedSeason, setSelectedSeason] = useState('1')
    const [selectedSeasonEpisodes, setSelectedSeasonEpisodes] = useState('')
    const [seasonEpisodes, setSeasonEpisodes] = useState([])
    const [allEpisodes, setAllEpisodes] = useState([])

    console.log(seasonEpisodes)

    const getEpisodesInfo = async (seasons) => {

        const episodesInfo = []

        for (let i = 0; i < seasons; i++) {
            for (let j = 1; j <= showInfo?.seasons[i]?.episode_count; j++) {
                await axios.get(`${process.env.REACT_APP_TMDB_URL}tv/${showInfo?.id}/season/${i + 1}/episode/${j}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
                    .then((episode) => {
                        episodesInfo.push({
                            season: i + 1,
                            air_date: episode?.data?.air_date,
                            name: episode?.data?.name,
                            overview: episode?.data?.overview,
                            id: episode?.data?.id,
                            still_path: episode?.data?.still_path,
                            vote_average: episode?.data?.vote_average,
                            vote_count: episode?.data?.vote_count
                        })
                    })
                    .catch(error => console.log(error.message))
            }
        }
        setAllEpisodes(episodesInfo)
        setSeasonEpisodes(episodesInfo?.filter(el => el?.season == 1))
    }

    const getSeasonInfo = (e) => {
        console.log(seasonEpisodes)
        const season = e.target.value
        setSelectedSeason(season)
        setSeasonEpisodes(allEpisodes?.filter(el => el?.season == season))
    }



    useEffect(() => {
        getEpisodesInfo(showInfo?.number_of_seasons)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showInfo])

    return (
        <>
            <div className="container SeasonsScreen" >
                <div className="row justify-content-between">
                    <div className="col-6">
                        <h2>Temporada {selectedSeason}</h2>
                        <span>{selectedSeasonEpisodes} episodios</span>
                    </div>
                    <div className="col-6 col-sm-3">
                        <SelectInput seasons={showInfo?.seasons} onChange={getSeasonInfo} />
                    </div>
                    {seasonEpisodes?.map(el => (
                        <div className="col-12">
                            <div className="row SeasonsScreen__row">
                                <div className="col-12 col-sm-2">
                                    <img className="SeasonsScreen__img" src={process.env.REACT_APP_TMDB_IMAGE_BASE_URL + el.still_path} alt={el.name} />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <h2 className="SeasonsScreen__name">{el.name}</h2>
                                    <p className="SeasonsScreen__overview">{el.overview}</p>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <p>{(el.air_date).split('-').reverse().join('/')}</p>
                                    <p>{(el.vote_average / 2).toFixed(1)}<span> / 5 </span></p>
                                    <small>{el.vote_count} votes</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
            </div>
        </>
    )
}

export default SeasonsScreen
