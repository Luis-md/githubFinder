import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = ( ) => {

    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)

    const [text, setText] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(text === '') {
            alertContext.setAlert('Please enter a username', 'light')
        } else {
            githubContext.searchUsersHandler(text)
            setText('')
        }
    }

    const inputHandler = (e) => setText(e.target.value)

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
            {githubContext.users.lenght > 0 && (
                <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>
                    Clear
                </button>
            )}
        </div>
    )
}


export default Search
