import React, { Component } from 'react';
import CardList from '../components/cardlist';
import Searchbox from '../components/searchbox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/errorBoundry';


class App extends Component {
    constructor() {
        super()
        /*components that change*/
        this.state = {
            robots: [],
            searchfield: ''
        }
    }
    componentDidMount() {
        /*retrieving user names from jsonplaceholder*/
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }
    /*function called from search box to get value*/
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }
    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        if (!robots.length) {
            return <h1>Loading</h1>
        } else {
            return (
                <div className="tc">
                    <h1 className='f1'>RoboFriends</h1>
                    <Searchbox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;