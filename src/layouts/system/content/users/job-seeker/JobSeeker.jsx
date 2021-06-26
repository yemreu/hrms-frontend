import React from 'react'
import { Route } from 'react-router-dom'
import Register from '../../../../../pages/system/content/users/job-seeker/Register'

export default function JobSeeker() {
    return (
        <div>
            <Route path="/users/job-seekers/register" component={Register}/>
        </div>
    )
}
