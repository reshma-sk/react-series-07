import React,{useState} from 'react'
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
const Header = ()=>{
    const[isLoggedIn,setIsLoggedIn] = useState(false)
    return(
        <div className = "flex justify-between items-center border border-black">
            <div>
                <img className='p-4 w-20' src={LOGO_URL} alt="Logo_img" />
            </div>
            <div className="p-4">
                <ul className='flex font-bold'>
                    <li className='m-3 hover:bg-orange-300'><Link to="/">Home</Link></li>
                    <li className='m-3 hover:bg-orange-300'><Link to="/About">About</Link></li>
                    <li className='m-3 hover:bg-orange-300'><Link to="/contact">Contact Us</Link></li>
                    <li className='m-3 hover:bg-orange-300'><Link><FaCartArrowDown/></Link></li>  
                    <button className='m-3 hover:bg-orange-300' onClick = {()=>setIsLoggedIn(!isLoggedIn)}>
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </button>          
                </ul>
            </div>

        </div>
    )
}
export default Header;