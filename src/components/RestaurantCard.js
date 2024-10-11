
import { CDN_URL } from "../utils/constants";
import { MdStarRate } from "react-icons/md";
import { Link } from "react-router-dom";

const RestaurantCard = ({restaurantData})=>{
    const{id,name,costForTwo,cloudinaryImageId,avgRating} = restaurantData?.info;
    
    return(
        
        <div className='flex flex-col m-3 border border-yellow-400 w-44'>
            <Link to = {"/restaurants/" + id}> 
            <img src={CDN_URL +cloudinaryImageId } alt="" />
            <h5>{name.slice(0,13)}
                {name.length > 13 ? '...' : ''}
            </h5>
            <h4>{costForTwo}</h4>
            <h4 className='flex'>
                <MdStarRate className="border-6" style={avgRating > 4 ? {backgroundColor:'green'}:{backgroundColor:'red'}}/>
                <span className='ml-1'>{avgRating}</span>
            </h4>
            </Link> 
        </div>
         
    )
}
export default RestaurantCard;