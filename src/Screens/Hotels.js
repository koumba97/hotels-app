import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import InputDate from '../Components/InputDate';


// get current date
let newDate = new Date()
let date = newDate.getDate();
console.log(date.length)
if(date.toString().length==1){
    date = "0"+date;
}
let month = newDate.getMonth() + 1;
if(month.toString().length==1){
    month = "0"+month;
}
let year = newDate.getFullYear();
let currentDate = year + '-' + month + '-' + date;


// adding 5 days to current date to get default return date
newDate.setDate(newDate.getDate() + 5)
let returnD = newDate.getDate();
if(returnD.toString().length==1){
    returnD = "0"+returnD;
}
let returnM = newDate.getMonth() + 1;
if(returnM.toString().length==1){
    returnM = "0"+returnM;
}
let returnY = newDate.getFullYear();

let currentDatePlus5Days = returnY + '-' + returnM + '-' + returnD;


class Hotels extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listHotels: [],
            loading: true,
            departureDate:currentDate,
            returnDate:currentDatePlus5Days,        
        };
    }

    componentDidMount() {
        //this.hotelsResult();
    }
    updateDepartureDate(date) {
        this.setState({
            departureDate: date
        });
    }
    updateReturnDate(date) {
        this.setState({
            returnDate: date
        });
    }
    hotelsResult = async () => {
        await axios.get('/hotels/FRA').then(response => {
            console.log(response)
            this.setState({
                listHotels: response,
            })
        })
    }

    render(){
        const hotelResultContainer = {
            backgroundColor:"rgb(231, 231, 231)",
            paddingTop:'calc(50px + 20px)',
        }
        const hotelFilterContainer = {
            width:'200px',
            backgroundColor: 'white',
            height:'100vh',
            padding:'30px',
            display:'flex',
            flexDirection:'column',
            gap:'20px',
        }

       
        return(
            <section className='hotels_result-container' style={hotelResultContainer}>
                <div className='hotel_filter-container' style={hotelFilterContainer}>
                    <InputDate name="Date aller" value={this.state.departureDate} idInput="departureDate" updateDate={this.updateDepartureDate.bind(this)}/>
                    <InputDate name="Date retour" value={this.state.returnDate} idInput="returnDate" updateDate={this.updateReturnDate.bind(this)}/>
                    <p>{this.state.departureDate}</p>
                </div>

            </section>
        )
    }
}

export default Hotels;