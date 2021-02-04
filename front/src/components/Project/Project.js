import { useState, useEffect } from 'react'
import './Project.css'
import coffeeImg from '../../assets/coffee.png'
import emptyCupImg from '../../assets/empty_cup.png'
import axios from 'axios'

export default function Project(props)
{
    const [project, setProject] = useState(undefined)
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
        const difficulty = project.difficulty[0]
        const images = []

        for (let i = 0; i < 5; i++)
        {
            if (i < difficulty)
                images.push(<img src={ coffeeImg } alt='Coffee difficulty icon' className='difficulty-icon'/>)
            else
                images.push(<img src={ emptyCupImg } alt='Empty cup difficulty icon' className='difficulty-icon'/>)
        }

        return (
            <ul className='project-difficulty'>
                <li>Difficulty:</li>
                { images.map(image => {
                    return <li>{ image }</li>
                }) }
            </ul>
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
                            <a href={ `/results?searchQuery=${tag}` }>
                                { tag }
                            </a>{ index === tags.length - 1 ? '' : ',' } 
                        </li> )
                }) }
            </ul>
        )
    }
    
    useEffect(() => {
        // If the component already has data, then there's no point in loading the project ID from the database.
        if (props.data && project !== props.data) return setProject(props.data)

        axios.get(`${process.env.REACT_APP_API_ORIGIN}/api/project${window.location.search}`)
            .then((response) => {
                setProject(response.data.data)
                setIsLoading(false)
            }, (error) => {
                if (error.message === 'Network Error')
                    setErrorMsg('Our servers are currently busy or down, please try again later!')
                else if (error.response.data.message !== undefined)
                    setErrorMsg(error.response.data.message)
                else
                    setErrorMsg('Something went wrong, please try again!')
                setIsLoading(false)
            })
    }, [props.data, project])

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
            <div className='project-container'>
                <p className='project-name'>{ project.project_name }</p>
                { getShortDescription() }
                <p className='project-desc'>{ project.description }</p>
                { getDifficulty() }
                { getTags() }
            </div>
        )
    }
}
