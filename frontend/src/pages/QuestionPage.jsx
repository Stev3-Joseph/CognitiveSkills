import { useParams } from "react-router-dom";
import Question from "../components/Question";
import TestNav from "../components/TestNav";
import { useEffect, useState } from "react";
import axios from "axios";
import checkSession from "../util/session";
import logout from "../util/logout";
import questions from "../data/questions"; // Import to check valid question numbers

const QuestionPage = () => {
  const { sectionName, qNumber } = useParams();
  const [questionNumber, setQuestionNumber] = useState(null);

  useEffect(() => {
    async function check() {
      const curr = localStorage.getItem("currentSection");
      if (curr !== sectionName) {
        window.history.back();
      }

      // Check session and section
      const session = await checkSession();
      if (!session) {
        alert("Session expired. Please login again.");
        await logout();
      }
    }

    const parsedQNumber = parseInt(qNumber);
    const sectionOffset = (sectionName.charCodeAt(0) - 65) * 10; // A = 0, B = 10, etc.
    const computedQuestionNumber = sectionOffset + parsedQNumber;

    // Ensure the question number is within range
    if (
      parsedQNumber < 1 ||
      parsedQNumber > 10 ||
      sectionName > "D" ||
      computedQuestionNumber > questions.length
    ) {
      window.location.href = "/notfound";
      return;
    }

    setQuestionNumber(computedQuestionNumber);
    check();
  }, [qNumber, sectionName]);

  const submitSection = async (timeTaken) => {
    if (parseInt(qNumber) !== 10) {
      return;
    }
    const storedAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const answeredQuestions = new Set(
      storedAnswers.map((answer) => answer.qNumber)
    );
    if (answeredQuestions.size !== 10) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const userId = localStorage.getItem("userId");
    const sessionId = localStorage.getItem("sessionId");

    try {
      const URL = import.meta.env.VITE_REACT_API_URL + "/api/submit";
      const response = await axios.post(URL, {
        userId,
        sessionId,
        section: sectionName,
        answers: storedAnswers,
        timeTaken: parseInt(timeTaken),
      });
      console.log(response + "response");
      localStorage.removeItem("answers");
      localStorage.removeItem("sectionTimer");
      localStorage.removeItem("currentSection");

      if (sectionName === "D") {
        window.location.href = "/test/finish";
      } else {
        window.location.href = `/test/section/${String.fromCharCode(
          sectionName.charCodeAt(0) + 1
        )}`;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex bg-gray-100 h-screen">
      <div className="w-1/3 h-full">
        <TestNav onSubmit={submitSection} setTime />
      </div>
      <div className="w-2/3 h-full text-gray-900 p-10 overflow-y-scroll">
        {questionNumber !== null && <Question qnumber={questionNumber} />}
      </div>
    </div>
  );
};

export default QuestionPage;
