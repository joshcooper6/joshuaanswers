import { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

const LoadingSpinner = (props) => {
  const [init, setInit] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInit(false);
    }, 1000);
  }, []);

  return (
    <div className="flex mt-6 mb-6 justify-center items-center">
      {init ? (
        <div className="animate-spin p-10 rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-900"></div>
      ) : (
        <span className="text-3xl mb-4 font-light">{props.answer}</span>
      )}
    </div>
  );
};

function App() {
  const [cheatActive, setCheatActive] = useState(false);
  const formRef = useRef();
  const promptRef = useRef();
  const questionRef = useRef();

  const cheatPrompt = "Joshua, please answer the following question";

  const [question, setQuestion] = useState("");
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");

  const [renderingResult, setRenderingResult] = useState(false);

  const capitalizeFirstLetter = useCallback((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }, []);

  useEffect(() => {
    console.log("Hidden Answer", capitalizeFirstLetter(answer));
  }, [answer, capitalizeFirstLetter]);

  useEffect(() => {
    const letters = "abcdefghijklmnopqrstuvwxyz";


    const handleKeyDown = (e) => {
      if (e.code === "Period") {
        setCheatActive((prev) => !prev);
        promptRef.current.focus();
      }

      if (cheatActive) {
        if (e.key === "Backspace") {
          setAnswer((prev) => prev.slice(0, -1));
          setInput((prev) => prev.slice(0, -2));
          setCheatActive(false);
        } else if (letters.includes(e.key)) {
          setAnswer((prev) => prev + e.key);
        } else if (e.code === "Space") {
          setAnswer((prev) => prev + " ");
        } else if (e.key === "Enter") {
          setCheatActive(false);
          questionRef.current.focus();
        } else if (e.code === "Period") {
          setCheatActive(false);
          setInput(prev => prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cheatActive]);

  function handleInputChange(e) {
    if (!cheatActive) {
      setInput(e.target.value);
    } else {
      if ((cheatPrompt.length - 1) <= input.length) {
        setCheatActive(false);
      }

      setInput((prev) => prev + cheatPrompt[prev.length]);
    }
  }

  function generateRandomResponse() {
    const responses = [
      "Sorry, I'm too fabulous for that.",
      "I'm sorry, do I look like a miracle worker?",
      "Negative ghost rider, the pattern is full.",
      "I'm afraid I can't let you do that, Dave.",
      "Computer says no.",
      "Oh, honey, no.",
      "I'm not feeling it today, try again tomorrow.",
      "I don't always say no, but when I do, I mean it.",
      "I'm sorry, I don't speak stupidity.",
      "If I could, I would, but I can't, so I won't.",
      "That's gonna be a no from me, dawg.",
      "I'm too busy being awesome to do that.",
      "Sorry, not sorry.",
      "My powers only go so far, and that's not within my range.",
      "Let me check my calendar... nope, still not gonna happen.",
      "I would if I could, but I can't, so I won't.",
      "I don't always say no, but when I do, I make it sound good.",
      "I'm sorry, did you think I was your personal assistant?",
      "I'm not at liberty to discuss that at this time.",
      "Yeah, no. Just... no.",
    ];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  return (
    <div className="text-center flex flex-col p-5">
      <h1
        onDoubleClick={() => {
          setCheatActive((prev) => !prev);
          promptRef.current.focus();
        }}
        className={`text-[34px] md:text-5xl lg:text-6xl ${
          cheatActive && "animate-shake"
        } cursor-pointer animation-delay-200 opacity-0 w-full leftToRight font-bold p-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-300`}
      >
        Joshua Answers
      </h1>
      <div className="mb-5 animation-delay-300 opacity-0 leftToRight font-light md:text-lg text-sm w-full self-center">
        <span>
          Type <span className="font-bold">{cheatPrompt}</span> to get started!
        </span>
      </div>
      {renderingResult ? (
        <>
          <LoadingSpinner
            answer={
              answer.length <= 0
                ? generateRandomResponse()
                : capitalizeFirstLetter(answer)
            }
          />
          <button
            className="w-full border-white p-4 border-[1px] "
            onClick={() => {
              setAnswer("");
              setRenderingResult(false);
              setQuestion("");
              setInput("");
            }}
          >
            Try again
          </button>
        </>
      ) : (
        <>
          <form
            autoComplete="off"
            className="flex opacity-0 leftToRight animation-delay-400 flex-col gap-3"
            ref={formRef}
          >
            <input
              value={input}
              ref={promptRef}
              placeholder={"Please enter prompt..."}
              className={`p-3 focus:text-blue-300 rounded-md`}
              onChange={handleInputChange}
              type="text"
              name="test"
            />
            <input
              placeholder="Please enter question..."
              className={`p-3 focus:text-pink-300 rounded-md`}
              type="text"
              ref={questionRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </form>

          <div className="flex opacity-0 leftToRight animation-delay-600 flex-col gap-3 mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();

                if (
                  input.toLowerCase() === cheatPrompt.toLowerCase() ||
                  input.toLowerCase().includes(cheatPrompt.toLowerCase())
                ) {
                  setRenderingResult(true);
                  console.log(
                    "what will be shown",
                    capitalizeFirstLetter(answer)
                  );
                } else {
                  alert("You must match the prompt.");
                }
              }}
              className={`rounded-xl transition-ease bg-gradient-to-r hover:text-sm min-h-[60px] from-blue-500 tracking-widest uppercase text-xl font-light to-pink-500 w-full p-3 cursor-pointer`}
            >
              Answer
            </button>


      <svg
        onClick={() => {alert('Double click the header or press the "." (period) button on your keyboard to enter the true answer.')}}
        className="transition-ease cursor-pointer self-center text-center opacity-30 mt-5 hover:opacity-80 h-[50px]"
        fill="white"
        clipRule="evenodd"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 6.5c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"
          fillRule="nonzero"
        />
      </svg>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
