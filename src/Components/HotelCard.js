import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

library.add(faHeart, faHeartRegular)

class HotelCard extends Component {

    render(props){
        let hotel = this.props.data;
        let hotelName = hotel.name.substring(0, hotel.name.length - "[SANDBOX]".length);
        let hotelDescription = hotel.description.short;
        let selected = this.props.selected;

        if(hotelName.length>20){
            //cut the hotel's name if too long
            hotelName = hotelName.substring(0, 20) + '...';
        }
        if(hotelDescription.length>160){
            //cut the hotel's description if too long
            hotelDescription = hotelDescription.substring(0, 160) + '...';
        }

        return(
            // <NavLink to={"/"+hotel.hotelId}>
                <div className="hotel_card-container" id={hotel.hotelId} onClick={this.props.onClick} style={selected ? {'boxShadow':'0px 0px 10px rgb(85 89 149 / 40%)'} : null}>
                    <div className="hotel_card-image" style={{backgroundImage:`url(${hotel.images[0].url})`}}>
                        <div className="hotel_card-city"><FontAwesomeIcon icon={faMapMarkerAlt} /> {hotel.address.city}</div>
                    </div>

                    <div className="hotel_card-details">
                        <div style={{'display':'flex', 'justifyContent':'space-between'}}>
                            <div>
                                <p className="hotel_card-name">{hotelName}</p>
                                <p className="hotel_card-address">{hotel.address.line1}, {hotel.address.postalCode} {hotel.address.city}</p>
                            </div>
                            <FontAwesomeIcon icon={['far', 'heart']} style={{'marginTop':2, 'color':'rgb(230 230 230)', 'fontSize':20}}/>
                        </div>
                        <p className="hotel_card-description">{hotelDescription}</p>
                        <StarRatings
                            rating={hotel.starRating}
                            starRatedColor="rgb(65, 109, 255)"
                            starDimension="15px"
                            starSpacing="1px"
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>
                </div>
            // </NavLink>
        )
    }
}

export default HotelCard;