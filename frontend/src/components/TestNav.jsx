import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Timer from './Timer';
import PropTypes from 'prop-types';

const TestNav = ({ onSubmit }) => {
  const { sectionName, qNumber } = useParams();
  const navigate = useNavigate();
  const totalQuestions = 10;
  const [timeTaken, setTimeTaken] = useState(0);

  const handleQuestionClick = (questionNum) => {
    navigate(`/test/section/${sectionName}/question/${questionNum}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mx-auto max-w-sm text-center w-full h-full flex flex-col">
      <h3 className="text-4xl font-bold text-black mt-10 mb-6">Section {sectionName}</h3>

      {/* Timer Display */}
      <div className="w-full flex justify-center items-center p-5">
        <Timer onTimeUpdate={setTimeTaken} />
      </div>

      {/* Question Navigation */}
      <div className="grid grid-cols-5 gap-3 mb-4 w-full">
        {[...Array(totalQuestions)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleQuestionClick(index + 1)}
            className={`border-2 py-2 rounded-md transition h-20 text-2xl ${index + 1 === parseInt(qNumber)
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-800 border-gray-400 hover:bg-blue-500 hover:text-white'
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col items-center w-full text-xl">
        <div className="flex justify-between gap-2 w-full mt-5 mb-5">
          <button
            onClick={() => navigate(`/test/section/${sectionName}/question/${parseInt(qNumber) - 1}`)}
            className="bg-fuchsia-900 text-white py-2 px-4 rounded-md transition hover:bg-blue-600 w-1/2"
            disabled={qNumber == 1}
          >
            ⬅️ Prev
          </button>
          <button
            onClick={() => navigate(`/test/section/${sectionName}/question/${parseInt(qNumber) + 1}`)}
            className="bg-green-500 text-white py-2 px-4 rounded-md transition hover:bg-blue-600 w-1/2"
            disabled={qNumber == 10}
          >
            Next ➡️
          </button>
        </div>

        {/* Submit Section Button */}
        <button
          onClick={() => onSubmit(timeTaken)}
          className="bg-red-500 text-white py-2 px-4 rounded-md transition hover:bg-blue-600 w-full"
          disabled={qNumber != 10}
        >
          Submit Section ✉️
        </button>
      </div>
    </div>
  );
};
TestNav.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TestNav;
