import { authConstant } from "./../constants/auth.constants";

const initialState = {
  token: null,
  users: [],
  authenticate: false,
  errors: [],
  loading: false,
  dataSignup: {},
  message: "",
  signupErrors:[]
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstant.ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;
    case authConstant.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        message: "Login Successfully",
      };
      break;
    case authConstant.ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
      break;

      case authConstant.ADMIN_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;
    case authConstant.ADMIN_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
      break;
    case authConstant.ADMIN_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        signupErrors: action.payload.err,
      };
      break;
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        message: "",
      };
      break;
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: [],
      };
      break;
    default:
      return state;
  }
};

export default authReducer;
