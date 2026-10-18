import React from 'react'
import '../App.css'
import { getPerfume } from '../services/PerfumeAPI'
import { deletePerfume } from '../services/PerfumeAPI'
import { getAllPerfumes } from '../services/PerfumeAPI'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


const PerfumeDetails = () => {
    const navigate = useNavigate()
    const [perfume, setPerfume] = useState({})
    const { id } = useParams()
    useEffect(() => {
        const getPerfumeDetails = async () => {
            const data = await getPerfume(id)
            setPerfume(data)
        }

        getPerfumeDetails()
    }, [id])

    const handleDelete = async (id) => {
        try {
            await deletePerfume(id)
            navigate('/')
        } catch (error) {
            console.log("error deleting perfume")
        }
    }

    return (
        <div>
            <article key={perfume.id}>
                <header>
                    <h2> {perfume.perfume_name} </h2>
                </header>
                <ul>
                    <p> <strong> Top Note:</strong> {perfume.top_note} </p>
                    <p> <strong> Heart Note: </strong> {perfume.heart_note} </p>
                    <p> <strong> Base Note: </strong>{perfume.base_note} </p>
                    <p> <strong> Extra Touch: </strong> {perfume.extra_touch || 'None'} </p>
                    <p> <strong> Price: $</strong>{perfume.price} </p>
                </ul>
                <div className="perfume-buttons">
                    <Link to={`/edit/${perfume.id}`} role='button'> Edit Details </Link>
                    <button onClick={() => handleDelete(perfume.id)}> Delete </button>
                </div>
            </article>
        </div>
    )
}

export default PerfumeDetails