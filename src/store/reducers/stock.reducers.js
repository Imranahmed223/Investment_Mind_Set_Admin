import { stockConstants } from "./../constants/stock.constants";

const initialState = {
  stock:[],  
  totalPages:0,
  errors: [],
  loading: false,
  addLoading:false,
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case stockConstants.STOCK_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;
    case stockConstants.STOCK_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        stock: action.payload.results,
        totalPages:action.payload.totalPages
      };
      break;
    case stockConstants.STOCK_GET_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
      break;

      case stockConstants.STOCK_DELETE_REQUEST:
        return {
          ...state,
          loading: true,
        };
        break;
        case stockConstants.STOCK_ADD_REQUEST:
        return {
          ...state,
          addLoading: true,
        };
        break;
      case stockConstants.STOCK_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
        break;

        case stockConstants.STOCK_ADD_SUCCESS:
            return {
              ...state,
              addLoading: false,
              message: action.payload,
            };
            break;
        case stockConstants.STOCK_DELETE_FAILURE:
        return {
          ...state,
          loading: false,
          errors: action.payload.err,
        };
        break;
        case stockConstants.STOCK_ADD_FAILURE:
          return {
            ...state,
            addLoading: false,
            errors: action.payload.err,
          };
          break;
    default:
      return state;
  }
};

export default authReducer;
