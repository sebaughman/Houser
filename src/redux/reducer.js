import { CHANGE_VALUE } from './action-creators'
import { RESET_STATE } from './action-creators'


const initialState = {
    name: '', 
    description: '',  
    address: '',
    city: '', 
    state: '',
    zip: '',
    image: '',
    loan_amount: '',  
    monthly_mortgage: '',
    desired_rent: '',
}

function reducer(state=initialState, action){
    switch(action.type){
        case CHANGE_VALUE:
            return Object.assign({}, state, action.payload )
        case RESET_STATE:
            return Object.assign({}, action.payload)
        default: 
            return state
    }
  

}

export default reducer;