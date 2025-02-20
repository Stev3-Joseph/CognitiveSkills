import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import checkSession from "../util/session";

const Register = () => {
    async function handleSubmit(e){
        e.preventDefault();
        let URL = import.meta.env.VITE_REACT_API_URL + "/api/login";
        
        let data = {
            "name": e.target["full-name"].value,
            "mobile": parseInt(e.target["mobile"].value),
            "date_of_birth": e.target["dob"].value
        }
        try {
            const res = await axios.post(URL, data);
            const response = res.data;
            // console.log(response);
            //Store userId and sessionId in local storage
            localStorage.setItem("userId", response.user.user_id);
            localStorage.setItem("sessionId", response.session_id);

            alert(response.message);
            if(res.status === 200){
                window.location.href = "/test";
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        async function redirect() {
            let session = await checkSession();
            console.log(session);
            if (session) {
                alert("You have already logged in. Start the test.");
                window.location.href = "/test";
            }
        }
        redirect();
    },[]);
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <div className="mb-8">
                <Link to="/"><img src="./logo-2.png" alt="Logo" className="h-24" /></Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-black text-center mb-6">Login to start test</h1>
                <p className="text-red-500 text-center mb-3">{`(All the fields are mandatory)`}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="full-name" className="text-black font-medium">Full Name:</label>
                        <input type="text" id="full-name" name="full-name" className="border border-black rounded-md p-2" />

                        <label htmlFor="mobile" className="text-black font-medium">Mobile number:</label>
                        <input type="tel" id="mobile" name="mobile" className="border border-black rounded-md p-2" />

                        <label htmlFor="dob" className="text-black font-medium">Birth date:</label>
                        <input type="date" id="dob" name="dob" className="border border-black rounded-md p-2" />

                    </div>
                    <div className="flex justify-center mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
