
import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { config } from 'dotenv';

const Card =() => {


    useEffect(()=>{
        getSearchQuery();
        // handleSearch();
    },[])

  return(
    <>
    </>

  );
}


export default Card

