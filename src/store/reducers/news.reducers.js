import { newsConstant } from "./../constants/news.constants";

const initialState = {
  news: [],
  totalPages:0,
  errors: [],
  loading: false,
  addLoading: false,
  message: "",
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case newsConstant.NEWS_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;
    case newsConstant.NEWS_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        news: action.payload.results,
        totalPages:action.payload.totalPages
      };
      break;
    case newsConstant.NEWS_GET_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
      break;


    case newsConstant.NEWS_ADD_REQUEST:
      return {
        ...state,
        addLoading: true,
      };
      break;
    case newsConstant.NEWS_ADD_SUCCESS:
    case newsConstant.NEWS_DELETE_SUCCESS:
      return {
        ...state,
        addLoading: false,
        message: action.payload,
      };
      break;
    case newsConstant.NEWS_ADD_FAILURE:
      return {
        ...state,
        addLoading: false,
        errors: action.payload.err,
      };
      break;
    case newsConstant.NEWS_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;
    case newsConstant.NEWS_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
      break;
    case newsConstant.NEWS_CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        message: "",
      };
      break;
    case newsConstant.NEWS_CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: [],
      };
    default:
      return state;
  }
};

export default newsReducer;
