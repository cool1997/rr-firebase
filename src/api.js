import * as axios from 'axios'

import { setError } from './slice/appSlice'


const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://test-6d8f2.firebaseio.com`,
    timeout: 1000 * 5,
    origin: 'http://localhost:3000',
  })

  const onSuccess = (response) => response

  const onFail = (err) => {
    dispatch(setError(err.statusText))
    // throw new Error(err.statusText)
  }

  api.interceptors.response.use(onSuccess, onFail)

  return api
}


// export const tasksApi = {
//   getTasks() {
//     return createAPI(dispatch).get(`/list.json`)
//   },

//   createTask(task) {
//     return api.post(`/list.json`, task)
//   },

//   changeTask(id, title) {
//     return api.post(`/list/${id}.json`, { title })
//   },

//   deleteTask(id) {
//     return api.delete(`/list/${id}.json`)
//   },
// }


export default createAPI