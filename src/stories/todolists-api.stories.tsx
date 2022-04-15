import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {TodolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}

const instance = axios.create({
    withCredentials: true,
    headers: {'API-KEY': 'd7f83afa-8c04-4518-b416-2095e558276e'},
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

// const settings = {
//     withCredentials: true,
//     headers: {'API-KEY': 'd7f83afa-8c04-4518-b416-2095e558276e'},
//     baseURL: 'https://social-network.samuraijs.com/api/1.1'
// }

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistAPI.getToDos().then(data => setState(data))

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'New ToDo'
        TodolistAPI.createToDo(title).then(data => setState(data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '56afa802-8d1b-4ccd-a7d6-e4193526bdb6'
        TodolistAPI.deleteToDo(todolistId).then(data => setState(data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = 'e5451848-8a4b-4191-b5d0-52c94fb88c65'
        const title = 'SUPER TODO-TODO'
        TodolistAPI.updateToDo(todolistId, title)
            .then(data => setState(data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

