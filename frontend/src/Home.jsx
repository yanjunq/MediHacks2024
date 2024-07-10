import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import Header from "./Header"
import Footer from "./Footer"

// import.meta.env.CRAWLER_API_KEY

const Home = ()=>{

  const[searchQuery, setSearchQuery] = useState('');
  const lastFetchedQueryRef = useRef('');
  const [healthTips, setHealthTips] = useState([]);

    const getSearchQuery = async (query) => {  
        setSearchQuery(query);
    }
    
    const handleSearch = async()=>{
        if(searchQuery === lastFetchedQueryRef.current){
            return;
        }
        const inputQuery =
        searchQuery
          ? `how to reduce ${searchQuery}`
          : "health tips";

        try {
            const response = await fetch(`http://localhost:8000/api/fetch_health_tips/?query=${inputQuery}`);
            const data = await response.json();
            console.log(data);

            if (data && data.length >= 10) {
              setHealthTips(data.slice(0, 10));
            } else {
              setHealthTips(data || []);
            }
    
            lastFetchedQueryRef.current = searchQuery;
          } catch (err) {
            console.error('Error fetching search results:', err);
        }
    }

    useEffect(()=>{
        getSearchQuery();
    },[])

    return(
        <>
            <Header/>
            <Searchbar getQuery={getSearchQuery}/>
            <button  onClick={handleSearch}>
            <img className="card-image" src="https://via.placeholder.com/200" alt="pic1" />
            <h2 className="card-title">Health Tips</h2>
            Get Health Tips
            </button>
            <div>
            <div>
                {healthTips ? healthTips.map((tip, index) => (
                <div  key={index}>
                    <h1>{tip.title}</h1>
                    <p>{tip.snippet}</p>
                    <a href={tip.link} target="_blank" rel="noopener noreferrer">
                        <button>Watch Video</button>
                    </a>
                </div>
                )) : null}
            </div>
            </div>
            <Footer/>
        </>
    );

}

export default Home;


