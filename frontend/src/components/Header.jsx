import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import checkSession from '../util/session';
import logout from '../util/logout';

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    async function sessionCheck(){
        let session = await checkSession();
        setLoggedIn(session);
    }
    useEffect(()=>{
        sessionCheck();
    },[]);

    return (
        <header className="fixed text-black pr-4 pl-4 pt-2 pb-2 w-full flex justify-between items-center backdrop-blur-sm h-24 border-b-2 border-gray-200 rounded-b-lg">
            <Link to="/" className="text-3xl font-bold h-full">
                <img src="/logo-2.png" alt="Logo" className="h-full" />
            </Link>
            <nav className="flex gap-2 text-xl">
                <Link to="/" className="mr-5 bg-white pr-2 pl-2 rounded-sm">Home</Link>
                <Link to="/about" className="mr-5 bg-white pr-2 pl-2 rounded-sm">About</Link>
                <Link to="/register" className="mr-5 bg-white pr-2 pl-2 rounded-sm">Register</Link>
                {!loggedIn ? (
                    <Link to="/login" className="mr-5 bg-white pr-2 pl-2 rounded-sm">Login</Link>
                ) : (
                    <button onClick={logout} className="mr-5 bg-white pr-2 pl-2 rounded-sm">Log out</button>
                )}
            </nav>
        </header>
    );
};

export default Header;
