import React from 'react'
import '../App.css'
import { updatePerfume, getPerfume } from '../services/PerfumeAPI'
import { useState, useEffect } from 'react'
import calcPrice from '../utilities/calcprice.js'
import { topNotes, heartNotes, baseNotes, extraNotes } from '../utilities/notes.js'
import { useNavigate, useParams } from 'react-router-dom'
import { baseNoteImages } from '../utilities/baseNoteImages.js'

const EditPerfume = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const [perfume, setPerfume] = useState({
        perfume_name: '',
        top_note: '',
        heart_note: '',
        base_note: '',
        extra_touch: '',
        price: 0
    })
    const price = calcPrice(perfume.top_note, perfume.heart_note, perfume.base_note, perfume.extra_touch)
    const [error, setError] = useState(false)
    const [extraNote, setExtra] = useState([])
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const handleExtraNoteChange = (note, checked) => {
        const checkedNotes = checked ? [...extraNote, note] : extraNote.filter((n) => n != note)
        setExtra(checkedNotes)
        setError(checkedNotes.length > 1)
    }

    useEffect(() => {
        const getPerfumeDetails = async () => {
            const data = await getPerfume(id)
            setPerfume(data)
            setExtra(data.extra_touch ? [data.extra_touch] : [])
        }
        getPerfumeDetails()
    }, [id])

    const handleUpdatePerfume = async () => {
        if (extraNote.length > 1) {
            setError(true)
            return
        }
        try {
            await updatePerfume(id, perfume)
            console.log("Perfume has been updated")
            setSuccessMessage('Perfume Updated!')
            setShowSuccess(true)

        } catch (error) {
            console.error('Error updating perfume: ', error)
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleUpdatePerfume()
            }}>
                <article className='form'>
                    <div className='form-options'>
                        <legend><strong> Perfume Name: </strong></legend>

                        <input type="text" name="perfume_name" placeholder="Perfume Name" value={perfume.perfume_name} onChange={(e) => setPerfume({ ...perfume, perfume_name: e.target.value })} required />
                        <p> <strong>Price: </strong> <mark>${price.toFixed(2)}</mark></p>
                        <fieldset>
                            <legend><strong>Top Note: </strong></legend>
                            {topNotes.map((note) => (
                                <>
                                    <input type="radio" id={note} name="top_note" checked={note === perfume.top_note} onChange={() => setPerfume({ ...perfume, top_note: note })} />
                                    <label htmlFor={note}>{note}</label>
                                </>

                            ))
                            }
                        </fieldset>
                        <fieldset>
                            <legend><strong>Heart Note:  </strong></legend>
                            {heartNotes.map((note) => (
                                <>
                                    <input type="radio" id={note} name="heart_note" checked={note === perfume.heart_note} onChange={() => setPerfume({ ...perfume, heart_note: note })} />
                                    <label htmlFor={note}>{note}</label>
                                </>

                            ))
                            }
                        </fieldset>
                        <fieldset>
                            <legend><strong>Base Note:  </strong></legend>
                            {baseNotes.map((note) => (
                                <>
                                    <input type="radio" id={note} name="base_note" checked={note === perfume.base_note} onChange={() => setPerfume({ ...perfume, base_note: note })} />
                                    <label htmlFor={note}>{note}</label>
                                </>

                            ))
                            }
                        </fieldset>
                        <fieldset>
                            <legend> <strong> Extra Notes: Only select one. </strong></legend>
                            {extraNotes.map((note) => (
                                <>
                                    <input type="checkbox" id={note} name={note} checked={extraNote.includes(note)} onChange={(e) => handleExtraNoteChange(note, e.target.checked)} />
                                    <label htmlFor={note}>{note}</label>
                                </>

                            ))}
                            {error && <p style={{ color: ' rgb(200, 230, 255)', marginTop: '5px', }}> <strong>PLEASE ONLY SELECT ONE EXTRA NOTE</strong></p>}
                        </fieldset>

                        <input
                            type="submit"
                            value="Update Perfume"
                            disabled={error}
                        />
                    </div>
                    <div className='base-note-img'>
                        {perfume.base_note && (
                            <img src={baseNoteImages[perfume.base_note]} alt={perfume.base_note} />
                        )}
                    </div>
                </article>
            </form>
            <dialog open={showSuccess}>
                <article>
                    <header>
                        <button
                            aria-label="Close"
                            rel="prev"
                            onClick={() => setShowSuccess(false)}>
                            
                        X</button>
                        <h2>{successMessage}</h2>
                    </header>
                    <p>Your perfume has been updated successfully!</p>
                    <footer>
                        <button onClick={() => navigate('/perfumes')}>
                            View Perfumes
                        </button>
                    </footer>
                </article>
            </dialog>
        </div>
    )
}

export default EditPerfume