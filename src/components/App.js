import React, { Component } from "react";
import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderBall: false,    // to control whether the ball is rendered
            posi: 0,              // to track the ball's position in pixels
            ballPosition: { left: "0px" }  // initial position of the ball
        };

        // Bind methods to the class
        this.renderChoice = this.renderBallOrButton.bind(this);
        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    // Handler for the "Start" button click
    buttonClickHandler() {
        this.setState({ renderBall: true });  // Ball is rendered after click
    }

    // Render either the start button or the ball
    renderBallOrButton() {
        if (this.state.renderBall) {
            return <div className="ball" style={this.state.ballPosition}></div>;
        } else {
            return <button className="start" onClick={this.buttonClickHandler}>Start</button>;
        }
    }

    // Handle the ArrowRight key press to move the ball
    handleKeyDown(event) {
        if (event.key === 'ArrowRight' || event.keyCode === 39) {
            // Move the ball to the right by 5 pixels
            this.setState(prevState => {
                const newPos = prevState.posi + 5;
                return {
                    posi: newPos,
                    ballPosition: { left: `${newPos}px` }
                };
            });
        }
    }

    // Add the event listener for keydown after the component mounts
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);  // Listen for keydown events
    }

    // Clean up the event listener when the component unmounts
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        return (
            <div className="playground">
                {this.renderChoice()}
            </div>
        );
    }
}

export default App;
