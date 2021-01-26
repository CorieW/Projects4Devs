import React from 'react'
import './Footer.css'

export default function Footer()
{
    return (
        <div id='footer'>
            <p className='footer-links-header '>Some useful links:</p>
            <ul className='footer-links'>
                <li><a href='/'>Home</a></li>
                <li>-</li>
                <li><a href='/add'>Add</a></li>
                <li>-</li>
                <li><a href='/guidelines'>Guidelines</a></li>
            </ul>
        </div>
    )
}
