import {analysicConstant} from './../constants/analysic.constants';
import {getAllAnalysic,addAnalysic,deleteAnalysic} from './../../http/index'
import axios from 'axios'

export const GetAllAnalysic=(page)=>{
    return async(dispatch)=>{
      dispatch({type:analysicConstant.ANALYCIS_GET_REQUEST})
        try{
          const token = localStorage.getItem('token')
         const result= await axios.get(`${process.env.REACT_APP_ROOT}/analysis?page=${page}&limit=10`, {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''//the token is a variable which holds the token
            }
          })
        const {data} = result
            dispatch({type:analysicConstant.ANALYCIS_GET_SUCCESS,payload:{results:data.results,totalPages:data.totalPages}})
        }
        catch(error){
          dispatch({type:analysicConstant.ANALYCIS_GET_FAILURE,payload:{err:error.response.data.message}})
        }
    }
}



export const AddAnalysic=(analysic)=>{
  return async(dispatch)=>{
    dispatch({type:analysicConstant.ANALYCIS_ADD_REQUEST})
      try{
        const token = localStorage.getItem('token')
        await axios.post(`${process.env.REACT_APP_ROOT}/analysis`, analysic,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''
            }
          })
        dispatch(GetAllAnalysic(1))
        dispatch({type:analysicConstant.ANALYCIS_ADD_SUCCESS,payload:"Analysis Created Successfully"})
      }
      catch(error){
        dispatch({type:analysicConstant.ANALYCIS_ADD_FAILURE,payload:{err:error.response.data.message}})
      }
  }
}

export const DeleteAnalysic=(id)=>{
  return async(dispatch)=>{
    dispatch({type:analysicConstant.ANALYCIS_DELETE_REQUEST})
      try{
        const token = localStorage.getItem('token')
        await axios.delete(`${process.env.REACT_APP_ROOT}/analysis/${id}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''
            }
          })
        dispatch(GetAllAnalysic(1))
        dispatch({type:analysicConstant.ANALYCIS_DELETE_SUCCESS,payload:"Analysis Deleted Successfully"})
      }
      catch(error){
        dispatch({type:analysicConstant.ANALYCIS_DELETE_FAILURE,payload:{err:error.response.data.message}})
      }
  }
}