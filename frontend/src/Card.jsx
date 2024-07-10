
import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { config } from 'dotenv';


function Card({img, title, text}) {

  const Card =() => {


    useEffect(()=>{
        getSearchQuery();
        // handleSearch();
    },[])
  }

  return(
    <>
      <div className="card">
      <img className="card-image" src={img} alt={title} />
      <h2 className="card-title">{title}</h2>
      <p className="card-text">{text}</p>
      </div>


    </>
  );
}


export default Card

