import { INCREMENT, DECRIMENT } from "../actions/types";

const reducer = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + action.payload;
        case DECRIMENT:
            return state - action.payload;
        default:
            return state;
    }
};

export default reducer;
