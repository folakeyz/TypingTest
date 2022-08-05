import { useState, useEffect, useRef } from "react";
import randomWords from "random-words";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generateResult } from "../../redux/actions/testActions";

const Test = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nWords = 200;
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const textInput = useRef(null);

  const userTest = useSelector((state) => state.userTest);
  const { testInfo } = userTest;

  useEffect(() => {
    if (!testInfo) {
      navigate("/");
    } else {
      if (testInfo.customMinute) {
        setCountDown(testInfo.customMinute);
      } else {
        setCountDown(testInfo.minute);
      }
      if (testInfo.customParagraph) {
        setWords(testInfo.customParagraph);
      } else {
        setWords(generateWords());
      }
    }
  }, [testInfo, navigate]);
  useEffect(() => {
    if (status === "finished") {
      dispatch(generateResult(correct, incorrect));
      navigate("/result");
    }
    if (status !== "started") {
      setStatus("started");
      textInput.current.focus();
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            setStatus("finished");
            setCurrentInput("");
            return countDown;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
  }, [status, dispatch, correct, incorrect, countDown, navigate]);

  function generateWords() {
    return new Array(nWords).fill(null).map(() => randomWords());
  }

  function handleKeyDown({ keyCode, key }) {
    if (keyCode === 32) {
      checkMatch();
      setCurrentInput("");
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrCharIndex(-1);
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar("");
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  }

  function checkMatch() {
    const wordToCompare = words[currentWordIndex];
    const doesItMatch = wordToCompare === currentInput.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (
      wordIdx === currentWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== "finished"
    ) {
      if (char === currChar) {
        return "success";
      } else {
        return "error";
      }
    } else if (
      wordIdx === currentWordIndex &&
      currCharIndex >= words[currentWordIndex].length
    ) {
      return "warning";
    } else {
      return "";
    }
  }

  return (
    <div className="appContainer">
      <div className="testContainer">
        <div className="timer">
          <h2>{countDown}</h2>
        </div>
        <div className="paragraph">
          {status === "started" && (
            <div className="section">
              {words.map((word, i) => (
                <span key={i}>
                  <span>
                    {word.split("").map((char, idx) => (
                      <span key={idx} className={getCharClass(i, idx, char)}>
                        {char}
                      </span>
                    ))}
                  </span>
                  <span> </span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="inputFlex">
          <div className="inputContainer large">
            <input
              onKeyDown={handleKeyDown}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              ref={textInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
