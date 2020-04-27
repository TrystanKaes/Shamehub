import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';
import { getInsult } from '../../actions/globalActions'

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DisplayText: "Get Ready for some shame!",
            background: (this.props.theme === 'dark') ? '#000' : '#fff',
            guessingColor: rgbToHex(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)),
            lastGuess: 0,
            thisGuess: 0,
            win: false,
        };
    }

    handleChangeComplete = (color) => {
        //everytime a color is changed, we will change the background and password
        this.setState({ background: color.hex }); //This choice
        this.setState({ lastGuess: this.state.thisGuess }) //save the last guess distance
        if(this.state.guessingColor === color.hex){
            this.setState({ win: true })
        }
        const color1 = hexToRgb(color.hex) //calculate the magnitude of color1
        const magnitude1 = Math.sqrt(color1.r^2,color1.g^2,color1.b^2)
        const color2 = hexToRgb(this.state.guessingColor)//calculate the magnitude of color2
        const magnitude2 = Math.sqrt(color2.r^2,color2.g^2,color2.b^2)

        const distance = Math.abs(magnitude1-magnitude2)
        this.setState({ thisGuess: distance })
        const { dispatch } = this.props;
        dispatch(getInsult())
    };


    componentDidMount() {
        console.log(this.state.guessingColor)
        setTimeout(()=>this.setState(
            {DisplayText: "Try to match this color . . ."}
        ), 2000)
    }


    render(){

        return (
            <div>
                {(this.state.win) ?
                    <div style={{height:window.innerHeight, backgroundColor:this.state.guessingColor}}
                         className={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}>
                        <h1>OMG YOU ACTUALLY WON<br/> WHAT THE ACTUAL HOW DID YOU EVEN <br/>DO THAT CONGRATULATIONS!!!!</h1>
                    </div>
                    :
                    <div style={{height:window.innerHeight, backgroundColor:this.state.guessingColor}}>
                        <div>
                            <h1 class={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}>{this.state.DisplayText}</h1>
                            <div style={{display: 'flex', justifyContent: 'center', padding: 4, color:this.state.background}}>
                                    <ChromePicker color={this.state.background}
                                                  disableAlpha={true}
                                                  onChangeComplete={this.handleChangeComplete}/>
                            </div>
                                <h3 class={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}>
                                    {this.props.insult}
                                    <br/>You're getting {(this.state.lastGuess > this.state.thisGuess) ? " warmer. . ." : " colder. . ."}
                                </h3>
                        </div>
                    </div>
                }
                <div style={{height:window.innerHeight, backgroundColor:this.state.guessingColor}}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        theme: state.glob.theme,
        insult: state.glob.insult,
    }
}

export default connect(mapStateToProps)(Login);
