import React from 'react';
import '../assets/style/date_input.css';

class DateInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    updateDate(event) {
        this.props.updateDate(event.target.value);
    }

    render(props){
        let name = this.props.name;
        let defaultValue = this.props.value;
        let idInput = this.props.idInput;
        let disableDate = this.props.disabled

        return(
            <div className={disableDate ? 'departure_date-container disable_date' : 'departure_date-container' } >
                <label htmlFor={idInput} className="date-label">{name}</label>
                <div className="date-container">

                    {disableDate ? 
                        <input type="date" disabled className="date-input" value={defaultValue} id={idInput} onChange={this.updateDate.bind(this)}/> :
                        <input type="date" className="date-input" value={defaultValue} id={idInput} onChange={this.updateDate.bind(this)}/>}
                
                </div>
            </div>
        )
    }
}

export default DateInput;