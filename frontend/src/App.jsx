// import Header from "./Header"
// import Footer from "./Footer"
// import Card from "./Card"
// import Searchbar from "./Searchbar";

// function App() {

//   return(
//     <>
//       <Header/>
//       <Searchbar/>
//       <Card/>
//       <Footer/>

//     </>
//   );
// }

// export default App



import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App