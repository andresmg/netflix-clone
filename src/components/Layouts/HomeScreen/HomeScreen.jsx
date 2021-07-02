import './HomeScreen.css'
import React, {useState} from 'react'
import Nav from '../../Nav/Nav'
import Banner from '../../Banner/Banner'
import Row from '../../Row/Row'
import requests from '../../../api/Request'
import axios from '../../../api/tmdb'
import SeasonsScreen from '../SeasonsScreen/SeasonsScreen'

export default function HomeScreen() {

    //https://api.themoviedb.org/3/tv/60625?api_key=e7703af8529a16f62fdbb9233adde3af&language=en-US


    const [showInfo, setShowInfo] = useState(false)
    const [info, setinfo] = useState([])

    const loadInfo = async (show) => {
        await axios.get(`${process.env.REACT_APP_TMDB_URL}tv/${show}?api_key=e7703af8529a16f62fdbb9233adde3af&language=en-US`)
            .then((show) => {
                setShowInfo(!showInfo)
                setinfo(show?.data)
            })
            .catch(error => console.log(error.message))
    }


    return (
        <div className="homeScreen">
            <Nav />

            <Banner onClick={loadInfo} hideInfo={() => setShowInfo(!showInfo)}/>

            {!showInfo &&
                <div className="container-fluid">
                    <Row
                        title="Netflix Originals"
                        fetchUrl={requests.fetchNetflixOriginals}
                        isLargeRow />
                    <Row
                        title="Top 10 Trending Now"
                        fetchUrl={requests.fetchTrending}
                        isTrending
                    />
                    <Row
                        title="Top Rated"
                        fetchUrl={requests.fetchTopRated}
                    />
                    <Row
                        title="Action Movies"
                        fetchUrl={requests.fetchActionMovies}
                    />
                    <Row
                        title="Comedy Movies"
                        fetchUrl={requests.fetchComedyMovies}
                    />
                    <Row
                        title="Horror Movies"
                        fetchUrl={requests.fetchHorrorMovies}
                    />
                    <Row
                        title="Romance Movies"
                        fetchUrl={requests.fetchRomanceMovies}
                    />
                    <Row
                        title="Documentaries"
                        fetchUrl={requests.fetchDocumentaries}
                    />
                </div>
            }
            {showInfo && <SeasonsScreen showInfo={info} />}
        </div>
    )
}
