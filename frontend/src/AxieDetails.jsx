import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import findAxie from './functions/findAxie'


export default function AxieDetails() {
  const [axieData, setAxieData] = useState({})
  let { id } = useParams();

  useEffect(() => {
    let searchAxie = async ()=>{
      let data = await findAxie(id)
      console.log(data);
      return setAxieData(data)
    }
    searchAxie()
  }, [])
  

  return (
    <div>AxieDetails {id}</div>
  )
}
