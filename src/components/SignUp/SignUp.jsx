import React,{useState,useEffect} from "react";
import "./SignUp.scss";

import { useFormik } from "formik";
import { Schema } from "./Schema";
import {useDispatch,useSelector } from "react-redux";
import Image from "../../img/sgnup.png";
import {signup,clearErrors,clearMessages} from './../../store/actions/index'
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Puff } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const {users} = useSelector((state) => state.authReducer);
  const [userName,setUserName] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName]  = useState('')
  const [email,setEmail]   = useState('')
  const [password,setPassword] = useState('')
  const {message,signupErrors,loading} = useSelector((state) => state.authReducer);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: Schema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: (values, action) => {
        action.resetForm();
      },
    });

    useEffect(() => {
      if(signupErrors.length > 0){
        toast.error(signupErrors)
        dispatch(clearErrors());
      }
  
      if (message) {
        toast.success(message);
        dispatch(clearMessages());
        // setTimeout(() => navigate("/dasboard"), 2000);
      }
    }, [message,signupErrors]);
    const handleSubmitData =(e)=>{
      e.preventDefault()
      if(firstName == ''){
        return toast.error('firstName is required')
       }
       if(lastName == ''){
        return toast.error('lastName is required')
       }
       if(userName == ''){
        return toast.error('userName is required')
       }
      if(email == ''){
        return toast.error('Email is required')
       }
       else if(password== ''){
         return toast.error('Password is required')
       }
       else{
        const registerData ={firstName,lastName,email,userName,password}
        dispatch(signup(registerData))
        setFirstName('')
        setLastName('')
        setEmail('')
        setUserName('')
        setPassword('')
       }
    }
  return (
    <>
    <Toaster
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />
      <div className="signup">
        <div className="signup-modal">
          <div className="signup-modal-container">
            <div className="signup-modal-container-left">
              <h1 className="signup-modal-container-left-title">Welcome!</h1>
              <form onSubmit={(e)=>handleSubmitData(e)}>
                <div className="signup-modal-container-left-block">
                  <label
                    htmlFor="name"
                    className="signup-modal-container-left-block-label"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="firstName"
                    id="firstName"
                    placeholder="firstName"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {touched.firstName && errors.firstName ? (
                    <p className="signup-modal-container-left-block-error">
                      {errors.firstName}
                    </p>
                  ) : null}
                </div>

                <div className="signup-modal-container-left-block">
                  <label
                    htmlFor="name"
                    className="signup-modal-container-left-block-label"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="lastName"
                    id="lastName"
                    placeholder="lastName"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {touched.lastName && errors.lastName ? (
                    <p className="signup-modal-container-left-block-error">
                      {errors.lastName}
                    </p>
                  ) : null}
                </div>
                <div className="signup-modal-container-left-block">
                  <label
                    htmlFor="email"
                    className="signup-modal-container-left-block-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    autoComplete="off"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className="signup-modal-container-left-block-error">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="signup-modal-container-left-block">
                  <label
                    htmlFor="confirm_password"
                    className="signup-modal-container-left-block-label"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.confirm_password && touched.confirm_password ? (
                    <p className="signup-modal-container-left-block-error">
                      {errors.confirm_password}
                    </p>
                  ) : null}
                </div>


                <div className="signup-modal-container-left-block">
                  <label
                    htmlFor="password"
                    className="signup-modal-container-left-block-label"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p className="signup-modal-container-left-block-error">
                      {errors.password}
                    </p>
                  ) : null}
                </div>


                <div className="modal-buttons">
                  <a className="" onClick={()=>navigate("/dasboard")} style={{cursor:"pointer"}}>
                    Want To Go Back Dashboard ? Click Here
                  </a>
                  <button className="input-button" type="submit">
                  {
                      loading?
                      <Puff
                      height="22"
                      width="42"
                      radius="4"
                      color="white"
                      ariaLabel="loading"
                      wrapperStyle
                      wrapperClass
                    />:"Submit"
                    }
                  </button>
                </div>
              </form>
            </div>
            <div className="signup-modal-right">
              <img src={Image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
