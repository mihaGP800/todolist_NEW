import {FilterValuesType} from "../App";

export const FilterReducer = (state: FilterValuesType, action: changeFilterAC): FilterValuesType => {
    switch (action.title) {
        case 'CHANGE-FILTER': {
            return action.payload.value
        }
        default:
            return state
    }
}

type changeFilterAC = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType) => {
    return {
        title: 'CHANGE-FILTER',
        payload: {value}
    } as const
}