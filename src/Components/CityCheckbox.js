import React from 'react';
//import {paleBlue} from '../Const/Colors';
import '../assets/style/citycheckbox.css'

class CityCheckbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }


    render(props){
        let name = this.props.displayName;
        let city = this.props.city;
  
        return(
            <>
                <input  className="city_checkbox-container" type="checkbox" id={city} name={city}/>
                <label htmlFor={city}>
                    <div className={"checkbox-image icon-"+city} ></div>
                    <p>{name}</p>
                </label>
            </>
        )
    }
}


export default CityCheckbox;