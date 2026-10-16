


const getAllPerfumes = async () => {
    const response = await fetch('/perfumes')
    const data = await response.json()
    return data
}

const getPerfume = async (id) => {
    const response = await fetch(`/perfumes/${id}`)
    const data = await response.json()
    return data
}

const createPerfume = async (perfume) => {
    const response = await fetch('/perfumes', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(perfume)
    })
    const data = await response.json()
    return data
}

const updatePerfume = async (id, perfume) => {
    const response = await fetch(`/perfumes/${id}`, {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(perfume)
    })
    const data = await response.json()
    return data
}

const deletePerfume = async (id) => {
    const response = await fetch(`/perfumes/${id}`, {
        method: 'DELETE',
    })
    const data = await response.json()
    return data
}

export {getAllPerfumes, getPerfume, createPerfume, updatePerfume, deletePerfume}