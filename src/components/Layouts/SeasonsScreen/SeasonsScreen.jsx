import './SeasonsScreen.css'
import React, {useEffect, useState} from 'react'
import SelectInput from '../../SelectInput/SelectInput'
import axios from '../../../api/tmdb'
import Loading from '../../Loading/Loading'

function SeasonsScreen({showInfo}) {

    const [selectedSeason, setSelectedSeason] = useState('1')
    const [seasonEpisodes, setSeasonEpisodes] = useState([])
    const [allEpisodes, setAllEpisodes] = useState([])
    const [loading, setLoading] = useState(true)

    // console.log(seasonEpisodes)

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
        setLoading(!loading)
        // eslint-disable-next-line eqeqeq
        setSeasonEpisodes(episodesInfo?.filter(el => el?.season == 1))
    }

    const getSeasonInfo = (e) => {
        const season = e.target.value
        setSelectedSeason(season)
        // eslint-disable-next-line eqeqeq
        setSeasonEpisodes(allEpisodes?.filter(el => el?.season == season))
    }



    useEffect(() => {
        getEpisodesInfo(showInfo?.number_of_seasons)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showInfo])

    return (
        <>
            {!loading ?
                <div className="d-flex justify-content-center">
                    <Loading />
                </div>
                :
                <>
                    <div className="container-fluid SeasonsScreen__red">
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <h2 className="SeasonsScreen__season">Season {selectedSeason}</h2>
                                    <span className="SeasonsScreen__epiCount">{seasonEpisodes?.length} episodes</span>
                                </div>
                                <div className="col-6 col-sm-3">
                                    <SelectInput seasons={showInfo?.seasons} onChange={getSeasonInfo} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container SeasonsScreen">
                        <div className="row justify-content-between">
                            {seasonEpisodes?.map(el => (
                                <div className="col-12">
                                    <div className="row SeasonsScreen__row justify-content-between">
                                        <div className="col-12 col-sm-2">
                                            <div className="SeasonsScreen__img" style={{
                                                backgroundImage: `url(${process.env.REACT_APP_TMDB_IMAGE_BASE_URL + el?.still_path})`
                                            }}></div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <h2 className="SeasonsScreen__name">{el?.name}</h2>
                                            <p className="SeasonsScreen__overview">{el?.overview}</p>
                                        </div>
                                        <div className="col-12 col-sm-2">
                                            <p>Emitido el {(el?.air_date).split('-').reverse().join('/')}</p>
                                            <p className="SeasonsScreen__rate">
                                                <span className="SeasonsScreen__vote">{(el?.vote_average / 2).toFixed(1)} </span>
                                                 / 5
                                                <small>{el?.vote_count} votes</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr />
                    </div>
                </>
            }
        </>
    )
}

export default SeasonsScreen
