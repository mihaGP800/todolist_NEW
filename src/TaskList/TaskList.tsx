import React from 'react';
import {TasksType} from "../App";
import {Button} from "../Button/Button";
import s from "./TaskList.module.css";

type TaskListType = {
    tasks: Array<TasksType>
    deleteTask: (id: string) => void
}

export const TaskList: React.FC<TaskListType> = ({tasks, deleteTask, ...props}) => {
    return (
        <ul>
            {tasks.map(task => {
                    const callback = () => deleteTask(task.id);
                    return <li key={task.id}>
                        <input checked={task.isDone} type="checkbox"/>
                        {task.title}
                        <Button className={s.buttonRemove} name={'x'} callback={callback}/>
                    </li>;
                }
            )}
        </ul>
    );
}