import React from 'react'
import './ProjectListing.css'

export default function ProjectListing(props)
{
    function getDifficulty()
    {
        const difficulty = props.data.difficulty

        if (!difficulty) return

        return <p className='project-difficulty'>Difficulty: <span className={ 'difficulty-' + difficulty.toLowerCase().replace(' ', '-') }>{ difficulty }</span></p>
    }

    function getShortDesc()
    {
        const shortDesc = props.data.short_description

        if (shortDesc)
            return <p className='project-short-desc'>{ props.data.short_description }</p>
        else
            return <p className='project-short-desc'>{ props.data.description.substr(0, 149) + '...' }</p>
    }

    function getTags()
    {
        const tags = props.data.tags

        if (!tags || tags.length === 0) return

        return (
            <div className='project-tags-container'>
                <ul className='project-tags'>
                    { tags.map((tag, index) => {
                        return <li key={index} className='tag'>{ tag }</li>
                    }) }
                </ul>
            </div>
        )
    }

    return (
        <a href={ `/project?id=${ props.data.id }` } className='project-listing-link'>
            <div className='project-listing-container'>
                <p className='project-name'>{ props.data.project_name }</p>
                { getShortDesc() }
                { getDifficulty() }
                { getTags() }
            </div>
        </a>
    )
}
