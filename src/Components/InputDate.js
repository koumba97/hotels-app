import React from 'react';

class InputDate extends React.Component {
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

        const dateContainer = {
            border:'solid 3px rgb(187, 211, 243)',
            borderRadius:'10px',
            height:'45px',
            justifyContent:'space-between',
            display:'flex',
            flexDirection:'column',
        }
        const inputDate={
            outline:'none',
            border:'none',
            fontFamily:'Nunito',
            backgroundColor:'transparent',
            margin:'auto',
            fontSize:'17px',
        }
        const dateLabel = {
            position:'relative', 
            backgroundColor:'white', 
            left:'10px', 
            top:'10px', 
            padding:'5px',
            color:'rgb(187, 211, 243)',
        }
        return(
            <div className='departure_date-container' >
                <label htmlFor={idInput} style={dateLabel}>{name}</label>
                <div style={dateContainer}>
                    <input type="date" style={inputDate} value={defaultValue} id={idInput} onChange={this.updateDate.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default InputDate;