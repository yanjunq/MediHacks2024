import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Searchbar({getQuery}) {

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target.search.value;
    getQuery(query);
    console.log('Search query:', query);
    // Implement search functionality
  };

  const acceptTermsOfUse = async () => {
    const response = await axios.post('http://api.endlessmedical.com/v1/dx/AcceptTermsOfUse?SessionID=' + id + '&passphrase=I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com')
    console.log(response.data)
  }

  var id = []

  useEffect(() => {
    const initSession = async () =>{
      const response = await axios.get('http://api.endlessmedical.com/v1/dx/InitSession')
      const result = await response.data
      id = result.SessionID
      console.log(result)
      console.log(result.SessionID)
     
    }
    initSession();
  }, []); 

  return (
    <div>
      <button onClick={acceptTermsOfUse}>
        "Agree to terms of services"
      </button>
      <form className="search-bar" onSubmit={handleSearch}>
        <input 
          type="text" 
          name="search" 
          placeholder="How can I help you today? Type in your symptoms to get started..." 
          className="search-input"
        />
        <button type="submit" className="search-button">Ask</button>
      </form>
    </div>
  );
}

export default Searchbar;