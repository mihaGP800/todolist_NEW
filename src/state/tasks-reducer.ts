import {TasksStateType} from '../App';
import {
    addTodolistAC,
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodosACType
} from './todolists-reducer';
import {
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {AppRootStateType, AppThunk} from './store';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    newTask: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}
type setTasksACType = ReturnType<typeof setTasksAC>
export type TasksActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodosACType
    | setTasksACType

const initialState: TasksStateType = {
    // todo1ID: [],
    // todo2ID: [],
    // todo3ID: [],
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.newTask.todoListId];
            // return {...state, [action.newTask.todoListId]: [action.newTask, ...tasks]};
            return {
                ...state,
                [action.newTask.todoListId]: [action.newTask, ...state[action.newTask.todoListId]]
            }

        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOS': {
            const stateCopy = {...state}
            action.todos.forEach(el => stateCopy[el.id] = [])
            return stateCopy
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (newTask: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', newTask}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

export const fetchTasksTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}

export const deleteTasksTC = (todolistId: string, taskId: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}

export const addTasksTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                const newTask = res.data.data.item
                dispatch(addTaskAC(newTask))
            })
    }
}
export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        const currentTask = getState().tasks[todolistId].find(t => t.id === taskId)
        if (currentTask) {
            const model: UpdateTaskModelType = {
                title: currentTask.title,
                deadline: currentTask.deadline,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                status,
            }
            todolistsAPI.updateTask(todolistId, taskId, model)
                .then((res) => {

                    dispatch(changeTaskStatusAC(taskId, status, todolistId))
                })
        }
    }
}

// 1.
export const __changeTaskTitleTC = (taskId: string, title: string, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const currentTask = getState().tasks[todolistId].find(t => t.id === taskId)

    if (currentTask) {
        const model: UpdateTaskModelType = {
            deadline: currentTask.deadline,
            description: currentTask.description,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            status: currentTask.status,
            title,
        }
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => dispatch(changeTaskTitleAC(taskId, title, todolistId)))
    }
}


// 2. async await

export const _changeTaskTitleTC = (taskId: string, title: string, todolistId: string): AppThunk => async (dispatch, getState) => {

    const currentTask = getState().tasks[todolistId].find(t => t.id === taskId)

    if (currentTask) {
        const model: UpdateTaskModelType = {
            deadline: currentTask.deadline,
            description: currentTask.description,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            status: currentTask.status,
            title,
        }
        const res = await todolistsAPI.updateTask(todolistId, taskId, model)
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }
}


// 3. taskId --->task

export const changeTaskTitleTC = (task: TaskType, title: string, todolistId: string): AppThunk => async dispatch => {

    // const model: UpdateTaskModelType = {
    //     deadline: task.deadline,
    //     description: task.description,
    //     priority: task.priority,
    //     startDate: task.startDate,
    //     status: task.status,
    //     title,
    // }

    const {id, todoListId, order, addedDate, ...restPropsTask} = task
    const model = {...restPropsTask, title}

    const res = await todolistsAPI.updateTask(todolistId, task.id, model)
    dispatch(changeTaskTitleAC(task.id, title, todolistId))
}