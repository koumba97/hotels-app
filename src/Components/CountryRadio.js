import React from 'react';
//import {paleBlue} from '../Const/Colors';
import '../assets/style/country_radio.css'

class CountryRadio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }


    render(props){
        let name = this.props.displayName;
        let country = this.props.country;
  
        return(
            <>
                <input  className="country_radio-container" type="radio" id={country} name="country"/>
                <label htmlFor={country}>
                    <div className={"country_radio-image icon-"+country} ></div>
                    <p>{name}</p>
                </label>
            </>
        )
    }
}


export default CountryRadio;