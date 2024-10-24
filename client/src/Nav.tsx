export default function Nav(){
    return (
        <>
         <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-2xl font-bold">
            
              <a href="/"> <img src="chat.png" className="mx-auto h-10 w-auto"/>
              </a>
            </div>
            <div className="">
                <ul className="flex justify-between items-center space-x-4 text-white font-bold">
                    <li>Duo-Chat</li>
                </ul>
            </div>
            <ul className="flex space-x-6">
            <li>  
                <a href="#" className="text-white hover:text-gray-300">Logout</a>
            </li>
            </ul>
        </div>
    </nav>
        </>
    )
}