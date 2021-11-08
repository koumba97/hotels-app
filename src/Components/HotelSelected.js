import React from 'react';
import '../assets/style/hotel_selected.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StarRatings from 'react-star-ratings';
import { Carousel } from 'react-responsive-carousel';

class HotelSelected extends React.Component {
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
            });
            this.setState({
                resetSlide:false
            });
        }
    }
    render(props){
        let hotel = this.props.data;
        let hotelName = hotel.name.substring(0, hotel.name.length - "[SANDBOX]".length);
        return(
           
                <div className="hotel_selected-box">

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
                        <h2 className="hotel_name">{hotelName}</h2>
                        <p className="hotel_card-address">{hotel.address.line1}, {hotel.address.postalCode} {hotel.address.city}</p>
                        <StarRatings
                            rating={hotel.starRating}
                            starRatedColor="rgb(65, 109, 255)"
                            starDimension="15px"
                            starSpacing="1px"
                            numberOfStars={5}
                            name='rating'
                        />
                        <p className="hotel_description">{hotel.description.short}</p>
                    </div>
                 
                </div>

        )
    }
}

export default HotelSelected;