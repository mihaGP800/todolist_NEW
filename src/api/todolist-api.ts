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
type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}

type ResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
}

type TasksType = {
    items: TaskType[];
    totalCount: number;
    error: string | null;
}

export type UpdateTaskPropertiesType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const TodolistAPI = {
    getToDos: () => instance
        .get<TodolistType[]>('todo-lists')
        .then(res => res.data),

    createToDo: (title: string) => instance
        .post<any, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>
        ('todo-lists', {title})
        .then(res => res.data),

    deleteToDo: (todolistId: string) => instance
        .delete<ResponseType>(`todo-lists/${todolistId}`)
        .then(res => res.data),

    updateToDo: (todolistId: string, title: string) => instance
        .put<ResponseType>(`todo-lists/${todolistId}`, {title})
        .then(res => res.data),

    getTasks: (todolistId: string) => instance
        .get<TasksType>(`todo-lists/${todolistId}/tasks`)
        .then(res => res.data),

    createTask: (todolistId: string, title: string) => instance
        .post<ResponseType<{ item: TaskType }>>
        (`todo-lists/${todolistId}/tasks`, {title})
        .then(res => res.data),

    deleteTask: (todolistId: string, taskId: string) => instance
        .delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
        .then(res => res.data),

    updateTask: (todolistId: string, taskId: string, updateTask: UpdateTaskPropertiesType) => instance
        .put<any, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskPropertiesType>(`todo-lists/${todolistId}/tasks/${taskId}`, updateTask)
        .then(res => res.data)
}