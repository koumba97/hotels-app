import React from 'react';
import axios from 'axios';
import Switch from "react-switch";
import DateInput from '../Components/DateInput';
import CountryRadio from '../Components/CountryRadio';
import HotelCard from '../Components/HotelCard';
import HotelSelected from '../Components/HotelSelected';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
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
            searchPerDate: false,
            hotelData:[],
            displayingHotels:10,
            filterSlideShown:false,
            windowSize: window.innerWidth
        };
    }

    componentDidMount() {
        this.hotelsResult();
        window.addEventListener("resize", this.handleResize);
        document.getElementById("FRA").checked = true;
    }

    handleResize = () => {
        this.setState({windowSize: window.innerWidth});
    }

    switchDateFilter = (checked) => {
        this.setState({ 
            searchPerDate : checked,
        });
        this.hotelsResult(checked);
    }

    updateDepartureDate(date) {
        this.setState({
            departureDate: date
        });
        this.hotelsResult(this.state.searchPerDate, this.state.displayingHotels, this.state.selectedCountry, date, this.state.returnDate,);
    }
    updateReturnDate(date) {
        this.setState({
            returnDate: date
        });
        this.hotelsResult(this.state.searchPerDate, this.state.displayingHotels, this.state.selectedCountry, this.state.departureDate, date);
    }

    handleScroll = (e) => {
        if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) { 
            this.setState({
                displayingHotels: this.state.displayingHotels+10
            });
            this.hotelsResult(this.state.searchPerDate, this.state.displayingHotels+10, this.state.selectedCountry, this.state.departureDate, date);
        }
    }

    updateCountry(country){
        this.setState({
            selectedCountry: country,
        });
        this.hotelsResult(this.state.searchPerDate, this.state.displayingHotels, country, this.state.departureDate, this.state.returnDate);
    }

    hotelsResult = async (checked=null, size=10, country="FRA", departureDate=this.state.departureDate, returnDate=this.state.returnDate) => {
        if(checked){
            await axios.get('/hotels/'+size+'/'+country+'/'+departureDate+'/'+returnDate).then(response => {
                if(response.data && response.data.pagination){
                    this.setState({
                        listHotels: response.data.data,
                        totalResult:response.data.pagination.total,
                    })
                }
            })
        }
        else{
            await axios.get('/hotels/'+size+'/'+country).then(response => {
                if(response.data && response.data.pagination && response.data.pagination.total){
                    this.setState({
                        ...this.state,
                        listHotels: response.data.data,
                        totalResult:response.data.pagination.total,
                    })
                }
            })
        }
    }

    hotelData = async (hotelId) => {
        await axios.get('/hotel/'+hotelId).then(response => {
            this.setState({
                hotelData:response.data,
                selectedHotel: true
            })
        })
    }

    changeSelectedHotel(hotelId){
        this.hotelData(hotelId); 
    }
    closeHotelModal = () =>{
        
        this.setState({
            selectedHotel:!this.state.selectedHotel,
        })
    }

    toogleFilters(){
        this.setState({
            filterSlideShown:!this.state.filterSlideShown,
        })
    }
    render(){
        return(
            <>
            <section className='hotel_result-container' onScroll={this.handleScroll}>
                <div className={!this.state.filterSlideShown && this.state.windowSize<=950 ? 'hotel_filter-container hidden_slide' : 'hotel_filter-container shown_slide'} >
                    <div className="filters">

                        <div className="date_filter-container">
                            <label className="date_filter-label">Recherche par dates </label>
                            <Switch className="date_switch_button" height={20} width={40} onChange={()=> this.switchDateFilter(!this.state.searchPerDate)} checked={this.state.searchPerDate}/>
                        </div>
                        
                        <DateInput name="Date aller" max={this.state.returnDate} value={this.state.departureDate} disabled={!this.state.searchPerDate} idInput="departureDate" updateDate={this.updateDepartureDate.bind(this)}/>
                        <DateInput name="Date retour" min={this.state.departureDate} value={this.state.returnDate} disabled={!this.state.searchPerDate} idInput="returnDate" updateDate={this.updateReturnDate.bind(this)}/>

                        <h5 style={{margin:'0px'}}>Recherche par pays</h5>
                        <CountryRadio country="france" codeISO="FRA" displayName="France" selectedCountry={this.state.selectedCountry} updateCountry={this.updateCountry.bind(this)}/>
                        <CountryRadio country="spain" codeISO="ESP" displayName="Espagne" selectedCountry={this.state.selectedCountry} updateCountry={this.updateCountry.bind(this)}/>
                        <CountryRadio country="italy" codeISO="ITA" displayName="Italie" selectedCountry={this.state.selectedCountry} updateCountry={this.updateCountry.bind(this)}/>
                        <CountryRadio country="greece" codeISO="GRC" displayName="Grece" selectedCountry={this.state.selectedCountry} updateCountry={this.updateCountry.bind(this)}/>
                        
                        <p className="hotels_result-p">{this.state.totalResult} hôtel(s) trouvé(s)</p>
                    </div>
                    <div className="filter-btn" onClick={() => this.toogleFilters()}><FontAwesomeIcon icon={faSlidersH} /></div>
                </div>

                <div className="result-container">
                    <div className="hotels_list-container">
                        {this.state.listHotels.map((hotel) => (
                            <HotelCard  key={hotel.hotelId} data={hotel} onClick={() => this.changeSelectedHotel(hotel.hotelId)}/>
                        ))}
                    </div>
                    
                    <div className="hotel_selected-container">
                        {this.state.selectedHotel ? <HotelSelected key={this.state.hotelData.hotelId} data={this.state.hotelData} closingButton={this.closeHotelModal}/> : null }
                    </div>
                    {this.state.windowSize<=650 && this.state.selectedHotel ? 
                        <>
                            <div className="hotel_bg" onClick={() => this.closeHotelModal()}></div>
                            <HotelSelected key={this.state.hotelData.hotelId} data={this.state.hotelData} closingButton={this.closeHotelModal}/>
                        </>
                    : null}
                </div>
            </section>

            </>
        )
    }
}

export default Hotels;