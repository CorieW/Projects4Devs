import { useEffect } from 'react'
import './Nav.css'
import logo from '../../assets/logo.svg'
import $ from 'jquery'

export default function Nav() {

    function search(e)
    {
        e.preventDefault()
        
        const searchInput = $('.search-input')[0]

        if (searchInput.value.length > 0)
            window.location.replace('/results?searchQuery=' + searchInput.value)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const searchInput = $('.search-input')[0]
        searchInput.value = urlParams.get('searchQuery')
    }, [])

    return (
        <div id='nav-container'>
            <div id='site-header'>
                <a href='/' aria-label='Home page'>
                    <img src={ logo } id='site-logo'/>
                    <p id='site-title'>Projects4Devs</p>
                </a>
            </div>

            <div className='search-container'>
                <form onSubmit={search} className='search-form'>
                    <input type='text' placeholder='Search...' className='search-input'></input>
                    <button aria-label='Search' className='search-btn'><i className="fas fa-search"></i></button>
                </form>
            </div>

            <a href='/add' aria-label='Add project' className='add-project-link'>+ Add IDEA</a>
            
            <div className='mobile-btns-container'>
                <button aria-label='Open search bar' className='mobile-search-btn'><i className="fas fa-search"></i></button>
                <a href='/add' aria-label='Add project' className='add-project-mobile-link'>+</a>
            </div>
        </div>
    )
}
