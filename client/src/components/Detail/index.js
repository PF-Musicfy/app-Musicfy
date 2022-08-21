import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getId } from '../../store/slice';
import { useParams } from "react-router-dom"


export default function Detail(){
    const dispatch = useDispatch()
    const { detailTracks } = useSelector(state => state.music)

    const { id } = useParams()

    useEffect(()=>{
        dispatch(getId(id))
    },[dispatch, id])

    const data = detailTracks.map(e => e.name)
    console.log(data)

    return(

    <div>
        <h1>{detailTracks.name}</h1>

    </div>

    )
}