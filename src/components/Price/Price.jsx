import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Schema } from "./Schema.jsx";
import "./Price.scss";
import SideMenu from "../SideMenu/SideMenu.jsx";
import {
  GetAllStock,
  AddStock,
  DeleteStock,
  newsclearErrors,
  newsclearMessages,
} from "./../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import FeaturedInfo from "../featuredInfo/FeaturedInfo.jsx";
import { Pagination } from "@material-ui/lab";
import { Puff } from "react-loader-spinner";

const Price = () => {
  const dispatch = useDispatch();
  const { stock,totalPages,errors, message, addLoading } = useSelector(
    (state) => state.stockReducer
  );
  const [stockTitle, setStockTitle] = useState("");
  const imageInputRef = React.useRef();
  const ref = React.useRef();
  const [overall, setOverall] = useState("");
  const [fundamental, setFundamental] = useState("");
  const [shortTermTechnical, setShortTermTechincal] = useState("");
  const [longTermTechnical, setLongTermTechincal] = useState("");
  const [analysisRating, setAnalysisRating] = useState("");
  const [valuation, setValuation] = useState("");
  const [photoPath, setImage] = useState("");
  const [stockCompany, setStockCompany] = useState("");
  const [stockSentiment, setStockSentiment] = useState("");
  const [page, setPage] = useState(1);

  const initialValues = {
    name: "",
    title: "",
    price: "",
    quantity: "",
    presentage: "",
  };

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
    dispatch(GetAllStock(page));
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
    dispatch(DeleteStock(id));
  };
  const handleSubmitData = (e) => {
    e.preventDefault();
    if (stockTitle == "") {
      return toast.error("Title is required");
    }
    if (stockCompany == "") {
      return toast.error("Company is required");
    }
    if (overall == "") {
      return toast.error("OverAll is required");
    }
    if (fundamental == "") {
      return toast.error("Fundamental is required");
    }
    if (shortTermTechnical == "") {
      return toast.error("ShortTermTechnical is required");
    }
    if (longTermTechnical == "") {
      return toast.error("LongTermTechnical is required");
    }
    if (analysisRating == "") {
      return toast.error("AnalysisRating is required");
    }
    if (valuation == "") {
      return toast.error("valuation is required");
    } else {
      let analysis = {
        overall,
        fundamental,
        shortTermTechnical,
        longTermTechnical,
        analysisRating,
        valuation,
      };
      const formData = new FormData();
      formData.set("title", stockTitle);
      formData.set("analysis", JSON.stringify(analysis));
      formData.set("photoPath", photoPath);
      formData.set("company", stockCompany);
      formData.set("sentiment", stockSentiment);
      dispatch(AddStock(formData));
      setStockTitle("");
      setStockCompany("");
      setStockSentiment("");
      setAnalysisRating("");
      setFundamental("");
      setOverall("");
      setShortTermTechincal("");
      setLongTermTechincal("");
      setAnalysisRating("");
      setValuation("");
      setImage("");
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
      <div className="price">
        <div className="price-modal">
          <div
            className="price-modal-container"
            style={{
              inset: 0,
              margin: "auto",
            }}
          >
            <div className="price-modal-container-left">
              <h1 className="price-modal-container-left-title">Add Stock</h1>
              <form onSubmit={(e) => handleSubmitData(e)}>
                <div className="price-modal-container-left-block">
                  <label
                    htmlFor="title"
                    className="price-modal-container-left-block-label"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="title"
                    id="title"
                    placeholder="Stock Title"
                    value={stockTitle}
                    onChange={(e) => setStockTitle(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <p className="price-modal-container-left-block-error">
                      {errors.title}
                    </p>
                  ) : null}
                </div>
                <div className="price-modal-container-left-block">
                  <label
                    htmlFor="title"
                    className="price-modal-container-left-block-label"
                  >
                    Analysis OverAll
                  </label>
                  <input
                    ref={ref}
                    type="number"
                    autoComplete="off"
                    name="title"
                    id="title"
                    placeholder="Analysis OverAll"
                    value={overall}
                    onChange={(e) => setOverall(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <p className="price-modal-container-left-block-error">
                      {errors.title}
                    </p>
                  ) : null}
                </div>
                <div className="price-modal-container-left-block">
                  <label
                    htmlFor="title"
                    className="price-modal-container-left-block-label"
                  >
                    Analysis Fundamental
                  </label>
                  <input
                    ref={imageInputRef}
                    type="number"
                    autoComplete="off"
                    name="title"
                    id="title"
                    placeholder="Analysis Fundamental"
                    value={fundamental}
                    onChange={(e) => setFundamental(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <p className="price-modal-container-left-block-error">
                      {errors.title}
                    </p>
                  ) : null}
                </div>
                <div className="price-modal-container-left-block">
                  <label
                    htmlFor="title"
                    className="price-modal-container-left-block-label"
                  >
                    Analysis ShortTermTechnical
                  </label>
                  <input
                    ref={imageInputRef}
                    type="number"
                    autoComplete="off"
                    name="title"
                    id="title"
                    placeholder="Analysis ShortTermTechnical"
                    value={shortTermTechnical}
                    onChange={(e) => setShortTermTechincal(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <p className="price-modal-container-left-block-error">
                      {errors.title}
                    </p>
                  ) : null}
                </div>
                <div className="price-modal-container-left-block">
                  <label
                    htmlFor="title"
                    className="price-modal-container-left-block-label"
                  >
                    Analysis LongTermTechnical
                  </label>
                  <input
                    ref={imageInputRef}
                    type="number"
                    autoComplete="off"
                    name="title"
                    id="title"
                    placeholder="Analysis LongTermTechnical"
                    value={longTermTechnical}
                    onChange={(e) => setLongTermTechincal(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <p className="price-modal-container-left-block-error">
                      {errors.title}
                    </p>
                  ) : null}
                </div>
                <div className="price-modal-container-left-block">
                  <label
                    htmlFor="title"
                    className="price-modal-container-left-block-label"
                  >
                    Analysis Rating
                  </label>
                  <input
                    ref={imageInputRef}
                    type="number"
                    autoComplete="off"
                    name="title"
                    id="title"
                    placeholder="Analysis Rating"
                    value={analysisRating}
                    onChange={(e) => setAnalysisRating(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <p className="price-modal-container-left-block-error">
                      {errors.title}
                    </p>
                  ) : null}
                </div>
                <div className="price-modal-container-left-block">
                  <label
                    htmlFor="title"
                    className="price-modal-container-left-block-label"
                  >
                    Analysis Valuation
                  </label>
                  <input
                    ref={imageInputRef}
                    type="number"
                    autoComplete="off"
                    name="title"
                    id="title"
                    placeholder="Analysis Valuation"
                    value={valuation}
                    onChange={(e) => setValuation(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <p className="price-modal-container-left-block-error">
                      {errors.title}
                    </p>
                  ) : null}
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  name="myFile"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <div className="price-modal-container-left-block">
                  <label
                    htmlFor="text"
                    className="price-modal-container-left-block-label"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="price"
                    id="price"
                    placeholder="Company"
                    value={stockCompany}
                    onChange={(e) => setStockCompany(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.price && touched.price ? (
                    <p className="price-modal-container-left-block-error">
                      {errors.price}
                    </p>
                  ) : null}
                </div>

                <div className="price-modal-container-left-block">
                  <label
                    htmlFor="title"
                    className="price-modal-container-left-block-label"
                  >
                    Sentiment
                  </label>
                  <input
                    type="number"
                    autoComplete="off"
                    name="quantity"
                    id="quantity"
                    placeholder="Sentiment"
                    value={stockSentiment}
                    onChange={(e) => setStockSentiment(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.quantity && touched.quantity ? (
                    <p className="price-modal-container-left-block-error">
                      {errors.quantity}
                    </p>
                  ) : null}
                </div>

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
        <div className="coin">
          <div className="coin-modal">
            <div className="coinLg">
              <h3 className="coinLgTitle">Stock Details</h3>
              <div className="table-for-scroll">
                <table className="coinLgTable">
                  <thead>
                    <tr className="coinLgTr">
                      <th className="coinLgTh">Title</th>
                      <th className="coinLgTh">overall</th>
                      <th className="coinLgTh">fundamental</th>
                      <th className="coinLgTh">shortTermTechnical</th>
                      <th className="coinLgTh">longTermTechnical</th>
                      <th className="coinLgTh">analysisRating</th>
                      <th className="coinLgTh">valuation</th>
                      <th className="coinLgTh">Company</th>
                      <th className="coinLgTh">Sentiment</th>
                      <th className="coinLgTh">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stock.length > 0 ? (
                      stock.map((data, ind) => {
                        return (
                          <tr className="coinLgTr" key={ind}>
                            <td className="coinLgData">{data.title}</td>
                            <td className="coinLgData">
                              {data.analysis.overall}
                            </td>
                            <td className="coinLgData">
                              {data.analysis.fundamental}
                            </td>
                            <td className="coinLgData">
                              {data.analysis.shortTermTechnical}
                            </td>
                            <td className="coinLgData">
                              {data.analysis.longTermTechnical}
                            </td>
                            <td className="coinLgData">
                              {data.analysis.analysisRating}
                            </td>
                            <td className="coinLgData">
                              {data.analysis.valuation}
                            </td>
                            <td className="coinLgData">{data.company}</td>
                            <td className="coinLgData">{data.sentiment}</td>
                            <td
                              className="coinLgData"
                              onClick={() => handleDeleteData(data.id)}
                            >
                              <button className="stock-btn">Delete</button>
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
              </div>
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

export default Price;
