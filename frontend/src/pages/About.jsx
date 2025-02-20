import Header from "../components/Header";
import Footer from "../components/Footer";
const About = ()=>{
    return (<>
        <Header/>
        <div className="h-24 bg-white">
        </div>
        <div className="w-full h-fit flex flex-col items-center justify-center bg-gray-100">
            <div className="w-2/3 bg-white p-5 rounded-lg shadow-lg h-fit text-md mt-10">
                <h2 className="text-2xl font-bold text-black">About us:</h2>
                <div className="p-3 mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ea incidunt, magni, velit officia delectus laboriosam nam debitis aliquid quis doloremque quidem enim ad nesciunt eum cumque veritatis nobis architecto?
                </div>
                <div className="p-3 mt-2">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam officiis nulla praesentium. Ad cum fugit unde mollitia consequuntur, fugiat deleniti. Quis magnam hic veritatis dolore fugit, quam illo quidem eligendi blanditiis minus. Eligendi, qui enim harum quasi aspernatur nulla! Totam ratione assumenda sed porro perferendis maiores harum officiis. Molestiae, natus!
                </div>
            </div>
            <div className="w-fit p-4 gap-3 mt-10 shadow-xl flex justify-evenly bg-white rounded-2xl">
                <div className="flex flex-col items-center justify-center p-2 gap-3 h-fit w-fit">
                    <img src="Darshan.png" alt="Darshan Odedara" className="w-xs"/>
                    <h1 className="text-xl font-bold">Darshan Odedara</h1>
                    <h1 className="text-lg">Frontend Development</h1>
                </div>
                <div className="flex flex-col items-center justify-center p-2 gap-3 h-fit w-fit">
                    <img src="Steve.png" alt="Steve" className="w-xs"/>
                    <h1 className="text-xl font-bold">Steve Joseph</h1>
                    <h1 className="text-lg">Backend Development</h1>
                </div>
                <div className="flex flex-col items-center justify-center p-2 gap-3 h-fit w-fit">
                    <img src="" alt="Arjun" className="w-xs"/>
                    <h1 className="text-xl font-bold">Arjun Avittathur</h1>
                    <h1 className="text-lg">Machine Learning</h1>
                </div>
            </div>
            <Footer/>
        </div>
    </>
    );
};

export default About;