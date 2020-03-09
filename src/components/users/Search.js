import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }

    submitHandler = (e) => {
        e.preventDefault()
        if(this.state.text === '') {
            this.props.setAlert('Please enter a username', 'light')
        } else {
            this.props.searchUsers(this.state.text)
            this.setState({ text: '' })
        }
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
        const showBtn = this.props.showClear ? 
        <button className='btn btn-light btn-block' onClick={this.props.clearUsers}>Clear</button> : null

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
                {showBtn}
            </div>
        )
    }
}

export default Search
