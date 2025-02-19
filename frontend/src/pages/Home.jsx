import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className='w-full pt-24'>
                <div id="hero" className='w-full h-fit flex justify-center items-center p-8 gap-8'>
                    <div className='w-1/3 h-full flex flex-col justify-between items-center'>
                        <img src="./hero-txt.png" alt="Hero Text" className='w-3/4' />
                        {/* <h1><del className='text-red-700'>No</del> more</h1>
                            <h1><del className='text-red-700'>empty</del></h1>
                            <h1>classrooms <span className='text-green-400'>!</span></h1> */}
                        <div className='mt-5 w-full flex h-fit justify-center items-center'>
                            <Link 
                                to = "/register"
                                className='inline-flex items-center justify-center px-8 py-4
                                text-lg font-bold text-white
                                bg-gradient-to-r from-blue-500 to-blue-700
                                rounded-lg
                                drop-shadow-md
                                transform-gpu
                                hover:rotate-[1deg] hover:scale-105
                                hover:skew-x-1
                                transition-all duration-300
                                shadow-lg hover:shadow-xl'
                            >Register Now</Link>
                        </div>
                    </div>
                    <div className='w-2/3 h-auto rounded-2xl overflow-hidden'>
                        <img src="./hero-image.jpg" alt="hero-image" className='w-full' />
                    </div>
                </div>
                <div className='flex justify-center items-center w-full h-fit pt-5 p-4'>
                    <div className='w-1/2 p-4 text-xl'>
                        <p className='w-3/4'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sed recusandae dignissimos repudiandae. Impedit, voluptatibus animi! Id vero facilis unde fuga reprehenderit dolores neque, consequatur suscipit molestiae necessitatibus fugiat. Illum dignissimos quas minus placeat sapiente doloremque porro voluptas eligendi ducimus?
                        </p>
                    </div>
                    <div className='w-1/2 p-4'>
                        <img src="./girl-on-board.jpg" alt="Girl writing on board" className='w-full rounded-2xl' />
                    </div>
                </div>
                <div className='flex justify-center items-center w-full h-fit pt-5 p-4'>
                    <div className='w-1/2 p-4'>
                        <img src="./students.jpg" alt="Girl writing on board" className='w-full rounded-2xl' />
                    </div>
                    <div className='w-1/2 p-4 text-xl'>
                        <p className='w-3/4'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sed recusandae dignissimos repudiandae. Impedit, voluptatibus animi! Id vero facilis unde fuga reprehenderit dolores neque, consequatur suscipit molestiae necessitatibus fugiat. Illum dignissimos quas minus placeat sapiente doloremque porro voluptas eligendi ducimus?
                        </p>
                    </div>
                </div>
                <div className='w-full p-5 h-fit flex flex-col justify-center items-center gap-4'>
                    <p className='text-black text-5xl'>Register for the test now !</p>
                    <button className='bg-blue-500 text-xl text-white p-3 w-fit h-fit rounded-xl'>Register</button>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
};

export default Home;