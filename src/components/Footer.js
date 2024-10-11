import { LNKDIN_URL } from "../utils/constants";
const Footer = ()=>{
    return(
        <div className='w-full text-center p-5'>
            Created by
            <span>❤️</span>
            <a href={LNKDIN_URL}>Reshma Shaik </a>
            <span>&copy; </span>
            <strong>
                Spoons & <span>Forks</span>
            </strong>
        </div>
    )
}
export default Footer;