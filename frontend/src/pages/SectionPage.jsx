import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import checkSection from '../util/section';
// import checkSession from '../util/session';

const SectionPageInfo = {
    "A": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores numquam, libero quod ab laborum maxime! Sequi molestiae quod fugiat illo?",
    "B": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores numquam, libero quod ab laborum maxime! Sequi molestiae quod fugiat illo?",
    "C": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores numquam, libero quod ab laborum maxime! Sequi molestiae quod fugiat illo?",
    "D": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores numquam, libero quod ab laborum maxime! Sequi molestiae quod fugiat illo?",
};

const sectionImage = {
    "A": "https://plus.unsplash.com/premium_photo-1719235403324-c1655d45146a?q=80&w=1960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "B": "https://images.unsplash.com/photo-1622838320000-4b3b3b3b3b3b",
    "C": "https://images.unsplash.com/photo-1622838320000-4b3b3b3b3b3b",
    "D": "https://images.unsplash.com/photo-1622838320000-4b3b3b3b3b3b"
};

const SectionPage = () => {
    const { sectionName } = useParams();
    function goBack(){
        window.history.back();
    }
    function startQuiz(){
        window.location.href = `/test/section/${sectionName}/question/1`;
    }

    useEffect(() => {
        if (sectionName > 'D') {
            window.location.href = '/notfound';
        }
        //Check session & section
        // if (!checkSession()) {
        //     window.location.href = "/login";
        // } else if (!checkSection(sectionName)) {
        //     if (sectionName != 'D') {
        //         window.location.href = `/test/section/${sectionName + 1}`;
        //     } else {
        //         window.location.href = "/test/finish";
        //     }
        // }
    }, [sectionName]);
    return (
        <div className="w-full h-screen bg-gray-100 flex justify-evenly items-center">
            <div className="w-1/3 bg-white p-5 gap-10 h-2/3 flex flex-col justify-around rounded-2xl text-center">
                <div>
                    <div className="w-full mt-5">
                        <h1 className="text-4xl text-black">Section - {sectionName}</h1>
                    </div>
                    <div className="w-full mt-8">
                        {SectionPageInfo[sectionName]}
                    </div>
                </div>
                <div className="w-full flex justify-center gap-5">
                    <button className="text-white bg-black hover:bg-gray-800 p-2 rounded-md" onClick={()=>goBack()}>Go Back</button>
                    <button className="text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-md" onClick={()=>startQuiz()}>Start Quiz</button>
                </div>
            </div>
            <div className="w-1/3 h-2/3 flex justify-center items-center">
            <img src={sectionImage[sectionName]} alt="Section Image" className="max-w-full max-h-full"/>
            </div>
        </div>
    )
};

export default SectionPage;