import { Link } from "react-router-dom";

const StartTest = ()=> {
    return (
    <div className="w-full bg-gray-100 h-screen text-gray-900 flex flex-col justify-center items-center">
        <div className="mb-8">
            <img src="./logo.png" alt="Logo" className="h-24" />
        </div>
        <div id="instructions" className="bg-white p-4 rounded-lg shadow-lg text-center w-1/2 h-2/3">
            <div className="w-full p-3">
                <h2 className="text-4xl text-red-500">Instructions:</h2>
            </div>
            <div className="w-full p-4 ">
                <ul className="text-left text-xl p-3 list-disc list-inside">
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ducimus aspernatur corporis.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, ipsum!</li>
                </ul>
            </div>
            <div className="w-full flex justify-evenly items-center p-4">
                    <Link to={"/"} className="bg-black hover:bg-gray-700 text-xl text-white p-2 w-fit h-fit rounded-xl">Go Back</Link>
                    <Link to={"/test/section/A"} className="bg-blue-500 hover:bg-blue-700 text-xl text-white p-2 w-fit h-fit rounded-xl">Start Test</Link>
            </div>
        </div>
    </div>);
};
export default StartTest;