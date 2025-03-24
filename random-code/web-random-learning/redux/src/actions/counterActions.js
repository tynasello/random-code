import { INCREMENT, DECRIMENT } from "./types";

export const increment = (val) => {
    return (dispatch) => {
        dispatch({
            type: INCREMENT,
            payload: val,
        });
    };
};

export const decrement = (val) => {
    return (dispatch) => {
        dispatch({
            type: DECRIMENT,
            payload: val,
        });
    };
};
