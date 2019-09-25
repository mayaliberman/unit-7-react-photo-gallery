import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = (props) => (
  <nav className='main-nav'>
    <ul>
      <li><NavLink to="/cats">Cats</NavLink></li>
      <li><NavLink to="/dogs">Dogs</NavLink></li>
      <li><NavLink to="/computers">Computers</NavLink></li>
    </ul>
    </nav>
  
)

export default Nav;




// const Header = () => (
//     <header>
//       <span className="icn-logo"><i className="material-icons">code</i></span>
//       <ul className="main-nav">
//         <li><NavLink exact to="/">Home</NavLink></li>
//         <li><NavLink to="/about">About</NavLink></li>
//         <li><NavLink to="/teachers">Teachers</NavLink></li>
//         <li><NavLink to="/courses">Courses</NavLink></li>
//       </ul>    
//     </header>
//   );