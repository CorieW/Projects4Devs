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
            url: `${window.location.origin}/api/add`,
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
        <div id='add-project-container'>
            <h1 className='page-header'>Add Project</h1>
            <p className='page-info'>See the <a href='/guidelines'>project guidelines page</a> for information on what you can and can't involve in project idea submissions.</p>
            <form onSubmit={ submit } className='add-project-form'>
                <input type='text' placeholder='Enter project name...' className='project-name-input'></input>
                <input type='text' placeholder='Enter short description...' className='project-short-desc-input'></input>
                <textarea placeholder='Enter description...' className='project-desc-input'></textarea>
                <div className='add-tag-container'>
                    <input type='text' placeholder='Enter tag...' className='project-tag-input'/>
                    <button onClick={ addTag } aria-label='Add tag' className='add-tag-btn'><i className="fas fa-plus icon"></i></button>
                    <ul className='project-tags'>
                        { tags.map((tag, index) => {
                            return <button key={ index } onClick={ (e) => removeTag(e, index) } className='tag'>
                                { tag } 
                                <i class="fas fa-times remove-tag-icon"></i>
                            </button>
                        }) }
                    </ul>
                </div>
                <select className='project-difficulty-dropdown'>
                    <option value='' selected disabled>Select difficulty...</option>
                    <option value=''>Unsure</option>
                    <option value='1/5'>1/5 (Easy)</option>
                    <option value='2/5'>2/5</option>
                    <option value='3/5'>3/5</option>
                    <option value='4/5'>4/5</option>
                    <option value='5/5'>5/5 (Very Difficult)</option>
                </select>
                <button type='submit' aria-label='Submit project' className='submit'>Submit Project</button>
                <p className={ errorMsg.length > 0 ? 'error-msg' : 'hidden' }>{ errorMsg }</p>
            </form>
        </div>
    )
}