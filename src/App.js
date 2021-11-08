
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

//styles & fonts
import './assets/style/hotel_selected.css';
import './assets/style/country_radio.css';
import './assets/style/date_input.css';
import './assets/style/hotel_card.css';
import './assets/style/fonts.css';

//components
import Navbar from "./Components/Navbar";


//screens
import Hotels from "./Screens/Hotels";

class App extends Component {

    state = {
        isLoading : true
    }
    componentDidMount() {
        this.setState({isLoading: false})
    }

    render(){
        if(this.state.isLoading===true)
        return (
            <p>loading...</p>
        )

        else
        return (
            <section className="app-screen">
            
                <Router>
                    <Navbar/>
                    <Switch>
                        <Route path="/:id?" exact render={
                            (props) => {
                                return (
                                    <Hotels key={props.match.params.id} {...props} />
                                )
                            }
                        } />

                        <Route path="*" render={
                            () => {
                                return <Redirect to="/" />
                            }
                        } />
                    </Switch>
                </Router>
            </section>
        )
        
        
    }
}

export default App;