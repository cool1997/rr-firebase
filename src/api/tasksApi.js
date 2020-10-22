import * as axios from 'axios'


const instance = axios.create({
  baseURL: `https://test-6d8f2.firebaseio.com`,
  timeout: 1000 * 5,
  origin: 'http://localhost:3000',
})


export const tasksApi = {
  getTasks() {
    return instance.get(`/list.json`)
  },
  
  createTask(task) {
    return instance.post(`/list.json`, task)
  },

  changeTask(id, title) {
    return instance.post(`/list/${id}.json`, {title})
  },

  deleteTask(id) {
    return instance.delete(`/list/${id}.json`)
  },
}