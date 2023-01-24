import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Schema } from "./Schema.jsx";
import "./News.scss";
import {
  GetAllNews,
  addNews,
  deleteNews,
  newsclearErrors,
  newsclearMessages,
} from "./../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Pagination } from "@material-ui/lab";
import { Puff } from "react-loader-spinner";

const News = () => {
  const imageInputRef = React.useRef();
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    text: "",
  };
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDesc, setNewsDesc] = useState("");
  const [newsImage, setImage] = useState("");
  const [page, setPage] = useState(1);
  const { news,totalPages,errors, message, addLoading } = useSelector(
    (state) => state.newsReducer
  );
  const { values, handleBlur, handleChange, handleSubmit, touched } = useFormik(
    {
      initialValues,
      validationSchema: Schema,
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (action) => {
        action.resetForm();
      },
    }
  );

  useEffect(() => {
    dispatch(GetAllNews(page));
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(newsclearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(newsclearMessages());
    }
  }, [page, errors, message]);

  const handleSubmitData = (e) => {
    e.preventDefault();
    if (newsTitle == "") {
      return toast.error("Title is required");
    }
    if (newsDesc == "") {
      return toast.error("Description is required");
    }
    if (newsImage == "") {
      return toast.error("Image is required");
    } else {
      const formData = new FormData();
      formData.set("title", newsTitle);
      formData.set("description", newsDesc);
      formData.set("photoPath", newsImage);
      dispatch(addNews(formData));
      setNewsTitle("");
      setNewsDesc("");
      setImage("");
      imageInputRef.current.value = "";
      // navigate('/dasboard')
    }
  };

  const handleDeleteData = (id) => {
    dispatch(deleteNews(id));
  };
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <>
      {/* <SideMenu /> */}
      <Toaster
        toastOptions={{
          style: {
            fontSize: "18px",
          },
        }}
      />
      <div className="news">
        <div className="news-modal">
          <div className="news-modal-container">
            <div className="news-modal-container-left">
              <h1 className="news-modal-container-left-title">Add News</h1>
              <form onSubmit={(e) => handleSubmitData(e)}>
                <div className="news-modal-container-left-block">
                  <label
                    htmlFor="title"
                    className="news-modal-container-left-block-label"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="title"
                    id="title"
                    placeholder="Title"
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
                <div className="news-modal-container-left-block">
                  <label
                    htmlFor="text"
                    className="news-modal-container-left-block-label"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="text"
                    id="text"
                    placeholder="Text"
                    value={newsDesc}
                    onChange={(e) => setNewsDesc(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.text && touched.text ? (
                    <p className="news-modal-container-left-block-error">
                      {errors.text}
                    </p>
                  ) : null}
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  name="myFile"
                  onChange={(e) => handleImage(e)}
                />
                <center>
                  <button className="input-button" type="submit">
                    {addLoading ? (
                      <Puff
                        height="22"
                        width="42"
                        radius="4"
                        color="white"
                        ariaLabel="loading"
                        wrapperStyle
                        wrapperClass
                      />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="new">
          <div className="new-modal">
            <div className="newLg">
              <h3 className="newLgTitle">News Details</h3>
              <table className="newLgTable">
                <thead>
                  <tr className="newLgTr">
                    <th className="newLgTh">Title</th>
                    <th className="newLgTh">Description</th>
                    <th className="newLgTh">Image</th>
                    <th className="newLgTh">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {news.length > 0 ? (
                    news.map((data, ind) => {
                      return (
                        <tr className="newLgTr" key={ind}>
                          <td className="newLgData">{data.title}</td>
                          <td className="newLgData">{data.description}</td>
                          <td className="newLgUser">
                            {data.photoPath ? (
                              <img
                                crossOrigin="true"
                                src={data.photoPath}
                                alt="image not found"
                                className="newLgImg"
                              />
                            ) : (
                              "Image Loading..."
                            )}
                          </td>
                          <td onClick={() => handleDeleteData(data.id)}>
                            <button className="btn-delete">
                              {/* {loading?'loading...':'Delete'} */}
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>
                      <Puff
                        height="28"
                        width="42"
                        radius="6"
                        color="blue"
                        ariaLabel="loading"
                        wrapperStyle
                        wrapperClass
                      />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="news-pagination">
                <Pagination
                  count={totalPages}
                  page={page}
                  variant="outlined"
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  onChange={(e, value) => setPage(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
