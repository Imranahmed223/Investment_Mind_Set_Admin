import {authConstant} from './../constants/auth.constants';
import {register,login} from './../../http/index'
import axios from 'axios'



export const signup=(admin)=>{
    return async(dispatch)=>{
        dispatch({type:authConstant.ADMIN_REGISTER_REQUEST})
        try{
          const token = localStorage.getItem('token')
        await axios.post(`${process.env.REACT_APP_ROOT}/admin`, admin,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''
            }
          })
          dispatch({type:authConstant.ADMIN_REGISTER_SUCCESS,payload:"Admin Created Successfully"})
        }
        catch(error){
          dispatch({type:authConstant.ADMIN_REGISTER_FAILURE,payload:{err:error.response.data.message}})
        }
    }
}

export const Login=(admin)=>{
    return async(dispatch)=>{
      dispatch({type:authConstant.ADMIN_LOGIN_REQUEST})
        try{
          const result=await login(admin)
        const {data} = result
            dispatch({type:authConstant.ADMIN_LOGIN_SUCCESS,payload:data.user})
            localStorage.setItem('token',data.tokens.access.token)
            localStorage.setItem('authenticate','true')
        }
        catch(error){
          dispatch({type:authConstant.ADMIN_LOGIN_FAILURE,payload:{err:error.response.data.message}})
        }
    }
}


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: authConstant.CLEAR_ERRORS });
};

// Clearing Messages
export const clearMessages = () => async (dispatch) => {
  dispatch({ type: authConstant.CLEAR_MESSAGES });
};