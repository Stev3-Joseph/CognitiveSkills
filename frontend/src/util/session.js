import axios from "axios";

const checkSession = async()=>{
    const sessionId = localStorage.getItem("sessionId");
    if(!sessionId){
        console.log("Session id not found - from checkSession function");
        return false;
    }
    const URL = import.meta.env.VITE_REACT_API_URL + "/api/session";
    try{
        const response = await axios.post(URL,null, {
            params:{
                session_id : sessionId
            }
        });
        console.log(response.data);
        return response.data.valid;
    }catch(err){
        console.log(err);
        return false;
    }
}

export default checkSession;