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
        <div className="flex flex-col">
          <h3 className="text-center font-bold">Menu</h3>
          {itemCards.length ? (
            itemCards.map((item) => {
             const {
            id,
            name,
            price,
            defaultPrice,
            ratings,
            imageId,
            description,
          } = item.card.info;
          return (
            <div key={id} className="w-[80%] flex justify-evenly items-end mt-2 border border-b-black">
              <div className="flex flex-col justify-start items-center">
                <h2>{name}</h2>
                <h4>₹{price / 100 || defaultPrice / 100}</h4>
                <p>{description && description.slice(0, 60) || "Dummy"}</p>
                <h4 className="rating">
                   <MdStarRate className="border-6" style={ratings?.aggregatedRating?.rating > 4.0 ? {backgroundColor:'green'}:{backgroundColor:'red'}}/>
                  <span>
                    {ratings?.aggregatedRating?.rating || 3.8} (
                    {ratings?.aggregatedRating?.ratingCountV2 || 6})
                  </span>
                </h4>
              </div>
              <div className="right">
                <img className = "w-14" src={CDN_URL + imageId} alt={name} />
                <button className="add-btn">ADD</button>
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
