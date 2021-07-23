import React from 'react';
import JobSeeker from './job-seeker/JobSeeker';
import Employer from './employer/Employer';
import { Route } from 'react-router-dom';

export default function Users() {
    return (
        <div>
            <Route path="/users/job-seeker" component={JobSeeker}/>
            <Route path="/users/employer" component={Employer}/>
        </div>
    )
}
