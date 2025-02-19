import { useParams } from "react-router-dom";
import Question from "../components/Question";
import TestNav from "../components/TestNav";
import { useEffect} from "react";
import axios from "axios";
// import checkSection from "../util/section";
// import checkSession from "../util/session";

const QuestionPage = () =>{
    const { sectionName, qNumber } = useParams();
    useEffect(() => {
        if( parseInt(qNumber) < 1 || parseInt(qNumber) > 10 || sectionName > 'D'){
            //navigate to path - /#
            window.location.href = '/notfound';
        }
        //Check session and section
        // if(!checkSession()){
        //     window.location.href = "/login";
        // }else if(!checkSection(sectionName)){
        //     if(sectionName != 'D'){
        //         window.location.href = `/test/section/${sectionName + 1}`;
        //     }else{
        //         window.location.href = "/test/finish";
        //     }
        // }
    }, [qNumber, sectionName]);

    function submitSection(timeTaken){
        if( parseInt(qNumber) !== 10 ){
            return;
        }
        const storedAnswers = JSON.parse(localStorage.getItem("answers")) || [];
        if(!storedAnswers || storedAnswers.length !== 10){
            alert("Please answer all questions before submitting the section");
            return;
        }

        const userId = localStorage.getItem("userId");
        const sessionId = localStorage.getItem("sessionId");
        try{
            const URL = import.meta.env.VITE_REACT_API_URL + "/api/submit";
            axios.post(URL, {
                userId,
                sessionId,
                section: sectionName,
                answers: storedAnswers,
                timeTaken: parseInt(timeTaken)
            });
            console.log(`Section ${sectionName} completed in ${timeTaken} seconds`);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="flex">
            <div className="w-1/4 h-screen bg-gray-200">
                <TestNav onSubmit={submitSection} setTime/>
            </div>
            <div className="w-3/4 h-screen bg-gray-100 text-gray-900 p-10">
                <Question 
                    qnumber={parseInt(qNumber)}
                    question="What is the capital of India?"
                    options={["Delhi", "Mumbai", "Kolkata", "Chennai"]}
                />
            </div>
        </div>
    );
}

export default QuestionPage;