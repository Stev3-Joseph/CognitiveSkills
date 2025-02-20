import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Option from "./Option";

const Question = ({ qnumber, question, options }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        setSelectedOption(null);

        // Retrieve stored answers
        const storedAnswers = JSON.parse(localStorage.getItem("answers")) || [];
        const currentAnswer = storedAnswers.find(answer => answer.qNumber === qnumber);

        if (currentAnswer) {
            setSelectedOption(currentAnswer.answer - 1);
        }
    }, [qnumber]);

    const handleSelect = (index) => {
        setSelectedOption(index);

        // Update localStorage
        const storedAnswers = JSON.parse(localStorage.getItem("answers")) || [];
        const updatedAnswers = storedAnswers.map(answer =>
            answer.qNumber === qnumber ? { qNumber: qnumber, answer: index + 1 } : answer
        );

        const isNewAnswer = !storedAnswers.some(answer => answer.qNumber === qnumber);
        if (isNewAnswer) updatedAnswers.push({ qNumber: qnumber, answer: index + 1 });

        localStorage.setItem("answers", JSON.stringify(updatedAnswers));
    };

    return (
        <div className="p-10 w-full bg-white rounded-2xl text-2xl shadow-lg">
            <div id="question" className="mb-10 flex gap-2">
                <div className="font-bold">Q{qnumber}:</div>
                <div className="">{question}</div>
            </div>
            <div id="options" className="flex flex-col gap-2">
                {options.map((op, index) => (
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
    question: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    qnumber: PropTypes.number.isRequired,
};

export default Question;
