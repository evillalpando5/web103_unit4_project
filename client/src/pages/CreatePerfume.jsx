import React from 'react'
import '../App.css'
import { createPerfume } from '../services/PerfumeAPI'
import { useState, useEffect } from 'react'
import calcPrice from '../utilities/calcprice.js'
import { topNotes, heartNotes, baseNotes, extraNotes } from '../utilities/notes.js'
import { baseNoteImages } from '../utilities/baseNoteImages.js'
import { useNavigate } from 'react-router-dom'

const CreatePerfume = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [topNote, setTop] = useState('Bergamot')
    const [heartNote, setHeart] = useState('Rose')
    const [baseNote, setBase] = useState('Vanilla')
    const [extraNote, setExtra] = useState([])
    const [error, setError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const price = calcPrice(topNote, heartNote, baseNote, extraNote[0] || '')

    const handleExtraNoteChange = (note, checked) => {
        const checkedNotes = checked ? [...extraNote, note] : extraNote.filter((n) => n != note)
        setExtra(checkedNotes)
        setError(checkedNotes.length > 1)
    }

    const handleCreatePerfume = async () => {
        if (extraNote.length > 1) {
            setError(true)
            return
        }
        const data = {
            perfume_name: name,
            top_note: topNote,
            heart_note: heartNote,
            base_note: baseNote,
            extra_touch: extraNote[0] || '',
            price: price
        }
        try {
            await createPerfume(data)
            console.log("Perfume has been created")
            setSuccessMessage('Perfume Updated!')
            setShowSuccess(true)

        } catch (error) {
            console.error('Error creating perfume: ', error)
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleCreatePerfume()
            }}>
                <article className='form'>
                    <div className='form-options'>
                        <legend><strong> Perfume Name: </strong></legend>

                        <input type="text" name="perfume_name" placeholder="Perfume Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <p> <strong>Price: </strong> <mark>${price.toFixed(2)}</mark></p>
                        <fieldset>
                            <legend><strong>Top Note: </strong></legend>
                            {topNotes.map((note) => (
                                <>
                                    <input type="radio" id={note} name="top_note" checked={topNote === note} onChange={() => setTop(note)} />
                                    <label htmlFor={note}>{note}</label>
                                </>

                            ))
                            }
                        </fieldset>
                        <fieldset>
                            <legend><strong>Heart Note:  </strong></legend>
                            {heartNotes.map((note) => (
                                <>
                                    <input type="radio" id={note} name="heart_note" checked={heartNote === note} onChange={() => setHeart(note)} />
                                    <label htmlFor={note}>{note}</label>
                                </>

                            ))
                            }
                        </fieldset>
                        <fieldset>
                            <legend><strong>Base Note:  </strong></legend>
                            {baseNotes.map((note) => (
                                <>
                                    <input type="radio" id={note} name="base_note" checked={baseNote === note} onChange={() => setBase(note)} />
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
                            value="Create Perfume"
                            disabled={error}
                        />
                    </div>
                    <div className='base-note-img'>
                        {baseNote && (
                            <img src={baseNoteImages[baseNote]} alt={baseNote} />
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
                            onClick={() => setShowSuccess(false)}
                        >X</button>
                        <h2>{successMessage}</h2>
                    </header>

                    <p>Your perfume has been created successfully!</p>

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

export default CreatePerfume