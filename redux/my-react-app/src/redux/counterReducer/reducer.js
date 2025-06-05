


const initialState = {
    count: 0,
}


// reducer function

function counterReducer(state = initialState, action) {
    switch (action.type) {
        case "INCREMENT":
            return ({ count: state.count + 1 })  //Return new state oject
        case "DECREMENT":
            return ({ count: state.count - 1 });  //Return new state oject

        default:
            return state;
    }
}

export default counterReducer;