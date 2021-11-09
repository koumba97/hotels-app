import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as LogoSvg } from '../assets/images/leavy_logo.svg';

export default function Navbar() {

    return (
        <nav className='app_navbar'>
            <LogoSvg height={40}  width={140}/>
            <div className="search_input-container">
                <input type='search' placeholder='Rechercher un hôtel' className='search-input'/>
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </nav>
    );
}
