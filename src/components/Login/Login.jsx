import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import "./Login.scss";
import Image from "../../img/login.jpg";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Login,clearErrors,clearMessages } from "./../../store/actions/index";
import Input from "./Input.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Puff } from 'react-loader-spinner'


const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const validate = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const { users, message,errors,loading} = useSelector((state) => state.authReducer);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    if(errors.length > 0){
      toast.error(errors)
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => navigate("/dasboard"), 2000);
    }
  }, [users, message,errors]);


  const log = {
    email: loginEmail,
    password: loginPassword,
  };


  const loginSubmit = (e) => {
    e.preventDefault();
    if(loginEmail == ''){
      return toast.error('Email is required')
     }
     else if(loginPassword == ''){
       return toast.error('Password is required')
     }
     else{
       dispatch(Login(log));
     }
  };

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
        }}
      >
        <div className="login">
          <div className="login-modal">
            <div className="login-modal-container">
              <div className="login-modal-container-left">
                <h1 className="login-modal-container-left-title">Log In!</h1>
                <Form onSubmit={(e) => loginSubmit(e)}>
                  <Input
                    label="User Name"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    id="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />

                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />

                  <center>
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
                  </center>
                </Form>
                {/* <p className="sign-up">
                  Want To Create New Admin? <Link to="/signup">Click Here</Link>
                </p> */}
              </div>
              <div className="modal-right">
                <img src={Image} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default LoginPage;
