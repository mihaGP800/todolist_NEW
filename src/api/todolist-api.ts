import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    withCredentials: true,
    headers: {'API-KEY': 'f3f54432-d8c8-49d7-98bb-7ebfd06f7be2'},
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
})

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}
type EditToDoType<D = {}> = {
    data: D
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
}

export const TodolistAPI = {
    getToDos: () => instance
        .get<TodolistType[]>('todo-lists')
        .then(res => res.data),

    createToDo: (title: string) => instance
        .post<any, AxiosResponse<EditToDoType<{ item: TodolistType }>>, { title: string }>
        ('todo-lists', {title})
        .then(res => res.data),

    deleteToDo: (todolistId: string) => instance
        .delete<EditToDoType>(`todo-lists/${todolistId}`)
        .then(res => res.data),

    updateToDo: (todolistId: string, title: string) => instance
        .put<EditToDoType>(`todo-lists/${todolistId}`, {title})
        .then(res => res.data)


}