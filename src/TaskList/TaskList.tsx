import React, {ChangeEvent} from 'react';
import {filterType, TasksType} from "../App";
import {Button} from "../Button/Button";
import s from "./TaskList.module.css";

type TaskListType = {
    tasks: Array<TasksType>
    deleteTask: (id: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: filterType
}

export const TaskList: React.FC<TaskListType> = ({tasks, deleteTask, changeStatus, filter, ...props}) => {
    const taskComponent = tasks.map(t => {
            const callback = () => deleteTask(t.id);
            const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                changeStatus(t.id, e.currentTarget.checked)
            }
            return <li className={t.isDone ? s.completedTask : s.activeTask} key={t.id}>
                <input checked={t.isDone} type="checkbox" onChange={onChangeCheckbox}/>
                {t.title}
                <Button className={s.buttonRemove} name={'x'} callback={callback}/>
            </li>;
        }
    )
    const taskListOrError = taskComponent.length
        ? <ul>{taskComponent}</ul>
        : <div className={s.errorMessage}>{filter} tasklist is empty</div>
    return (
        <>
            {taskListOrError}
        </>
    );
}