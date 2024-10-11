import { CiSearch } from "react-icons/ci";
const Shimmer = ()=>{
    return(
        <div className='flex flex-col gap-8 justify-between items-center mt-3'>
            <div className='flex justify-between items-center'>
                <div className='flex border border-black'>
                    <input type="text"  className='w-50 h-auto' placeholder='search'/>   
                    <CiSearch/>
                </div>
                <div className='flex border border-black'></div>
            </div>
        </div>
    )

}
export default Shimmer;