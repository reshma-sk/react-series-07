import { useEffect, useState } from "react";
import { CDN_URL, MENU_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { MdStarRate } from "react-icons/md";


const RestaurantMenu = ()=>{
    const[restaurantInfo,setRestaurantInfo] = useState(null)
    const {resId} = useParams();
    console.log(resId);
    
    const fetchMenusData = async()=>{
        try {
            const data = await fetch(MENU_URL + resId)
            const json = await data.json();
            console.log(json);   
            setRestaurantInfo(json) 
        } catch (error) {
            console.log("can not get menu",error);    
        }

    }
    useEffect(()=>{
        fetchMenusData();

    },[])
    if(restaurantInfo === null){
        return <Shimmer/>

    }
    console.log(restaurantInfo?.data?.cards[2]?.card?.card?.info);
    
    const{name,cuisines,costForTwo,cloudinaryImageId,locality,avgRatingString,sla} = restaurantInfo?.data?.cards[2]?.card?.card?.info;
    const {itemCards} = restaurantInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
    console.log(itemCards);
    
    
    return( 
        <div className="w-[60%]">
          <h3 className="text-center font-bold">Menu</h3>
          {itemCards.length ? (
            itemCards.map((item) => {
            const {id,name,price,defaultPrice,ratings,imageId,description} = item.card.info;
            return (
              <div key={id} className="flex justify-between items-center pt-[40px] pb-[40px] gap-3 border border-black border-b-4">
                <div className="flex flex-col gap-2">
                  <h2>{name}</h2>
                  <h4>₹{price / 100 || defaultPrice / 100}</h4>
                  <p>{description && description.slice(0, 60) || "Dummy"}</p>
                  <h4 className="rating">
                   <MdStarRate className="border-6" style={ratings?.aggregatedRating?.rating > 4.0 ? {backgroundColor:'green'}:{backgroundColor:'red'}}/>
                  </h4>
                </div>

                <div className="w-[150px] h-[120px] object-cover border-r-2">
                  <img className = "w-14" src={CDN_URL + imageId} alt={name} />
                  <button className="text-green bg-white">ADD</button>
                </div>
              </div>
            );
          })
      ) : (
        <h2>No items available</h2>
      )}      
    </div>    
    )
}
export default RestaurantMenu;
