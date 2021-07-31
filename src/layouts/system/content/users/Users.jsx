import React from 'react';
import JobSeeker from './job-seeker/JobSeeker';
import Employer from './employer/Employer';
import { Route } from 'react-router-dom';
import UpdateEmail from '../../../../pages/system/content/users/UpdateEmail';
import UpdatePassword from '../../../../pages/system/content/users/UpdatePassword';

export default function Users() {
    return (
        <div>
            <Route path="/users/job-seeker" component={JobSeeker}/>
            <Route path="/users/employer" component={Employer}/>
            <Route path="/users/update-email" component={UpdateEmail}/>
            <Route path="/users/update-password" component={UpdatePassword}/>
        </div>
    )
}
