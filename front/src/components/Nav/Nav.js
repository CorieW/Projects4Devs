import React from 'react'
import './Nav.css'

export default function Nav() {
    return (
        <div className='nav'>
            <h1 className='site-title'>Projects4Devs</h1>

            <div className='buttons'>
                <form className='search-form'>
                    <input type='text' placeholder='Search' className='search-input'></input>
                    <button className='search-btn'><i class="fas fa-search"></i></button>
                </form>
                <a href='/add' className='add-project-link'><i class="fas fa-plus"></i></a>
            </div>
        </div>
    )
}
