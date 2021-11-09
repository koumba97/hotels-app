import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StarRatings from 'react-star-ratings';
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faTimes, faHeart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

library.add(faHeart, faHeartRegular)
class HotelSelected extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resetSlide:false,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.data.hotelId !== prevProps.data.hotelId) {
            //re render carousel if hotelId changes
            this.setState({
                resetSlide:true
            },  () => this.setState({
                    resetSlide:false
                })
            );
        }
    }
    render(props){
        let hotel = this.props.data;
        let hotelName = hotel.name.substring(0, hotel.name.length - "[SANDBOX]".length);
        return(
                <div className="hotel_selected-box">
                <div className="top_box">
                    <div className="hotel_card-city"><FontAwesomeIcon icon={faMapMarkerAlt} /> {hotel.address.city}</div>
                    <FontAwesomeIcon className="close_btn" icon={faTimes} onClick={this.props.closingButton} />
                </div>

                    {!this.state.resetSlide ?
                        <Carousel 
                            showThumbs={false} 
                            showStatus={false} 
                            showIndicators={false} 
                            autoPlay={false}
                            infiniteLoop={true}
                            height="200"
                        >
                            {hotel.images.map((image, index) => (
                                <div className="carousel_element-container" key={index}>
                                    <img src={hotel.images[index].url} alt={hotel.images[index].altText} className="carousel_element-image"/>
                                </div>
                            ))}
                        </Carousel>
                    : null }

                    <div className="hotel_details-container">
                        <div style={{'display':'flex', 'justifyContent':'space-between'}}>
                            <div>
                                <h2 className="hotel_name">{hotelName}</h2>
                                <p className="hotel_card-address">{hotel.address.line1}, {hotel.address.postalCode} {hotel.address.city}</p>
                                <StarRatings
                                    rating={hotel.starRating}
                                    starRatedColor="rgb(65, 109, 255)"
                                    starDimension="18px"
                                    starSpacing="1px"
                                    numberOfStars={5}
                                    name='rating'
                                />
                            </div>
                            <FontAwesomeIcon icon={['far', 'heart']} style={{'marginTop':2, 'color':'rgb(230 230 230)', 'fontSize':30}}/>
                        </div>
                        <p className="hotel_description">{hotel.description.short}</p>
                    </div>
                 
                </div>

        )
    }
}

export default HotelSelected;