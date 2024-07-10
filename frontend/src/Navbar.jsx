import React, {useState} from "react";


function Navbar() {


  return(
    <nav className="navbar">
        <ul className="navlist">
          <li className="nav"><a href="#">Home</a></li>
          <li className="nav"><a href="#">About</a></li>
          <li className="nav"><a href="#">Services</a></li>
          <li className="nav contact">
            <a href="#contact">Contact</a>
            <div className="dropMenu">
              <p>Email: hi@gmail.com</p>
              <p>Phone: +123 456 789</p>
              <p>Address: 8888 University Dr W, Burnaby, BC</p>
            </div>
          </li>
        </ul>
      </nav>
  );
}


export default Navbar

