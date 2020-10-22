import { createSlice } from '@reduxjs/toolkit'
import { tasksApi } from '../api/tasksApi'


const initialState = {
    initialized: false,
    taskList: [],
}


const appSlice = createSlice({
    name: `app`,
    initialState,
    reducers: {
        initializedSuccess(state) {
            state.initialized = true
        },
        fetchTaskList(state, action) {
            state.taskList = action.payload
        },
        addTask(state, action) {
            state.taskList = [...state.taskList, action.payload]
        },
        removeTask(state, action) {
            state.taskList = state.taskList.filter(task => action.payload !== task.id)
        }
    }
})


export const {
    initializedSuccess,
    fetchTaskList,
    addTask,
    removeTask
} = appSlice.actions


export const initializeApp = () => async (dispatch) => {
    try {
        const res = await tasksApi.getTasks()
        const payload = Object.keys(res.data || {}).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        })
        dispatch(fetchTaskList(payload))
        dispatch(initializedSuccess())
    } catch (err) {
        throw new Error(err.message)
    }
}

export const addNewTask = (title) => async (dispatch) => {
    try {
        const task = {
            title,
            date: new Date().toJSON()
        }
        const res = await tasksApi.createTask({ ...task })
        dispatch(addTask({ ...task, id: res.data.name }))
    } catch (err) {
        throw new Error(err.message)
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try {
        await tasksApi.deleteTask(id)
        dispatch(removeTask(id))
    } catch (err) {
        throw new Error(err.message)
    }
}


export default appSlice.reducer