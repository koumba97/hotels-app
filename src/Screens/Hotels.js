import React from 'react';
import axios from 'axios';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCalendar, faCalendarAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import {lightGrey} from '../Const/Colors';
import InputDate from '../Components/InputDate';
import CountryRadio from '../Components/CountryRadio';
import HotelCard from '../Components/HotelCard';



// get current date
let newDate = new Date()
let date = newDate.getDate();
if(date.toString().length===1){
    date = "0"+date;
}
let month = newDate.getMonth() + 1;
if(month.toString().length===1){
    month = "0"+month;
}
let year = newDate.getFullYear();
let currentDate = year + '-' + month + '-' + date;


// adding 5 days to current date to get default return date
newDate.setDate(newDate.getDate() + 5)
let returnD = newDate.getDate();
if(returnD.toString().length===1){
    returnD = "0"+returnD;
}
let returnM = newDate.getMonth() + 1;
if(returnM.toString().length===1){
    returnM = "0"+returnM;
}
let returnY = newDate.getFullYear();

let currentDatePlus5Days = returnY + '-' + returnM + '-' + returnD;


class Hotels extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalResult:0,
            listHotels: [],
            loading: true,
            departureDate:currentDate,
            returnDate:currentDatePlus5Days,        
        };
    }

    componentDidMount() {
        this.hotelsResult();
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
            console.log(response.data.data)
            this.setState({
                listHotels: response.data.data,
                totalResult:response.data.pagination.total,
            })
        })
    }

    render(){
        const hotelResultContainer = {
            backgroundColor:lightGrey,
            paddingTop:'calc(50px + 20px)',
            display:'flex',
            height:'calc(100vh - 70px)',
            overflow:'scroll'
        }
        const hotelFilterContainer = {
            width:'200px',
            backgroundColor: 'white',
            padding:'30px',
            display:'flex',
            flexDirection:'column',
            gap:'20px',
        }

        const hotelListContainer = {
            width:'calc(50% - 200px)',
            padding:'20px',
            gap:'30px',
            overflow:'scroll',
        }
        return(
            <section className='hotels_result-container' style={hotelResultContainer}>
                <div className='hotel_filter-container' style={hotelFilterContainer}>
                    <InputDate name="Date aller" value={this.state.departureDate} idInput="departureDate" updateDate={this.updateDepartureDate.bind(this)}/>
                    <InputDate name="Date retour" value={this.state.returnDate} idInput="returnDate" updateDate={this.updateReturnDate.bind(this)}/>

                    <h5 style={{margin:'0px'}}>Recherche par pays</h5>
                    <CountryRadio country="france" displayName="France"/>
                    <CountryRadio country="spain" displayName="Espagne"/>
                    <CountryRadio country="italy" displayName="Italie"/>
                    <CountryRadio country="greece" displayName="Grèce"/>
                    
                    <p>{this.state.totalResult} hôtel(s) trouvé(s)</p>
                </div>

                <div className="hotels_list-container" style={hotelListContainer}>

                    {this.state.listHotels.map((hotel) => (
                        <HotelCard  key={hotel.hotelId} data={hotel}/>
                    ))}
                </div>


            </section>
        )
    }
}

export default Hotels;