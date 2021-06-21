import React from 'react';
import AddJob from '../../../../pages/system/content/jobs/AddJob';
import JobList from '../../../../pages/system/content/jobs/JobList';
import Filters from './Filters';

export default function Jobs() {
    return (
        <div>
            <Filters/>
            <AddJob/>
            <JobList/>
        </div>
    )
}
