import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import Header from "./Header"
import Footer from "./Footer"
import Card from './Card';

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

            <div className="card-container">
                <Card img={"https://via.placeholder.com/200"}
                title={"Health Tips"}
                text={"Get Health Tips"}
                onClick={handleSearch}
                />
                <Card img={"https://via.placeholder.com/200"}
                title={"Today's Health News"}
                text={"set up later"}
                />
                <Card img={"https://via.placeholder.com/200"}
                title={"Haven't think of one"}
                text={"set up later"}
                />
            </div>

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
            <div className="wavy-divider">
                <svg viewBox="0 0 1440 320">
                    <path fill="#00bfff" fillOpacity="0.7" d="M0,96L48,128C96,160,192,224,288,213.3C384,203,480,117,576,117.3C672,117,768,203,864,213.3C960,224,1056,160,1152,128C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            <Footer/>
        </>
    );

}

export default Home;


