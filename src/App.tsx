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

    const addTask = () => {
        textInput.trim() !== '' &&
        setTasks([{id: v1(), title: textInput, isDone: false}, ...tasks])
        setTextInput('')
    }

    const deleteTask = (id: string) => {
        const tasksAfterFilter = tasks.filter(task => task.id !== id)
        setTasks(tasksAfterFilter)
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
            <Input addTask={addTask} textInput={textInput} setTextInput={setTextInput}/>
            <TaskList tasks={tasksAfterFilteredTasks} deleteTask={deleteTask}/>
            <FilterPanel filter={filter} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
