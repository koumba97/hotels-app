import React from 'react';
import axios from 'axios';

class Hotels extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listHotels: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.hotelsResult();
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

        return(
            <section className="hotels_result-container">

            </section>
        )
    }
}

export default Hotels;