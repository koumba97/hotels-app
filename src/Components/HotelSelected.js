import React, { useState, useEffect } from 'react';
import '../assets/style/hotel_selected.css';


class HotelSelected extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }


    render(props){
        let hotel = this.props.data;
   
        return(
            <div className="hotel_selected-container">
                <div className="hotel_selected-box">
                <div className="hotel-carousel" style={{backgroundImage:`url(${hotel.images[0].url})`}}></div>
                    {hotel.name}
                </div>
            </div>
        )
    }
}

export default HotelSelected;