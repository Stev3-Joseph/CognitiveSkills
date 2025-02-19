const NotFound = ()=> {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-white">
            <div className="bg-white p-8 w-1/3 h-fit rounded-3xl flex flex-col justify-center items-center">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/024/405/934/small_2x/icon-tech-error-404-icon-isolated-png.png" className="max-w-full max-h-full"/>
                <h1 className="text-gray-900 text-5xl">Oops!</h1>
                <h1 className="text-gray-900 text-4xl">Page not found.</h1>
            </div>
        </div>
    )
}

export default NotFound;