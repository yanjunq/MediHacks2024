import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValueInput from './ValueInput';



function Searchbar({getQuery}) {

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [id, setID] = useState('');
  const [features, setFeatures] = useState('');
  const [item, setItem] = useState([])
  const [formVisible, setVisible] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target.search.value;
    getQuery(query);
    console.log('Search query:', query);
    // Implement search functionality
    var response = await axios.post('http://api.endlessmedical.com/v1/dx/UpdateFeature?SessionID=' + id + '&name=Chills&value=mild')
    var response = await axios.get('http://api.endlessmedical.com/v1/dx/Analyze?SessionID=' + id)
    console.log(response.data.Diseases)
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const filteredSuggestions = features.filter(item =>
        item.text.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const acceptTermsOfUse = async () => {
    const response = await axios.post('http://api.endlessmedical.com/v1/dx/AcceptTermsOfUse?SessionID=' + id + '&passphrase=I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com')
    console.log(response.data)
  }

  const showOptions = (item) => {
    setVisible(true)
    setItem(item)
  }

  useEffect(() => {
    const initSession = async () =>{
      var response = await axios.get('http://api.endlessmedical.com/v1/dx/InitSession')
      const result = await response.data
      setID(result.SessionID)
      console.log(result)
      console.log(result.SessionID)

      const res = await fetch("./src/assets/SymptomsOutput.json")
      const object =await res.json()
      console.log(object)
      setFeatures(object)
    }
    initSession();
  }, []); 

  

  return (
    <div>
      <button onClick={() => acceptTermsOfUse}>
        "Agree to terms of services"
      </button>
      <form className="search-bar" onSubmit={handleSearch}>
        <input 
          type="text" 
          name="search" 
          placeholder="How can I help you today? Type in your symptoms to get started..." 
          className="search-input"
          onChange={handleInputChange}
        />
          {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="suggestion-item"
              onClick={() => showOptions(suggestion)}>
                {suggestion.text}
              </li>
            ))}
          </ul>
        )}
        <button type="submit" className="search-button">Ask</button>
      </form>
      {formVisible && (<ValueInput item={item} SessionID={id} />)}
    </div>
  );
}

export default Searchbar;