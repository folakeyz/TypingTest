import { useState, useEffect, useRef } from "react";
import randomWords from "random-words";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const navigate = useNavigate();

  const nWords = 200;
  const [seconds, setSeconds] = useState(0);
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(seconds);
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

  useEffect(() => {}, [testInfo, navigate]);

  useEffect(() => {
    if (status === "finished") {
      setWords(generateWords());
      setCurrentWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
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
            return seconds;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
  }, [status, seconds]);

  useEffect(() => {
    if (!testInfo) {
      navigate("/");
    } else {
      if (testInfo.customMinute) {
        setSeconds(testInfo.customMinute);
      } else {
        setSeconds(testInfo.minute);
      }
      if (testInfo.customParagraph) {
        setWords(testInfo.customParagraph);
      } else {
        setWords(generateWords());
      }
    }
  }, [testInfo, navigate]);

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

          {/* <button onClick={start} type="button">
            Start
          </button> */}
        </div>

        {status === "finished" && (
          <div className="score">
            <div>
              <p>Words per Minute:</p>
              <h1>{correct}</h1>
            </div>
            <div>
              <p>Accuracy:</p>
              <h1>{Math.round((correct / (correct + incorrect)) * 100)}%</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
