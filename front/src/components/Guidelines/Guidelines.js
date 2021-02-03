import React from 'react'

export default function Guidelines()
{
    return (
        <div className='guidelines-container'>
            <h1 className='page-header'>GUIDELINES</h1>
            <p className='page-info'>By following the below guidelines your project ideas should have no problem getting approved!</p>
            <hr/>
            <p className='section-header'>Rules</p>
            <ol>
                <li className='big-info'>No duplicate ideas. I try my best to keep the ideas unique, so scrolling to find new ideas
                is as easy as possible.</li>
                <li className='big-info'>Make sure your idea is possible, impossible ideas aren't of much use to anyone.</li>
                <li className='big-info'>Keep the project ideas written in English. At least until I add a language feature.</li>
                <li className='big-info'>No illegal/unethical ideas.</li>
                <li className='big-info'>Any ideas that contain language that may offend will not be approved.</li>
            </ol>
            <hr/>
            <p className='section-header'>Preferences</p>
            <ol>
                <li className='big-info'>Try to make your idea as easy as possible to understand.</li>
                <li className='big-info'>Try to avoid complex language and slang.</li>
                <li className='big-info'>Explain your idea with sample use cases.</li>
                <li className='big-info'>Give an idea of how a developer might be able to implement your idea.</li>
            </ol>
        </div>
    )
}
