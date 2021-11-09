import React, {Component} from 'react';
class DateInput extends Component {

    updateDate(event) {
        this.props.updateDate(event.target.value);
    }

    render(props){
        let name = this.props.name;
        let defaultValue = this.props.value;
        let idInput = this.props.idInput;
        let disableDate = this.props.disabled;
        let minDate = this.props.min;
        let maxDate = this.props.max;

        return(
            <div className={disableDate ? 'departure_date-container disable_date' : 'departure_date-container' } >
                <label htmlFor={idInput} className="date-label">{name}</label>
                <div className="date-container">
                    {disableDate ? 
                    <input type="date" max={name==="Date arrivée" ? maxDate : null } min={name==="Date départ" ? minDate : null } disabled className="date-input" value={defaultValue} id={idInput} onChange={this.updateDate.bind(this)}/> :
                    <input type="date"  max={name==="Date arrivée" ? maxDate : null } min={name==="Date départ" ? minDate : null }className="date-input" value={defaultValue} id={idInput} onChange={this.updateDate.bind(this)}/>}
                </div>
            </div>
        )
    }
}

export default DateInput;