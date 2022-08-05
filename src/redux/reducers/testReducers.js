import {
  START_TEST_FAIL,
  START_TEST_REQUEST,
  START_TEST_RESET,
  START_TEST_SUCCESS,
} from "../constants/testConstants";

export const testReducer = (state = {}, action) => {
  switch (action.type) {
    case START_TEST_REQUEST:
      return { loading: true };
    case START_TEST_SUCCESS:
      return { loading: false, success: true, testInfo: action.payload };
    case START_TEST_FAIL:
      return { loading: false, error: action.payload };
    case START_TEST_RESET:
      return {};
    default:
      return state;
  }
};
