import { analysicConstant } from "./../constants/analysic.constants";

const initialState = {
analycis:[],
totalPages:0,
  errors: [],
  loading: false,
  addLoading:false,
  message: "",
};

const analysicReducer = (state = initialState, action) => {
  switch (action.type) {
    case analysicConstant.ANALYCIS_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;
    case analysicConstant.ANALYCIS_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        analycis: action.payload.results,
        totalPages:action.payload.totalPages
      };
      break;
    case analysicConstant.ANALYCIS_GET_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
      break;

      case analysicConstant.ANALYCIS_ADD_REQUEST:
      return {
        ...state,
        addLoading: true,
      };
      break;
    case analysicConstant.ANALYCIS_ADD_SUCCESS:
      return {
        ...state,
        addLoading: false,
        message: action.payload,
      };
      break;
    case analysicConstant.ANALYCIS_ADD_FAILURE:
      return {
        ...state,
        addLoading: false,
        errors: action.payload.err,
      };
      break;
      case analysicConstant.ANALYCIS_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;
      case analysicConstant.ANALYCIS_DELETE_SUCCESS:
        return {
          ...state,
          loading: true,
          message: action.payload,
        };
        break;
      case analysicConstant.ANALYCIS_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
      break;
    default:
      return state;
  }
};

export default analysicReducer;
