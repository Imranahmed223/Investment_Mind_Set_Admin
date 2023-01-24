import axios from 'axios'

const token = window.localStorage.getItem('token');

const api = axios.create({
  baseURL: process.env.REACT_APP_ROOT,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  },
  //   withCredentials: true,
  credentials: "same-origin",
});
export const register = (data) => api.post('/admin', { ...data })
export const login = (data) => api.post('/admin/login', { ...data })
export const getAllNews = (page) => api.get(`/news?page=${page}&limit=10`)
export const AddNews = (data) => api.post('/news', data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
})

export const AddVideos = (data) => api.post('/feature', data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
})


export const getAllAnalysic = (page) => api.get(`/analysis?page=${page}&limit=10`)
export const getAllStock = (page) => api.get(`/stock?page=${page}&limit=10`)
export const addAnalysic = (data) => api.post('/analysis', data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
})

export const addStock = (data) => api.post('/stock', data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
})


export const deleteAnalysic = (id) => api.delete(`/analysis/${id}`)
export const DeleteNews = (id) => api.delete(`/news/${id}`)
export const deleteStock = (id) => api.delete(`/stock/${id}`)