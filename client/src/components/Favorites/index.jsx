import React from 'react'
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

export default function Favorites(){
    // const [allSongs, setAllSongs] = useState([]);
    const { user } = useSelector(state => state.user)
    console.log(user.username)
    console.log(user.favorites)

    // useEffect(() => {
    //     user.favorites;
    //   }, [user]);


    return(
        <>
    <h1>jose se la come</h1>
        </>
    )
}