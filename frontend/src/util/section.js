import axios from "axios";

const checkSection = async(sectionName)=>{
    const userId = localStorage.getItem("userId");
    const URL = import.meta.env.VITE_REACT_API_URL + "/api/section";

    if(!userId){
        return false;
    }
    try {
        const res = await axios.post(URL, {
            userId,
            sectionName
        });
        return res.data.completed;
    }catch(err){
        console.error("Can't validate section completion");
        console.log(err);
    }
};

export default checkSection;