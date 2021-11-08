import React from 'react';
class CountryRadio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    updateCountry(event) {
        this.props.updateCountry(event.target.id);
    }

    render(props){
        let name = this.props.displayName;
        let country = this.props.country;
        let codeISO = this.props.codeISO;

  
        return(
            <>  
                <input  className="country_radio-container" type="radio" id={codeISO} name="country" onChange={this.updateCountry.bind(this)}/>    
                <label htmlFor={codeISO}>
                    <div className={"country_radio-image icon-"+country} ></div>
                    <p>{name}</p>
                </label>
            </>
        )
    }
}


export default CountryRadio;