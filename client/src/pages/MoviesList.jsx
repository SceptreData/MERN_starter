import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'



const MoviesList = () => {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await api.getAllMovies()
            setMovies(movies.data.data)
            setIsLoading(false)
        }

        setIsLoading(true)
        fetchMovies()
    }, [])


    console.log("MovieList:", movies)

    const columns = [
        {
            Header: 'ID',
            accessor: '_id',
            filterable: true,
        },
        {
            Header: 'Name',
            accessor: 'name',
            filterable: true,
        },
        {
            Header: 'Rating',
            accessor: 'rating',
            filterable: true,
        },
        {
            Header: 'Time',
            accessor: 'time',
            Cell: props => <span>{props.value.join(' / ')}</span>,
        },
        {
            Header: '',
            accessor: '',
            Cell: props => (
                <span>
                    <DeleteMovie id={props.original._id} />
                </span>
            ),
        },
        {
            Header: '',
            accessor: '',
            Cell: props => (
                <span>
                    <UpdateMovie id={props.original._id} />
                </span>
            ),

        },
    ]


    if (!movies.length) return null

    return (
        <Wrapper>
            <ReactTable
                data={movies}
                columns={columns}
                loading={isLoading}
                defaultPageSize={10}
                showPageSizeOptions={true}
                minRows={0}
            />
        </Wrapper>
    )

}

const UpdateMovie = ({ id }) => (
    <Update onClick={e => {
        e.preventDefault()
        window.location.href = `/movies/update/${id}`
    }}>
        Update
    </Update>
)

const DeleteMovie = ({ id }) => (
    <Delete onClick={e => {
        e.preventDefault()
        if (window.confirm("You sure you want to delete this??")) {
            api.deleteMovieById(id)
            window.location.reload()
        }
    }}>
        Delete
    </Delete>
)



const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`

export default MoviesList