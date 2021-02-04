import React from 'react'
import './ProjectListing.css'
import coffeeImg from '../../../assets/coffee.png'
import emptyCupImg from '../../../assets/empty_cup.png'

export default function ProjectListing(props)
{
    function getDifficulty()
    {
        const difficulty = props.data.difficulty[0]
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
                { images.map(image => {
                    return <li>{ image }</li>
                }) }
            </ul>
        )
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
        <a href={ `/project?id=${ props.data.id }` } aria-label='Open project' className='project-listing-link'>
            <div className='project-listing-container'>
                <p className='project-name'>{ props.data.project_name }</p>
                { getShortDesc() }
                { getDifficulty() }
                { getTags() }
            </div>
        </a>
    )
}
