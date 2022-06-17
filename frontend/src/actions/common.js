import {REQUEST_FAILED, SET_MESSAGE} from "../types/types";
import { Button, notification } from 'antd';
import "../../src/assets/styles/updated_antd.css";

export const handleError = (error, dispatch) => {
  const message =
    error.response?.data?.message ||
    error.message ||
    error.toString();

  if (error.response?.status === 401) {
    // notification.error({
    //   message: `Unauthorised`,
    //   description:
    //     '',
    //   placement: 'top',
    // });
  } else {
    notification.error({
      message: `Error`,
      description: message,
      placement: 'top',
    });
  }

  dispatch({ type: REQUEST_FAILED });
  dispatch({ type: SET_MESSAGE, payload: message });


  return Promise.reject(error);
}
