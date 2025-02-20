import { useParams } from "react-router-dom";
import Question from "../components/Question";
import TestNav from "../components/TestNav";
import { useEffect, useState} from "react";
import axios from "axios";
import checkSession from "../util/session";

const QuestionPage = () =>{
    const { sectionName, qNumber } = useParams();
    const [questionNumber, setQuestionNumber] = useState(null);
    useEffect(() => {
        if( parseInt(qNumber) < 1 || parseInt(qNumber) > 10 || sectionName > 'D'){
            window.location.href = '/notfound';
        }
        //Check session and section
        if(!checkSession()){
            window.location.href = "/login";
        }
        setQuestionNumber(parseInt((sectionName.charCodeAt(0) - 65) * 10) + parseInt(qNumber))
    }, [qNumber, sectionName]);

    function submitSection(timeTaken){
        if( parseInt(qNumber) !== 10 ){
            return;
        }
        const storedAnswers = JSON.parse(localStorage.getItem("answers")) || [];
        const answeredQuestions = new Set(storedAnswers.map(answer => answer.qNumber));
        if (answeredQuestions.size !== 10) {
            alert("Please answer all questions before submitting.");
            return;
        }

        const userId = localStorage.getItem("userId");
        const sessionId = localStorage.getItem("sessionId");
        try{
            const URL = import.meta.env.VITE_REACT_API_URL + "/api/submit";
            const response = axios.post(URL, {
                userId,
                sessionId,
                section: sectionName,
                answers: storedAnswers,
                timeTaken: parseInt(timeTaken)
            });
            localStorage.removeItem("answers");
            localStorage.removeItem("sectionTimer");
            console.log(response.message);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="flex bg-gray-100 h-screen">
            <div className="w-1/3 h-full">
                <TestNav onSubmit={submitSection} setTime/>
            </div>
            <div className="w-2/3 h-full text-gray-900 p-10 overflow-y-scroll">
                <Question 
                    qnumber={parseInt(questionNumber)}
                    question="What is the capital of India?"
                    options={["Delhi", "Mumbai", "Kolkata", "Chennai"]}
                />
            </div>
        </div>
    );
}

export default QuestionPage;