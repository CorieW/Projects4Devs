import { useState, useEffect } from 'react'
import './Project.css'
import axios from 'axios'

export default function Project(props)
{
    const [project, setProject] = useState(props.data)
    const [isLoading, setIsLoading] = useState(project ? false : true)
    const [errorMsg, setErrorMsg] = useState(undefined)

    function getShortDescription()
    {
        const shortDesc = project.short_description

        if (shortDesc === "") return null;

        return (
            <p className='project-short-desc'>{ shortDesc }</p>
        )
    }

    function getDifficulty()
    {
        const difficulty = project.difficulty

        if (difficulty === "") return null;

        return (
            <p className='project-difficulty'>
                Difficulty: <span className={ 'difficulty-' + difficulty.toLowerCase().replace(' ', '-') }>{ difficulty }</span>
            </p>
        )
    }

    function getTags()
    {
        const tags = project.tags

        if(!tags || tags.length === 0) return null;

        return (
            <ul className='project-tags'>
                <li>Tags:</li>
                { tags.map((tag, index) => {
                    return ( 
                        <li key={ index }>
                            <a href={ `/search?searchQuery=${tag}` }>
                                { tag }
                            </a>{ index === tags.length - 1 ? '' : ',' } 
                        </li> )
                }) }
            </ul>
        )
    }

    useEffect(() => {
        if (project !== props.data) setProject(props.data)
        // If the component already has data, then there's no point in loading the project ID from database.
        if (props.data || project) return

        axios.get(`http://localhost:3001/api/project${window.location.search}`)
            .then((response) => {
                setProject(response.data.data)
                setIsLoading(false)
            }, (error) => {
                if (error.response !== undefined)
                    setErrorMsg(error.response.data.message)
                else if (error.message === 'Network Error')
                    setErrorMsg('Our servers are currently busy or down, please try again later!')
                else
                    setErrorMsg('Something went wrong, please try again!')
                setIsLoading(false)
            })
    }, [props.data])

    if (isLoading)
    {
        return (
            <div className='important-container'>
                <p className='important-text'>Loading...</p>
            </div>
        )
    }
    else if (errorMsg)
    {
        return (
            <div className='important-container'>
                <p className='important-text'>{ errorMsg }</p>
            </div>
        )
    }
    else
    {
        return (
            <div className='project-container container-1'>
                <p className='project-name'>{ project.project_name }</p>
                { getShortDescription() }
                <p className='project-desc'>{ project.description }</p>
                { getDifficulty() }
                { getTags() }
            </div>
        )
    }
}
