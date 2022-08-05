import {
  START_TEST_FAIL,
  START_TEST_REQUEST,
  START_TEST_SUCCESS,
} from "../constants/testConstants";

export const startTest =
  (minute, paragraph, customParagraph, customMinute) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: START_TEST_REQUEST });
      const data = {
        minute,
        paragraph,
        customParagraph,
        customMinute,
      };
      dispatch({
        type: START_TEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: START_TEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
