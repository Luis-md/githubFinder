import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ showClear, clearUsers, searchUsers, setAlert }) => {

    const [text, setText] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(text === '') {
            setAlert('Please enter a username', 'light')
        } else {
            searchUsers(text)
            setText('')
        }
    }

    const inputHandler = (e) => setText(e.target.value)
    

   
    const showBtn = showClear ? 
    <button className='btn btn-light btn-block' onClick={clearUsers}>Clear</button> : null

    return (
         <div>
            <form onSubmit={submitHandler} className='form'>
                <input 
                type='text' 
                name='text' 
                placeholder='Search user' 
                value={text}
                onChange={inputHandler}/>
                    
                <input 
                type='submit' 
                value='Search' 
                className='btn btn-dark btn-block'/>
            </form>
            {showBtn}
        </div>
    )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default Search
