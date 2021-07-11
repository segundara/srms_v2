import { SET_ME, CLEAR_ME, SET_MESSAGE, UPDATE_PROFILE_TEXT, UPDATE_PROFILE_IMAGE } from "./types";

import MeService from "../services/me.service";

export const fetchMe = (userTitle) => (dispatch) => {
    return MeService.getMe(userTitle).then(
        (data) => {
            dispatch({
                type: SET_ME,
                payload: data,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            // dispatch({
            //     type: LOGIN_FAIL,
            // });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const clearMe = () => ({
    type: CLEAR_ME,
});

export const updateMeProfile = (userTitle, updatedInfo) => (dispatch) => {
    return MeService.updateProfileText(userTitle, updatedInfo).then(
        (data) => {
            dispatch({
                type: UPDATE_PROFILE_TEXT,
                payload: data,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            // dispatch({
            //     type: LOGIN_FAIL,
            // });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const updateMeImage = (userTitle, imageFile) => (dispatch) => {
    return MeService.updateProfileImage(userTitle, imageFile).then(
        (data) => {
            dispatch({
                type: UPDATE_PROFILE_IMAGE,
                payload: data,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            // dispatch({
            //     type: LOGIN_FAIL,
            // });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};