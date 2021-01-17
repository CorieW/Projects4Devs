import React from 'react'
import './AddProject.css'

export default function AddProject() 
{
    return (
        <form className='add-project-form'>
            <input type='text' placeholder='Enter project name...' className='project-name-input'></input>
            <div className='whitespace'></div>
            <input type='text' placeholder='Enter short description...' className='project-sdesc-input'></input>
            <div className='whitespace'></div>
            <textarea placeholder='Enter description...' className='project-desc-input'></textarea>
            <div className='whitespace'></div>
            <input type='text' placeholder='Enter categories...' className='project-categories-input'></input>
            <div className='whitespace'></div>
            <div className='whitespace'></div>
            <button className='submit'>Submit Project</button>
        </form>
    )
}
