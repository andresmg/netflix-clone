import './Loading.css'
import React from 'react'
import GridLoader from "react-spinners/GridLoader"

function Loading({size}) {
    return (
        <div className="Loading">
            <GridLoader size={size} margin={5} color={"#e50914"} />
        </div>
    )
}

export default Loading
