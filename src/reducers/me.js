import {
    SET_ME,
    CLEAR_ME,
    UPDATE_PROFILE_TEXT,
    UPDATE_PROFILE_IMAGE
} from "../actions/types";

// const user = JSON.parse(localStorage.getItem("userTitle"));

const initialState = { info: null };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ME:
            return {
                ...state,
                info: payload,
            };
        case CLEAR_ME:
            return {
                ...state,
                info: null,
            };
        case UPDATE_PROFILE_TEXT:
            return {
                ...state,
                info: payload,
            };
        case UPDATE_PROFILE_IMAGE:
            return {
                ...state,
                info: payload,
            };
        default:
            return state;
    }
}