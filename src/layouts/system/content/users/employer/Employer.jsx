import React from 'react'
import { Route } from 'react-router-dom'
import Register from '../../../../../pages/system/content/users/employer/Register'
import UpdateProfile from '../../../../../pages/system/content/users/employer/UpdateProfile'
import EmployerUserProfile from '../../../../../pages/system/content/users/employer/EmployerUserProfile'

export default function Employer() {
    return (
        <div>
             <Route path="/users/employer/register" component={Register}/>
             <Route path="/users/employer/update-profile" component={UpdateProfile}/>
             <Route path="/users/employer/profile" component={EmployerUserProfile}/>
        </div>
    )
}
