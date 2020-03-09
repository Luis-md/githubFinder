import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.array.isRequired,
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.searchUsers(this.state.text)
        this.setState({ text: '' })
    }

    inputHandler = (e) => {
        this.setState({
            //with e.target.name it is possible to 
            //make a bigger form and use the same function
            //to track changes in different fields
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler} className='form'>
                    <input 
                    type='text' 
                    name='text' 
                    placeholder='Search user' 
                    value={this.state.text}
                    onChange={this.inputHandler}/>
                    
                    <input 
                    type='submit' 
                    value='Search' 
                    className='btn btn-dark btn-block'/>
                </form>
            </div>
        )
    }
}

export default Search
