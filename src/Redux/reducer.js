import * as type from './actionType';

const initialState = {
  users: [],
  user: {},
  loading: true,
  validation:[], 
  events: [],
  event: {},
  attendances:[],
  attendance:{}
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case type.EMPLOYEE_GET:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
      
    case type.EMPLOYEE_ADD:
      return {
        ...state,
        loading: false,
      };
    case type.EMPLOYEE_DELETE:
      return {
        ...state,
        loading: false,
      };
    case type.EMPLOYEE_SINGLE_SELECT:
      return {
        ...state,
        loading: false,
      };
    case type.EMPLOYEE_UPDATE:
      return {
        ...state,
        loading: false,
      };
      case type.TIME_IN_API_GET_DATA:
        return {
          ...state,
          users: action.payload,
          loading: false,
        };
      case type.ERRORVALIDATION:
        return {
          ...state,
          validation: action.payload,
        };
        case type.ADD_POST_FIELD:
      return {
        ...state,
        loading: false,
      };
      case type.EVENT_POST:
        return {
          ...state,
          loading: false,
        };
        case type.EVENT_GET:
      return {
        ...state,
        events: action.payload,
        loading: false,
      };
      case type.EVENT_DELETE:
        return {
          ...state,
          loading: false,
        };
      case type.GET_POST_FIELD:
        return {
          ...state,
          users: action.payload,
          loading: false,
        };
        case type.DELETE_POST_API:
      return {
        ...state,
        loading: false,
      };
      case type.ATTENDANCE_GET_API:
      return {
        ...state,
        attendances: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default usersReducers;
