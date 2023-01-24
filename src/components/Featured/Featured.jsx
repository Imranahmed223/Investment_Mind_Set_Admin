import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Schema } from "./Schema.jsx";
import "./Featured.scss";
import { GetAllNews,deleteNews,addVideos,newsclearErrors,newsclearMessages } from "./../../store/actions/index";
import { useDispatch,useSelector} from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Puff } from 'react-loader-spinner'

const Featured = () => {
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    text: "",
  };
  const imageInputRef = React.useRef();
  const { errors,message,addLoading } = useSelector((state) => state.newsReducer);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsImage, setImage] = useState("");
  const [page,setPage] = useState(1)
  const {handleBlur,e, touched } =
    useFormik({
      initialValues,
      validationSchema: Schema,
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (action) => {
        action.resetForm();
      },
    });

  useEffect(() => {
      dispatch(GetAllNews(page));
  },[page]);

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(newsclearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(newsclearMessages());
    }
  }, [errors, message]);

  const handleSubmitData = (e) => {
    e.preventDefault();
    if(newsTitle == ''){
      return toast.error('Title is required')
     }
    if(newsImage == ''){
      return toast.error('Image is required')
     }
     else{
    const formData = new FormData();
    formData.set('name', newsTitle);
    formData.set('photoPath', newsImage);
    dispatch(addVideos(formData));
    setNewsTitle('')
    setImage('')
    imageInputRef.current.value = "";
    // navigate('/dasboard')
     }
  };

  const handleDeleteData=(id)=>{
    dispatch(deleteNews(id))
  }
  const handleImage =(e)=>{
    setImage(e.target.files[0])
  }
  return (
    <>
      {/* <SideMenu /> */}
      <Toaster
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />
      <div className="news">
        <div className="news-modal">
          <div className="news-modal-container">
            <div className="news-modal-container-left">
              <h1 className="news-modal-container-left-title">Add Featured Video</h1>
              <form onSubmit={(e) => handleSubmitData(e)}>
                <div className="news-modal-container-left-block">
                  <label
                    htmlFor="title"
                    className="news-modal-container-left-block-label"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="title"
                    id="title"
                    placeholder="Enter Name"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <p className="news-modal-container-left-block-error">
                      {errors.title}
                    </p>
                  ) : null}
                </div>
                <input
                ref={imageInputRef}
                  type="file"
                  name="myFile"
                  onChange={(e)=>handleImage(e)}
                />
                <center>
                  <button className="input-button" type="submit">
                  {
                      addLoading?
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
