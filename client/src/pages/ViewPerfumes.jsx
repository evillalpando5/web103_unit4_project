import React from 'react'
import '../App.css'
import { getAllPerfumes } from '../services/PerfumeAPI'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const ViewPerfumes = () => {
    const [perfumes, setPerfumes] = useState([])
    useEffect(() => {
        const allPerfumes = async () => {
            const data = await getAllPerfumes()
            setPerfumes(data)
        }

        allPerfumes()
    }, [])


    return (
        <div>
            {perfumes.map((perfume) => (
                <article key={perfume.id}>
                    <header>
                        <h2> {perfume.perfume_name} </h2>
                    </header>
                    <ul>
                        <h3> {perfume.description} </h3>
                        <p> <strong> Top Note:</strong> {perfume.top_note} </p>
                        <p> <strong> Heart Note: </strong> {perfume.heart_note} </p>
                        <p> <strong> Base Note: </strong>{perfume.base_note} </p>
                        <p> <strong> Extra Touch: </strong> {perfume.extra_touch || 'None'} </p>
                        <p> <strong> Price: </strong>{perfume.price} </p>
                    </ul>
                    <Link to={`/details/${perfume.id}`} role='button'> View Details </Link>
                </article>
            ))
            }
        </div>
    )
}

export default ViewPerfumes