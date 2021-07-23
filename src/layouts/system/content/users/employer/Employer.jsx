import React from 'react'
import { Route } from 'react-router-dom'
import Register from '../../../../../pages/system/content/users/employer/Register'

export default function Employer() {
    return (
        <div>
             <Route path="/users/employer/register" component={Register}/>
        </div>
    )
}
