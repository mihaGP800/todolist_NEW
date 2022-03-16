import {TaskType} from "../Todolist";
import {v1} from "uuid";

export const TaskReducer = (state: TaskType[], action: TaskReducerACType): TaskType[] => {
    switch (action.title) {
        case 'REMOVE-TASK': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TASK":{
            return [...state, {id: v1(), title: action.payload.title, isDone: false}]
        }
        default:
            return state
    }
}
type TaskReducerACType = removeTaskACType | addTaskACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string) => {
    return {
        title: 'REMOVE-TASK',
        payload: {id}
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => {
    return {
        title: 'ADD-TASK',
        payload: {title}
    } as const
}