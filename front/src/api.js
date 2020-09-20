import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api'

axios.defaults.baseURL = API_URL
axios.defaults.timeout = 5000
axios.defaults.headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: cookies.get('Authorization'),
}

const registerApi = (args) => {
  return axios.post('/auth/users/', args)
}

const loginApi = (args) => {
  return axios.post('/auth/token/login/', args)
}

const listTodosApi = (args) => {
  return axios.get('/todos/', args)
}

const createTodoApi = (args) => {
  return axios.post('/todos/', args)
}

const updateTodoApi = (id, args) => {
  return axios.patch(`/todos/${id}/`, args)
}

const deleteTodoApi = (id, args) => {
  return axios.delete(`/todos/${id}/`)
}

export {
  axios,
  registerApi,
  loginApi,
  listTodosApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
}
