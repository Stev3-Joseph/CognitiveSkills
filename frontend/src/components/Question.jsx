import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Option from "./Option";
import questions from "../data/questions";

const Question = ({ qnumber }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const questionData = questions[qnumber - 1];

  useEffect(() => {
    setSelectedOption(null);

    if (!questionData) return; // Prevent errors if questionData is undefined

    // Retrieve stored answers
    const storedAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const currentAnswer = storedAnswers.find(
      (answer) => answer.qNumber === qnumber
    );

    if (currentAnswer) {
      setSelectedOption(currentAnswer.answer - 1);
    }
  }, [qnumber, questionData]);

  const handleSelect = (index) => {
    setSelectedOption(index);

    // Update localStorage
    const storedAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const updatedAnswers = storedAnswers.map((answer) =>
      answer.qNumber === qnumber
        ? { qNumber: qnumber, answer: index + 1 }
        : answer
    );

    const isNewAnswer = !storedAnswers.some(
      (answer) => answer.qNumber === qnumber
    );
    if (isNewAnswer)
      updatedAnswers.push({ qNumber: qnumber, answer: index + 1 });

    localStorage.setItem("answers", JSON.stringify(updatedAnswers));
  };

  if (!questionData) {
    return (
      <div className="p-10 w-full bg-white rounded-2xl text-2xl shadow-lg">
        Invalid question number.
      </div>
    );
  }

  return (
    <div className="p-10 w-full bg-white rounded-2xl text-2xl shadow-lg">
      <div id="question" className="mb-10 flex flex-col gap-2">
        <div className="flex flex-row">
          <div className="font-bold">Q{qnumber}:</div>
          <div className="">{questionData.question}</div>
        </div>
        {questionData.questionImage && (
          <div className="w-full">
            <img src={questionData.questionImage} alt="Question Image" />
          </div>
        )}
      </div>
      <div id="options" className="flex flex-col gap-2">
        {questionData.options.map((op, index) => (
          <Option
            key={index}
            op={op}
            index={index}
            isSelected={selectedOption === index}
            handleSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

Question.propTypes = {
  qnumber: PropTypes.number.isRequired,
};

export default Question;
