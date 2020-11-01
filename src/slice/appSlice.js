import { createSlice } from '@reduxjs/toolkit'
// import { createAPI } from '../api'
// import { tasksApi } from '../api'


const initialState = {
	initialized: false,
	error: null,
	taskList: [],
}


const appSlice = createSlice({
	name: `app`,
	initialState,
	reducers: {
		initializedSuccess(state) {
			state.initialized = true
		},
		setError(state, action) {
			state.error = action.payload
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
	setError,
	fetchTaskList,
	addTask,
	removeTask
} = appSlice.actions


export const initializeApp = () => async (dispatch, _, api) => {
	// const res = await tasksApi.getTasks()
	const res = await api.get(`/list.json`)
	const payload = Object.keys(res.data || {}).map(key => {
		return {
			...res.data[key],
			id: key
		}
	})
	dispatch(fetchTaskList(payload))
	dispatch(initializedSuccess())
}

export const addNewTask = (title) => async (dispatch, _, api) => {
	const task = {
		title,
		date: new Date().toJSON()
	}
	// const res = await tasksApi.createTask({ ...task })
	const res = await api.post(`/list.json`, task)
	dispatch(addTask({ ...task, id: res.data.name }))
}

export const deleteTask = (id) => async (dispatch, _, api) => {
	// await tasksApi.deleteTask(id)
	await api.delete(`/list/${id}.json`)
	dispatch(removeTask(id))
}


export default appSlice.reducer