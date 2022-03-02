import React, {useState} from 'react';
import './App.css';
import {Header} from "./Header/Header";
import {Input} from "./Input/Input";
import {v1} from "uuid";
import {TaskList} from "./TaskList/TaskList";
import {FilterPanel} from "./FilterPanel/FilterPanel";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type filterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'task1', isDone: true},
        {id: v1(), title: 'task2', isDone: false},
        {id: v1(), title: 'task3', isDone: false},
    ])

    let [textInput, setTextInput] = useState<string>('')
    let [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const textInputTrim = textInput.trim()
        if (textInputTrim !== '') {
            setTasks([{id: v1(), title: textInputTrim, isDone: false}, ...tasks])
        } else {
            setError(true)
        }
        setTextInput('')
    }

    const deleteTask = (id: string) => {
        const tasksAfterFilter = tasks.filter(task => task.id !== id)
        setTasks(tasksAfterFilter)
    }

    const changeStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
    }


    let [filter, setFilter] = useState<filterType>('all')

    const changeFilter = (filter: filterType) => {
        setFilter(filter)
    }

    const filteredTasks = () => {
        if (filter === 'active') {
            return tasks.filter(task => !task.isDone)
        } else if (filter === 'completed') {
            return tasks.filter(task => task.isDone)
        } else {
            return tasks
        }
    }

    const tasksAfterFilteredTasks = filteredTasks()

    return (
        <div>
            <Header filter={filter} title={'My tasks for a day'}/>
            <Input addTask={addTask}
                   textInput={textInput}
                   setTextInput={setTextInput}
                   setError={setError}
                   error={error}/>
            <TaskList changeStatus={changeStatus}
                      tasks={tasksAfterFilteredTasks}
                      deleteTask={deleteTask}
                      filter={filter}/>
            <FilterPanel filter={filter} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
