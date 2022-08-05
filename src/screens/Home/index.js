import React, { useState } from "react";
import { Select, Options, Input, Textarea } from "../../components";
import Button from "../../components/Form/Button";
import { useDispatch, useSelector } from "react-redux";
import { startTest } from "../../redux/actions/testActions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Form Helpers
  const [minute, setMinutes] = useState("");
  const [customMinute, setCustomMinute] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [customParagraph, setCustomParagraph] = useState("");
  const [loading, setLoading] = useState(false);

  const minuteHandler = (e) => {
    const userMinute = e.target.value * 60;
    setCustomMinute(userMinute);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(startTest(minute, paragraph, customParagraph, customMinute));
  };

  const userTest = useSelector((state) => state.userTest);
  const { success } = userTest;
  //   get state
  if (success) {
    navigate("/test");
  }

  return (
    <div className="appContainer">
      <div className="testContainer">
        <h1>Check your Typing Skills</h1>
        <form onSubmit={submitHandler}>
          <div className="inputFlex">
            <Select
              title="Select Minute"
              options={Options.minutes}
              value={minute}
              onChange={(e) => setMinutes(e.target.value)}
              required={true}
            />
            {minute === "Custom" && (
              <Input
                title="Minutes"
                type="number"
                value={customMinute}
                onChange={minuteHandler}
                required={minute === "Custom"}
              />
            )}
            <Select
              title="Select Paragraph"
              options={Options.paragraph}
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              required={true}
            />
            {paragraph === "Custom" && (
              <Textarea
                title="Paragraph"
                value={customParagraph}
                onChange={(e) => setCustomParagraph(e.target.value)}
                required={paragraph === "Custom"}
              />
            )}
            <Button title="Start Test" loading={loading} isFullWidth={true} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
