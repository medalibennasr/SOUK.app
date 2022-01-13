import { ADD_PRODUCT } from "../ActionTypes/cartActionTypes";


export const addProduct  =(payload)=>{
    return {
        type: ADD_PRODUCT,payload};
}
