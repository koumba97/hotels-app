import React from 'react';
import '../assets/style/hotel_card.css';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

class HotelCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }


    render(props){
        let hotel = this.props.data;
        let hotelName = hotel.name.substring(0, hotel.name.length - "[SANDBOX]".length);
        if(hotelName.length>20){
            //cut the hotel's name if too long
            hotelName = hotelName.substring(0, 20) + '...';
        }
        return(
            <div className="hotel_card-container">
                <div className="hotel_card-image" style={{backgroundImage:`url(${hotel.images[0].url})`}}>
                    <div className="hotel_card-city">{hotel.address.city}      <FontAwesomeIcon icon={faMapMarkerAlt} /></div>
                </div>
                <div className="hotel_card-details">
                    <p className="hotel_card-name">{hotelName}</p>
                    <StarRatings
                        rating={hotel.starRating}
                        starRatedColor="rgb(65, 109, 255)"
                        starDimension="15px"
                        starSpacing="1px"
                        numberOfStars={5}
                        name='rating'
                    />
                    <p className="hotel_card-address">{hotel.address.line1}, {hotel.address.postalCode} {hotel.address.city}</p>
                </div>
            </div>
        )
    }
}

export default HotelCard;