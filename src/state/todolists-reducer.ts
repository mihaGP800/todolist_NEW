import {Dispatch} from 'redux';
import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {AppActionsType, AppThunk} from './store';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type setTodosACType = ReturnType<typeof setTodosAC>

export type TodolistsActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodosACType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOS':
            return action.todos.map(el => ({...el, filter: 'all'}))
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolistId: string, title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const setTodosAC = (todos: TodolistType[]) => ({type: 'SET-TODOS', todos} as const)

/////Thunk

export const _fetchTodosTC = (): AppThunk => (dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => dispatch(setTodosAC(res.data)))
}

export const fetchTodosTC = (): AppThunk => async dispatch => {
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodosAC(res.data))
    } catch (e) {
        throw new Error(`response fail: ${e}`)
    }
}

export const _removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => dispatch(removeTodolistAC(todolistId)))
}

export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    const res = await todolistsAPI.deleteTodolist(todolistId)
    dispatch(removeTodolistAC(todolistId))
}

export const _addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => dispatch(addTodolistAC(res.data.data.item.id, title)))
}

export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    const res = await todolistsAPI.createTodolist(title)
    dispatch(addTodolistAC(res.data.data.item.id, title))
}

export const _changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title)
        .then(res => dispatch(changeTodolistTitleAC(id, title)))
}

export const changeTodolistTitleTC = (id: string, title: string): AppThunk => async dispatch => {
    const res = await todolistsAPI.updateTodolist(id, title)
    dispatch(changeTodolistTitleAC(id, title))
}




