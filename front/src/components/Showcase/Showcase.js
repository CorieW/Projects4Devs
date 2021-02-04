import { useState, useEffect, useCallback } from 'react'
import './Showcase.css'
import axios from 'axios'
import Project from '../Project/Project'

export default function Showcase()
{
    const [projects, setProjects] = useState([])
    const [projectIndice, setProjectIndice] = useState(0)
    const [errorMsg, setErrorMsg] = useState(undefined)

    // Makes an API call to the backend, asking for some random projects to display to the user.
    const requestProjects = useCallback(() => {
        axios.get(`${window.location.origin}/api/random-projects?numOfProjects=10`)
            .then((response) => {
                setProjects([...projects, ...response.data.data])
            }, (error) => {
                if (error.response.data.message !== undefined) {
                    setErrorMsg(error.response.data.message)
                }
                else if (error.message === 'Network Error')
                    setErrorMsg('Our servers are currently busy or down, please try again later!')
                else
                    setErrorMsg('Something went wrong, please try again!')
            })
    }, [projects])

    function getLeftArrow()
    {
        return <button onClick={() => setProjectIndice(projectIndice - 1)} aria-label='Previous project' className='previous-project-btn'><i class="icon-l-arrow-3 icon"></i></button>
    }

    function getRightArrow()
    {
        return <button onClick={() => setProjectIndice(projectIndice + 1)} aria-label='Next project' className='next-project-btn'><i className='icon-r-arrow-3 icon'></i></button>
    }

    useEffect(() =>
    {
        if(projects[projectIndice])
            window.history.pushState('page2', document.title, '/project?id=' + projects[projectIndice].id);

        // Don't load more projects until the 2nd last project is being shown.
        if(projectIndice < projects.length - 2) return

        requestProjects()
    }, [projectIndice, projects, requestProjects])

    function getPreviousBtn()
    {
        if (projectIndice > 0 && projectIndice < projects.length - 1)
            return (
                getLeftArrow()
            )
        else if (projectIndice === projects.length - 1)
            return (
                getLeftArrow()
            ) 
    }

    function getNextBtn()
    {
        if (projectIndice === 0)
            return (
                getRightArrow()
            )
        else if (projectIndice > 0 && projectIndice < projects.length - 1)
            return (
                getRightArrow()
            )
    }

    if (projects.length > 0)
    {
        return (
            <div className='showcase'>
                { getPreviousBtn() }
                <Project data={ projects[projectIndice] }/>
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
