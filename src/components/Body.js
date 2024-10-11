import React, {useState,useEffect} from 'react';
import {SWIGGY_API_URL} from '../utils/constants';
import RestaurantCard from './RestaurantCard'
import { CiSearch } from "react-icons/ci";
import Shimmer from './Shimmer';
import About from './About';

const Body = ()=>{
    const[restaurantList,setRestaurantList] = useState([])
    const[showButton,setShowButton] = useState(true)
    const[searchRestaurant,setSearchRestaurant] = useState('')
    const[filteredRestaurants,setFilteredRestaurants] = useState([])
    const[restaurantName,setRestaurantName] = useState('')

    const fetchData = async ()=>{
        try {
            const data = await fetch(SWIGGY_API_URL);
            const json = await data.json();
            console.log(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
            const restaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            setRestaurantList(restaurants)  
            setFilteredRestaurants(restaurants)
        } catch (error) {
            console.log("Error fetching data :", error);    
        }    
    }

    useEffect(()=>{
        fetchData();
    },[])

    const topRatedRestaurants = ()=>{
        const topRated = restaurantList.filter((res)=>res.info.avgRating > 4)
        setFilteredRestaurants(topRated)
        setShowButton(false)
    }

    const searchByName = ()=>{
        const filtered = restaurantList.filter((res)=>
            res.info.name.toLowerCase().includes(searchRestaurant.toLowerCase())
        )
        setFilteredRestaurants(filtered)
        setSearchRestaurant('')
        setRestaurantName(searchRestaurant)
    }

    return restaurantList.length == 0 ? (
        <Shimmer/>
        ) : (
        <div className='flex flex-col gap-8 justify-between items-center mt-3'>
            <div className='flex justify-between items-center'>
                <div className='flex border border-black'>
                    <input type="text"  className='w-60 h-auto' placeholder='search a restaurant you want' 
                    value = {searchRestaurant} onChange={(e)=>{setSearchRestaurant(e.target.value)}}/>   
                    <button onClick={searchByName}><CiSearch/></button>  
                </div>
                
                {showButton &&
                <div className='border border-black ml-12'>
                    <button className=' bg-orange-400 p-2 border border-black' 
                    onClick = {topRatedRestaurants}>Top Restaurants</button>
                </div>
                }       
            </div>

            <div className='flex flex-wrap'>
                {filteredRestaurants.length !== 0 ? (
                    filteredRestaurants.map((restaurant)=>(
                    <RestaurantCard key = {restaurant.info.id} 
                    restaurantData={restaurant}/>))
                ):(
                    <h2>Sorry, we couldn't find any restaurant for "{restaurantName}"</h2>
                )}
            </div>
        </div>
    )
}
export default Body;