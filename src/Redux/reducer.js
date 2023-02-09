import * as type from './actionType'

const  initialState={
    users:[],
    user:{},
    loading:false
}

const usersReducers=(state=initialState,action)=>{
    switch(action.type){

        case type.EMPLOYEE_ADD:
            return{
                ...state,
                users:action.payload,
                loading:false
            };
        default:
            return state;
    }
}
export default usersReducers;