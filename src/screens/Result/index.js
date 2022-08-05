import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GENERATE_RESULT_RESET,
  START_TEST_RESET,
} from "../../redux/constants/testConstants";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Form/Button";
const Result = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myResult = useSelector((state) => state.myResult);
  const { correct, incorrect } = myResult;

  useEffect(() => {
    dispatch({ type: START_TEST_RESET });
  }, [dispatch]);

  const goBack = () => {
    navigate("/");
    dispatch({ type: GENERATE_RESULT_RESET });
  };
  return (
    <div className="appContainer">
      <div className="testContainer">
        <div className="score">
          <div>
            <p>Words per Minute:</p>
            <h1>{correct}</h1>
          </div>
          <div>
            <p>Accuracy:</p>
            <h1>{Math.round((correct / (correct + incorrect)) * 100)}%</h1>
            <Button type="button" title="Go to Home" onClick={goBack} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
