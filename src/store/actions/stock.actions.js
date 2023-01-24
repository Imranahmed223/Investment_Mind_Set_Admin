import {stockConstants} from '../constants/stock.constants';
import {getAllStock,addStock,deleteStock} from '../../http/index'
import axios from 'axios'

export const GetAllStock=(page)=>{
    return async(dispatch)=>{
      dispatch({type:stockConstants.STOCK_GET_REQUEST})
        try{
          const token = localStorage.getItem('token')
         const result = await axios.get(`${process.env.REACT_APP_ROOT}/stock?page=${page}&limit=10`, {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''//the token is a variable which holds the token
            }
          })
        const {data} = result
            dispatch({type:stockConstants.STOCK_GET_SUCCESS,payload:{results:data.results,totalPages:data.totalPages}})
        }
        catch(error){
          dispatch({type:stockConstants.STOCK_GET_FAILURE,payload:{err:error.response.data.message}})
        }
    }
}


export const AddStock=(stock)=>{
  return async(dispatch)=>{
    dispatch({type:stockConstants.STOCK_ADD_REQUEST})
      try{
       const token = localStorage.getItem('token')
        await axios.post(`${process.env.REACT_APP_ROOT}/stock`, stock,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''
            }
          })
          dispatch({type:stockConstants.STOCK_ADD_SUCCESS,payload:"Stock Created Successfully"})
          dispatch(GetAllStock(1))
      }
      catch(error){
        dispatch({type:stockConstants.STOCK_ADD_FAILURE,payload:{err:error.response.data.message}})
      }
  }
}

export const DeleteStock=(id)=>{
  return async(dispatch)=>{
    dispatch({type:stockConstants.STOCK_DELETE_REQUEST})
      try{
        const token = localStorage.getItem('token')
        await axios.delete(`${process.env.REACT_APP_ROOT}/stock/${id}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''
            }
          })
          dispatch(GetAllStock(1))
          dispatch({type:stockConstants.STOCK_DELETE_SUCCESS,payload:"Stock Deleted Successfully"})
      }
      catch(error){
        dispatch({type:stockConstants.STOCK_DELETE_FAILURE,payload:{err:error.response.data.message}})
      }
  }
}