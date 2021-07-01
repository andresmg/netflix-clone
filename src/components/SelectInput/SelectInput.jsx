import './SelectInput.css'

import React from 'react'

function SelectInput({seasons, onChange}) {

    return (
        <select className="form-select SelectInput" aria-label="show seasons" onChange={onChange}>
            {
                seasons?.map(el => 
                    (<option value={el?.season_number} selected={el?.season_number === 1}>Temporada {el?.season_number}</option>)
                )
            }
        </select>
    )
}

export default SelectInput
