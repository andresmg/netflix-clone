import './HomeScreen.css'
import React from 'react'
import Nav from '../../Nav/Nav'
import Banner from '../../Banner/Banner'
import Row from '../../Row/Row'
import requests from '../../../api/Request'

export default function HomeScreen() {
    return (
        <div className="homeScreen">
            <Nav />

            <Banner />


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
        </div>
    )
}
