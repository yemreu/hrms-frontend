import React from 'react'
import { Route } from 'react-router-dom';
import EditCv from '../../../../pages/system/content/cv/EditCv';
import JobSeekerCv from '../../../../pages/system/content/cv/JobSeekerCv';

export default function Cv() {
    return (
        <div>
            <Route path="/cv/edit-cv" component={EditCv}/>
            <Route path="/cv/job-seeker-cv" component={JobSeekerCv}/>
        </div>
    )
}
