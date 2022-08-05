import {
  START_TEST_FAIL,
  START_TEST_REQUEST,
  START_TEST_RESET,
  START_TEST_SUCCESS,
  GENERATE_RESULT_FAIL,
  GENERATE_RESULT_REQUEST,
  GENERATE_RESULT_SUCCESS,
  GENERATE_RESULT_RESET,
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

export const generateResultReducer = (state = {}, action) => {
  switch (action.type) {
    case GENERATE_RESULT_REQUEST:
      return { loading: true };
    case GENERATE_RESULT_SUCCESS:
      return {
        loading: false,
        success: true,
        correct: action.payload.correct,
        incorrect: action.payload.incorrect,
      };
    case GENERATE_RESULT_FAIL:
      return { loading: false, error: action.payload };
    case GENERATE_RESULT_RESET:
      return {};
    default:
      return state;
  }
};
