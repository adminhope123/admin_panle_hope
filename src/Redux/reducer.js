import * as type from './actionType'

const  initialState={
    users:[],
    user:{},
    loading:true
}

const usersReducers=(state=initialState,action)=>{
    switch(action.type){
        case type.EMPLOYEE_GET:
        return{
            ...state,
            users:action.payload,
            loading:false
        };
        case type.EMPLOYEE_ADD:
            return{
                ...state,
                loading:false
            };
            case type.EMPLOYEE_DELETE:
                return{
                    ...state,
                    loading:false
                };
                case type.EMPLOYEE_SINGLE_SELECT:
                    return{
                        ...state,
                        loading:false
                    };
                case type.EMPLOYEE_UPDATE:
                    return{
                        ...state,
                        loading:false
                    };
        default:
            return state;
    }
}
export default usersReducers;