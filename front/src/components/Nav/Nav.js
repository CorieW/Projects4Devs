import React from 'react'
import './Nav.css'
import $ from 'jquery'

export default function Nav() {

    function search(e)
    {
        e.preventDefault()
        
        const searchInput = $('.search-input')[0]

        window.location.replace('/search?searchQuery=' + searchInput.value)
    }

    return (
        <div id='nav'>
            <h1 className='site-title'><a href='/' aria-label='Main page'>Projects4Devs</a></h1>

            <div className='buttons'>
                <form onSubmit={search} className='search-form'>
                    <input type='text' placeholder='Search' className='search-input'></input>
                    <button aria-label='Search' className='search-btn'><i className="fas fa-search"></i></button>
                </form>
                <a href='/add' aria-label='Add project' className='add-project-link'><i className="fas fa-plus"></i></a>
            </div>
        </div>
    )
}
