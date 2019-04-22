import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';

class Posts extends Component {
    componentDidMount(){
        const index = this.props.match.params.index;
    }

    render(){
        return(
            <div>
                <NavBar/>
                <Footer/>
            </div>
        )
    }
}

export default Posts;
