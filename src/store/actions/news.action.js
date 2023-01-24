import {newsConstant} from './../constants/news.constants';
import {getAllNews,AddNews,DeleteNews,AddVideos} from './../../http/index'
import axios from 'axios'

export const GetAllNews=(page)=>{
    return async(dispatch)=>{
      dispatch({type:newsConstant.NEWS_GET_REQUEST})
        try{
          const token = localStorage.getItem('token')
          const result= await axios.get(`${process.env.REACT_APP_ROOT}/news?page=${page}&limit=10`, {
             headers: {
               Authorization: token ? `Bearer ${token}` : ''//the token is a variable which holds the token
             }
           })
        const {data} = result
            dispatch({type:newsConstant.NEWS_GET_SUCCESS,payload:{results:data.results,totalPages:data.totalPages}})
        }
        catch(error){
          dispatch({type:newsConstant.NEWS_GET_FAILURE,payload:{err:error.response.data.message}})
        }
    }
}


export const addNews=(news)=>{
    return async(dispatch)=>{
      dispatch({type:newsConstant.NEWS_ADD_REQUEST})
        try{
          const token = localStorage.getItem('token')
        await axios.post(`${process.env.REACT_APP_ROOT}/news`, news,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''
            }
          })
            dispatch(GetAllNews(1))
            dispatch({type:newsConstant.NEWS_ADD_SUCCESS,payload:"News Created Successfully"})
        }
        catch(error){
          dispatch({type:newsConstant.NEWS_ADD_FAILURE,payload:{err:error.response.data.message}})
        }
    }
}

export const addVideos=(videos)=>{
  return async(dispatch)=>{
    dispatch({type:newsConstant.NEWS_ADD_REQUEST})
      try{
        const token = localStorage.getItem('token')
        await axios.post(`${process.env.REACT_APP_ROOT}/feature`, videos,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''
            }
          })
          dispatch({type:newsConstant.NEWS_ADD_SUCCESS,payload:"Video Added Successfully"})
      }
      catch(error){
        dispatch({type:newsConstant.NEWS_ADD_FAILURE,payload:{err:error.response.data.message}})
      }
  }
}



export const deleteNews=(id)=>{
  return async(dispatch)=>{
    dispatch({type:newsConstant.NEWS_DELETE_REQUEST})
      try{
        const token = localStorage.getItem('token')
        await axios.delete(`${process.env.REACT_APP_ROOT}/news/${id}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''
            }
          })
        dispatch(GetAllNews(1))
        dispatch({type:newsConstant.NEWS_DELETE_SUCCESS,payload:"News Deleted Successfully"})
      }
      catch(error){
        dispatch({type:newsConstant.NEWS_DELETE_FAILURE,payload:{err:error.response.data.message}})
      }
  }
}


// Clearing Errors
export const newsclearErrors = () => async (dispatch) => {
  dispatch({ type: newsConstant.NEWS_CLEAR_ERRORS });
};

// Clearing Messages
export const newsclearMessages = () => async (dispatch) => {
  dispatch({ type: newsConstant.NEWS_CLEAR_MESSAGES });
};