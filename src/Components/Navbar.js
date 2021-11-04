import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as YourSvg } from '../assets/images/leavy_logo.svg';


export default function Navbar() {
    const navStyle = {
        color: 'black',
        backgroundColor: 'white',
        boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.082)',
        fontFamily: 'Nunito',
        padding:'10px 30px',
        display:'flex',
        height:'50px',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex:'10',
        position:'fixed',
        width:'calc(100% - (30px * 2))',
    };
    
    const searchInputContainer = {
        borderRadius:'20px',
        border:'solid 2px rgb(187, 211, 243)',
        display:'flex',
        justifyContent:'space-between',
        padding:'10px',
    }

    const searchInput = {
       backgroundColor:'transparent',
       border:'none',
       outline:'none',
       fontFamily:'Nunito',
    }
    return (
        <nav style={navStyle}>
            <YourSvg height={40}  width={140}/>

            <div style={searchInputContainer}>
                <input type='search' placeholder='Rechercher un hôtel' style={searchInput}/>
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </nav>
    );
    
}
