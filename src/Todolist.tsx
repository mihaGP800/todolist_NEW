import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo(({
                                        removeTodolist, removeTask, addTask,
                                        changeTodolistTitle, changeTaskTitle,
                                        changeTaskStatus, changeFilter,
                                        filter, title, id, tasks
                                    }: PropsType) => {

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }


    console.log('Todolist')
    const addTaskHandler = useCallback((title: string) => addTask(title, id), [addTask, id])
    const removeTodolistHandler = useCallback(() => removeTodolist(id), [removeTodolist, id])
    const changeTodolistTitleHandler = useCallback((title: string) => changeTodolistTitle(id, title), [changeTodolistTitle, id])


    const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id]);
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id]);


    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id}
                                                task={t}
                                                changeTaskStatus={changeTaskStatus}
                                                changeTaskTitle={changeTaskTitle}
                                                removeTask={removeTask}
                                                todoListID={id}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


