import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as LogoSvg } from '../assets/images/leavy_logo.svg';
import '../assets/style/navbar.css';

export default function Navbar() {
        
    const searchInput = {
        backgroundColor:'transparent',
        border:'none',
        outline:'none',
        fontFamily:'Nunito',
    }

    return (
        <nav className='app_navbar'>
            <LogoSvg height={40}  width={140}/>
            <div className="search_input-container">
                <input type='search' placeholder='Rechercher un hôtel' style={searchInput}/>
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </nav>
    );
}
