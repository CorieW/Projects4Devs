import { useState } from 'react'
import './AddProject.css'
import axios from 'axios'
import $ from 'jquery'

export default function AddProject() 
{
    const [tags, setTags] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    function submit(e)
    {
        e.preventDefault()

        const data = {
            'projectName': $('.project-name-input')[0].value.trim(),
            'shortDesc': $('.project-short-desc-input')[0].value.trim(),
            'desc': $('.project-desc-input')[0].value.trim(),
            'difficulty': $('.project-difficulty-dropdown')[0].value.trim(),
            'tags': tags
        }

        axios({
            method: 'POST',
            url: 'http://localhost:3001/api/add',
            data: data,
        }).then((response) => {
            window.location.replace('/track?id=' + response.data.projectID)
        }, (error) => {
            if (error.response !== undefined)
                setErrorMsg(error.response.data.message)
            else if (error.message === 'Network Error')
                setErrorMsg('Our servers are currently busy or down, please try again later!')
            else
                setErrorMsg('Something went wrong, please try again!')
        });

        return false;
    }

    function addTag(e)
    {
        e.preventDefault()

        const tagInput = $('.project-tag-input')[0]
        const tagValue = tagInput.value.trim()

        // Tag must have a value to be entered as a tag.
        if (tagValue.length === 0) return

        setTags([...tags, tagValue])
        tagInput.value = ''
    }

    function removeTag(e, index)
    {
        e.preventDefault()

        const newTags = tags
        newTags.splice(index, 1)
        setTags([...newTags])
    }

    return (
        <div className='container-1 add-project-container'>
            <p className='info'>See the <a href='/guidelines'>project guidelines page</a> for information on what you can and can't involve in project idea submissions.</p>
            <form onSubmit={ submit } id='add-project-form'>
                <input type='text' placeholder='Enter project name...' className='project-name-input'></input>
                <div className='whitespace'></div>
                <input type='text' placeholder='Enter short description...' className='project-short-desc-input'></input>
                <div className='whitespace'></div>
                <textarea placeholder='Enter description...' className='project-desc-input'></textarea>
                <div className='whitespace'></div>
                <div className='add-tag-container'>
                    <input type='text' placeholder='Enter tag...' className='project-tag-input'/>
                    <button onClick={ addTag } className='add-tag-btn'><i className="fas fa-plus"></i></button>
                    <ul className='project-tags'>
                        { tags.map((tag, index) => {
                            return <button key={ index } onClick={ (e) => removeTag(e, index) } className='tag'>
                                { tag } 
                                <i class="fas fa-times remove-tag-icon"></i>
                            </button>
                        }) }
                    </ul>
                </div>
                <div className='whitespace'></div>
                <select className='project-difficulty-dropdown'>
                    <option value='' selected disabled>Select difficulty...</option>
                    <option value=''>Unsure</option>
                    <option value='Easy'>Easy</option>
                    <option value='Moderate'>Moderate</option>
                    <option value='Hard'>Hard</option>
                    <option value='Extremely Hard'>Extremely Hard</option>
                </select>
                <div className='whitespace'></div>
                <div className='whitespace'></div>
                <button type='submit' className='submit'>Submit Project</button>
                <p className={ errorMsg.length > 0 ? 'error-msg' : 'hidden' }>{ errorMsg }</p>
            </form>
        </div>
    )
}