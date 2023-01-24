import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Schema } from "./Schema.jsx";
import "./Today.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllAnalysic,
  AddAnalysic,
  DeleteAnalysic,
  newsclearErrors,
  newsclearMessages,
} from "./../../store/actions/index";
import toast, { Toaster } from "react-hot-toast";
import FeaturedInfo from "../featuredInfo/FeaturedInfo.jsx";
import { Pagination } from "@material-ui/lab";
import { Puff } from "react-loader-spinner";
const Today = () => {
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    text: "",
  };
  const [analysicTitle, setAnalysicTitle] = useState("");
  const [analysicDesc, setAnalysicDesc] = useState("");
  const [analysicImage, setAnalysicImage] = useState("");
  const imageInputRef = React.useRef();
  const [page, setPage] = useState(1);
  const { analycis,totalPages,addLoading, errors, message } = useSelector(
    (state) => state.analysicReducer
  );

  const { handleBlur, errorss, touched } = useFormik({
    initialValues,
    validationSchema: Schema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (action) => {
      action.resetForm();
    },
  });

  useEffect(() => {
    dispatch(GetAllAnalysic(page));
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(newsclearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(newsclearMessages());
    }
  }, [page, errors, message]);

  const handleDeleteData = (id) => {
    dispatch(DeleteAnalysic(id));
  };

  const handleImage = (e) => {
    setAnalysicImage(e.target.files[0]);
  };
  const handleSubmitData = (e) => {
    e.preventDefault();
    if (analysicTitle == "") {
      return toast.error("Title is required");
    }
    if (analysicDesc == "") {
      return toast.error("Description is required");
    }
    if (analysicImage == "") {
      return toast.error("Image is required");
    } else {
      const formData = new FormData();
      formData.set("title", analysicTitle);
      formData.set("description", analysicDesc);
      formData.set("photoPath", analysicImage);
      dispatch(AddAnalysic(formData));
      setAnalysicTitle("");
      setAnalysicDesc("");
      setAnalysicImage("");
      imageInputRef.current.value = "";
    }
  };
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
      <div className="today">
        <div className="today-modal">
          <div
            className="today-modal-container"
            style={{
              inset: 0,
              margin: "auto",
            }}
          >
            <div className="today-modal-container-left">
              <h1 className="today-modal-container-left-title">Add Analysis</h1>
              <form onSubmit={(e) => handleSubmitData(e)}>
                <div className="today-modal-container-left-block">
                  <label
                    htmlFor="title"
                    className="today-modal-container-left-block-label"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="title"
                    id="title"
                    placeholder="Enter Title"
                    value={analysicTitle}
                    onChange={(e) => setAnalysicTitle(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <p className="today-modal-container-left-block-error">
                      {errors.title}
                    </p>
                  ) : null}
                </div>

                <div className="today-modal-container-left-block">
                  <label
                    htmlFor="text"
                    className="today-modal-container-left-block-label"
                  >
                    Description
                  </label>
                  <input
                    type="textarea"
                    autoComplete="off"
                    name="text"
                    id="text"
                    height="60px"
                    placeholder="Enter Description"
                    value={analysicDesc}
                    onChange={(e) => setAnalysicDesc(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.text && touched.text ? (
                    <p className="today-modal-container-left-block-error">
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
        <div className="day">
          <div className="day-modal">
            <div className="dayLg">
              <h3 className="dayLgTitle">Analysis</h3>
              <table className="dayLgTable">
                <thead>
                  <tr className="dayLgTr">
                    <th className="dayLgTh">Title</th>
                    <th className="dayLgTh">Description</th>
                    <th className="dayLgTh">Image</th>
                    <th className="dayLgTh">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {analycis.length > 0 ? (
                    analycis.map((data, ind) => {
                      return (
                        <tr className="dayLgTr" key={ind}>
                          <td className="dayLgData">{data.title}</td>
                          <td className="dayLgData">{data.description}</td>
                          <td className="dayLgUser">
                            {data.photoPath ? (
                              <img
                                crossOrigin="true"
                                src={data.photoPath}
                                alt="Image Not Found"
                                className="dayLgImg"
                              />
                            ) : (
                              "Image Loading..."
                            )}
                          </td>
                          <td onClick={() => handleDeleteData(data.id)}>
                            <button className="btn-delete">Delete</button>
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

export default Today;
