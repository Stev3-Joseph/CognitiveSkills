import {Link} from 'react-router-dom';
const Footer = ()=>{
    return (
        <footer className="w-full bg-gray-800 text-white text-xl p-5 mt-7 flex">
            <div className="w-1/2 p-4 flex flex-col justify-center">
                <h1 className='text-2xl'>Quick Links</h1>
                <ul className='w-full h-full flex flex-col gap-3 justify-center'>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/register">Register for test</Link></li>
                </ul>
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className='w-full p-5 flex justify-center'>
                    <img src="./logo.png" className="w-1/2" alt="Logo" />
                </div>
                <div>
                    <p>© 2025 All Rights Reserved</p>
                    <div className="flex flex-col items-center mt-3">
                        <h1>Created by - </h1>
                        <h2 className='text-3xl'>Darshan Odedara</h2>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;