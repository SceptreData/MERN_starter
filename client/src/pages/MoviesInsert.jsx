import React, { useState } from 'react'
import api from '../api'

import styled from 'styled-components'

const MoviesInsert = () => {
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
    const [time, setTime] = useState('')

    const resetState = () => {
        setName('')
        setRating('')
        setTime('')
    }

    const submitMovie = async () => {
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime }

        const res = await api.insertMovie(payload)
        window.alert(`added Movie ${name}`)
        resetState()
    }

    return (
        <Wrapper className="container">
            <Title>Create Movie</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <Label>Rating:</Label>
            <InputText
                type="number"
                step="0.1"
                lang="en-US"
                min="0"
                max="10"
                pattern="[0-9]+([,\.][0-9]+)?"
                value={rating}
                onChange={e => setRating(e.target.value)}
            />

            <Label>Time: </Label>
            <InputText
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
            />

            <Button onClick={submitMovie}>Add Movie</Button>
            <CancelButton href={'/movies/list'}>Cancel</CancelButton>
        </Wrapper>
    )


}




const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`


export default MoviesInsert