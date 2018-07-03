
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const RESET_STATE = 'RESET_STATE';


export function changeValue(event){
    return {
        type: CHANGE_VALUE,
        payload: {
            [event.target.name]: event.target.value
        }
    }
}

export function resetState(){
    return{
        type: RESET_STATE,
        payload: {
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
    }
}