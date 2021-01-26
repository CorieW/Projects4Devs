import React from 'react'
import './Project.css'

export default function Project(props)
{
    function getShortDescription()
    {
        const shortDesc = props['projectData']['short_description']

        if (shortDesc === "") return null;

        return (
            <p className='project-short-desc'>{ shortDesc }</p>
        )
    }

    function getDifficulty()
    {
        const difficulty = props['projectData']['difficulty']

        if (difficulty === "") return null;
        return (
            <p className='project-difficulty'>
                Difficulty: <span className={ difficulty.toLowerCase().replace(' ', '-') }>{ difficulty }</span>
            </p>
        )
    }

    function getTags()
    {
        const tags = props['projectData']['tags']

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

    return (
        <div className='project-container container-1'>
            <p className='project-name'>{ props['projectData']['project_name'] }</p>
            { getShortDescription() }
            <p className='project-desc'>{ props['projectData']['description'] }</p>
            { getDifficulty() }
            { getTags() }
        </div>
    )
}
