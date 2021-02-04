import { useState, useEffect } from 'react'
import './SearchProjects.css'
import axios from 'axios'
import ProjectListing from './ProjectListing/ProjectListing'

export default function SearchProjects()
{
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState(undefined)

    useEffect(() =>
    {
        axios.get(`${window.location.origin}/api/projects${window.location.search}`)
            .then((response) => {
                setProjects(response.data.data)
                setIsLoading(false)
            }, (error) => {
                if (error.response.data.message !== undefined)
                    setErrorMsg(error.response.data.message)
                else if (error.message === 'Network Error')
                    setErrorMsg('Our servers are currently busy or down, please try again later!')
                else
                    setErrorMsg('Something went wrong, please try again!')
                setIsLoading(false)
            })
    }, [])

    if (isLoading)
        return (
            <div className='search-projects-container'>
                <p className='page-header'><b>Projects</b></p>
                <div className='important-container'>
                    <p className='important-text'>Loading...</p>
                </div>
            </div>
        )
    else if (errorMsg)
        return (
            <div className='search-projects-container'>
                <p className='page-header'><b>Projects</b></p>
                <div className='important-container'>
                    <p className='important-text'>{ errorMsg }</p>
                </div>
            </div>
        )
    else
        return (
            <div className='search-projects-container'>
                <p className='page-header'><b>Projects</b></p>
                <div className='project-listings-container'>
                    { projects.map((project, index) => {
                        return <ProjectListing key={ index } data={ project } />
                    }) }
                </div>
            </div>
        )
}