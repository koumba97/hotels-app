import React from 'react';
import axios from 'axios';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCalendar, faCalendarAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import DateInput from '../Components/DateInput';
import CountryRadio from '../Components/CountryRadio';
import HotelCard from '../Components/HotelCard';
import HotelSelected from '../Components/HotelSelected';
import '../assets/style/hotels_page.css';



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
            selectedCountry:'FRA',
            selectedHotel:false,
            hotelData:[],
        };
    }

    componentDidMount() {
        this.hotelsResult();
        document.getElementById("FRA").checked = true;
    }

    updateDepartureDate(date) {
        this.setState({
            departureDate: date
        });
        axios.get('/hotels/'+this.state.selectedCountry+'/'+this.state.departureDate+'/'+this.state.returnDate+'/').then(response => {
            console.log(response.data.data)
            this.setState({
                listHotels: response.data.data,
                totalResult:response.data.pagination.total,
            })
        })
    }
    updateReturnDate(date) {
        this.setState({
            returnDate: date
        });
        axios.get('/hotels/'+this.state.selectedCountry+'/'+this.state.departureDate+'/'+this.state.returnDate+'/').then(response => {
            console.log(response.data.data)
            this.setState({
                listHotels: response.data.data,
                totalResult:response.data.pagination.total,
            })
        })
    }

    updateCountry(country){
        this.setState({
            selectedCountry: country,
        });

        axios.get('/hotels/'+country).then(response => {
            console.log(response.data.data)
            this.setState({
                listHotels: response.data.data,
                totalResult:response.data.pagination.total,
            })
        })
    }

    hotelsResult = async () => {
        await axios.get('/hotels/'+this.state.selectedCountry+'/'+this.state.departureDate+'/'+this.state.returnDate+'/').then(response => {
            console.log(response.data.data)
            this.setState({
                listHotels: response.data.data,
                totalResult:response.data.pagination.total,
            })
        })
    }

    hotelData = async (hotelId) => {
        await axios.get('/hotel/'+hotelId).then(response => {
            console.log(response)
            this.setState({
                hotelData:response.data,
                selectedHotel: true
            })
        })
    }

    changeSelectedHotel(hotelId){
        this.hotelData(hotelId); 
    }

    render(){
       
        return(
            <section className='hotel_result-container'>
                <div className='hotel_filter-container'>
                    <DateInput name="Date aller" value={this.state.departureDate} idInput="departureDate" updateDate={this.updateDepartureDate.bind(this)}/>
                    <DateInput name="Date retour" value={this.state.returnDate} idInput="returnDate" updateDate={this.updateReturnDate.bind(this)}/>

                    <h5 style={{margin:'0px'}}>Recherche par pays</h5>
                    <CountryRadio country="france" codeISO="FRA" displayName="France" selectedCountry={this.state.selectedCountry} updateCountry={this.updateCountry.bind(this)}/>
                    <CountryRadio country="spain" codeISO="ESP" displayName="Espagne" selectedCountry={this.state.selectedCountry} updateCountry={this.updateCountry.bind(this)}/>
                    <CountryRadio country="italy" codeISO="ITA" displayName="Italie" selectedCountry={this.state.selectedCountry} updateCountry={this.updateCountry.bind(this)}/>
                    <CountryRadio country="greece" codeISO="GRC" displayName="Grece" selectedCountry={this.state.selectedCountry} updateCountry={this.updateCountry.bind(this)}/>
                    
                    <p>{this.state.totalResult} hôtel(s) trouvé(s)</p>
                </div>

                <div className="result-container">
                    <div className="hotels_list-container">
                        {this.state.listHotels.map((hotel) => (
                            <HotelCard  key={hotel.hotelId} data={hotel} onClick={() => this.changeSelectedHotel(hotel.hotelId)}/>
                        ))}
                    </div>
                    
                    {this.state.selectedHotel ? <HotelSelected key={this.state.hotelData.hotelId} data={this.state.hotelData}/> : null }
                </div>
            </section>
        )
    }
}

export default Hotels;