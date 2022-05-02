import React, {ChangeEvent, useEffect, useState} from 'react'
import axios from 'axios';
import {TodolistAPI, UpdateTaskPropertiesType} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistAPI.getToDos().then(data => setState(data))

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')

    const onClickHandler = () =>
        TodolistAPI.createToDo(title).then(data => setState(data.data))

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value)


    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'Title'} value={title} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>Add</button>
        </div>
    </div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')

    const onClickHandler = () => {
        TodolistAPI.deleteToDo(title).then(data => setState(data))
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value)

    return <div> {JSON.stringify(state)}
        <div>
            <input value={title} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>Add</button>
        </div>
    </div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [todolistId, setTodolistId] = useState('')

    const onClickHandler = () => {
        TodolistAPI.updateToDo(todolistId, title).then(data => setState(data))
        setTitle('')
        setTodolistId('')
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value)

    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) =>
        setTodolistId(e.currentTarget.value)

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'title'} value={title} onChange={onChangeTitle}/>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={onChangeTodolistId}/>
            <button onClick={onClickHandler}>Add</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const onClickHandler = () => {
        TodolistAPI.getTasks(todolistId).then(data => setState(data))
        setTodolistId('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setTodolistId(e.currentTarget.value)

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>Add</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [todolistId, setTodolistId] = useState('')

    const onClickHandler = () => {
        TodolistAPI.createTask(todolistId, title).then(data => setState(data))
        setTitle('')
        setTodolistId('')
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value)

    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) =>
        setTodolistId(e.currentTarget.value)

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'title'} value={title} onChange={onChangeTitle}/>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={onChangeTodolistId}/>
            <button onClick={onClickHandler}>Add</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState('')
    const [todolistId, setTodolistId] = useState('')

    const onClickHandler = () => {
        TodolistAPI.deleteTask(todolistId, taskId).then(data => setState(data))
        setTaskId('')
        setTodolistId('')
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
        setTaskId(e.currentTarget.value)

    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) =>
        setTodolistId(e.currentTarget.value)

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'taskId'} value={taskId} onChange={onChangeTitle}/>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={onChangeTodolistId}/>
            <button onClick={onClickHandler}>Add</button>
        </div>
    </div>
}


export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [updateTask, setUpdateTask] = useState<UpdateTaskPropertiesType>({
        title: '',
        description: '',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
    })
    const [taskId, setTaskId] = useState('')
    const [todolistId, setTodolistId] = useState('')

    const onClickHandler = () => {
        TodolistAPI.updateTask(todolistId, taskId, updateTask).then(data => setState(data))
        setUpdateTask({...updateTask, title: ''})
        setTaskId('')
        setTodolistId('')
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
        setUpdateTask({...updateTask, title: e.currentTarget.value})

    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) =>
        setTaskId(e.currentTarget.value)

    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) =>
        setTodolistId(e.currentTarget.value)

    return <div> {JSON.stringify(state)}
        <div>
            <div>
                <input placeholder={'title'} value={updateTask.title}
                       onChange={onChangeTitle}/>
            </div>
            <div>
                <input placeholder={'taskId'} value={taskId}
                       onChange={onChangeTaskId}/>
            </div>
            <div>
                <input placeholder={'todolistId'} value={todolistId}
                       onChange={onChangeTodolistId}/>
            </div>
            <button onClick={onClickHandler}>Add</button>
        </div>
    </div>
}