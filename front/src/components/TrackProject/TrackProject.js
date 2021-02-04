import { useState, useEffect } from 'react'
import './TrackProject.css'
import axios from 'axios'

export default function TrackProject()
{
    const [progressStatus, setProgressStatus] = useState(undefined)
    const [errorMsg, setErrorMsg] = useState(undefined)

    function getTrackText()
    {
        if (errorMsg !== undefined)
            return (
                <div className='important-container'>
                    <p className='important-text'>{ errorMsg }</p>
                </div>
            )
        else if (progressStatus === 'Pending')
            return (
                <div className='important-container'>
                    <p className='important-text'>Your project idea has been submitted and is pending review.
                    <i className="fas fa-clock icon pending"></i></p>

                    <a href='/' className='huge-info'>Now, why not see some project ideas inspired by other developers?</a>
                </div>
            )
        else if (progressStatus === 'Reviewing')
            return (
                <div className='important-container'>
                    <p className='important-text'>Your project idea is being reviewed and may be altered slightly.
                    <i className="far fa-comments icon reviewing"></i></p>

                    <a href='/' className='huge-info'>Now, why not see some project ideas inspired by other developers?</a>
                </div>
            )
        else if (progressStatus === 'Declined')
            return (
                <div className='important-container'>
                    <p className='important-text'>Unfortunately, your project idea was declined.
                    <i className='fas fa-times icon declined'></i><br/>
                    <a href='/guidelines'>Understand why your idea may have been declined.</a></p>
                </div>
            )
        else if (progressStatus === 'Accepted')
            return (
                <div className='important-container'>
                    <p className='important-text'>Your project idea has been approved and will now be shown to fellow developers.
                    <i className='fas fa-check icon accepted'></i></p>

                    <a href='/' className='huge-info'>Now, why not see some project ideas inspired by other developers?</a>
                </div>
            )
        else 
            return (
                <div className='important-container'>
                    <p className='important-text'>Checking project submission progression...</p>
                </div>
            )
    }

    useEffect(() =>
    {
        // Makes an API call to the backend, asking for the data of the project with the given project ID.
        axios.get(`${process.env.REACT_APP_API_ORIGIN}/api/track${window.location.search}`)
            .then((response) => {
                setProgressStatus(response.data.data.progress)
            }, (error) => {
                if (error.message === 'Network Error')
                    setErrorMsg('Our servers are currently busy or down, please try again later!')
                else if (error.response.data.message !== undefined)
                    setErrorMsg(error.response.data.message)
                else
                    setErrorMsg('Something went wrong, please try again!')
            })
    }, [])

    return (
        <div className='track-project-container'>
            { getTrackText() }
        </div>
    )
}