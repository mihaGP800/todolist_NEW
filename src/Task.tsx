import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './Todolist';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';

type TaskPropsType = {
    task: TaskType
    todoListID: string
    // removeTask: (taskId: string, todolistId: string) => void
    // changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    // changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo(({task, todoListID}: TaskPropsType) => {
    console.log('Task')

    const dispatch = useDispatch()

    const onClickHandler = useCallback(() =>dispatch(removeTaskAC(task.id, todoListID)), [dispatch, task.id, todoListID])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todoListID));
    }, [dispatch, task.id, todoListID])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todoListID));
    }, [dispatch, task.id, todoListID])


    return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>

})