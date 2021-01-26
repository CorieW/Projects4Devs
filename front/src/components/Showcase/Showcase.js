import { useState, useEffect } from 'react'
import './Showcase.css'
import axios from 'axios'
import Project from '../Project/Project'
import { get } from 'jquery'

export default function Showcase()
{
    const [projects, setProjects] = useState([])
    const [projectIndice, setProjectIndice] = useState(0)
    const [errorMsg, setErrorMsg] = useState(undefined)

    // Makes an API call to the backend, asking for some random projects to display to the user.
    function RequestProjects()
    {
        axios.get(`http://localhost:3001/api/random-projects?numOfProjects=10`)
            .then((response) => {
                setProjects([...projects, ...response['data']['data']])
            }, (error) => {
                if (error.response !== undefined)
                    setErrorMsg(error.response['data']['message'])
                else if (error.message === 'Network Error')
                    setErrorMsg('Our servers are currently busy or down, please try again later!')
                else
                    setErrorMsg('Something went wrong, please try again!')
            })
    }

    useEffect(() =>
    {
        // Don't load more projects until the 2nd last project is being shown.
        if(projectIndice < projects.length - 2) return

        RequestProjects()
    }, [projectIndice, projects])

    function getPreviousBtn()
    {
        if (projectIndice > 0 && projectIndice < projects.length - 1)
            return (
                <button onClick={() => setProjectIndice(projectIndice - 1)} className='previous-project-btn'><i class="fas fa-arrow-left icon"></i></button>
            )
        else if (projectIndice === projects.length - 1)
            return (
                <button onClick={() => setProjectIndice(projectIndice - 1)} className='previous-project-btn'><i class="fas fa-arrow-left icon"></i></button>
            ) 
    }

    function getNextBtn()
    {
        if (projectIndice === 0)
            return (
                <button onClick={() => setProjectIndice(projectIndice + 1)} className='next-project-btn'><i class="fas fa-arrow-right icon"></i></button>
            )
        else if (projectIndice > 0 && projectIndice < projects.length - 1)
            return (
                <button onClick={() => setProjectIndice(projectIndice + 1)} className='next-project-btn'><i class="fas fa-arrow-right icon"></i></button>
            )
    }

    if (projects.length > 0)
    {
        return (
            <div className='showcase'>
                { getPreviousBtn() }
                <Project projectData={ projects[projectIndice] }/>
                { getNextBtn() }
            </div>
        )
    }
    else if (errorMsg !== undefined)
    {
        return (
            <div className='important-container'>
                <p className='important-text'>{ errorMsg }</p>
            </div>
        )
    }
    else {
        return (
            <div className='important-container'>
                <p className='important-text'>Loading projects...</p>
            </div>
        )
    }
}
