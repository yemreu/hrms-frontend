import React from 'react'
import { Route } from 'react-router-dom'
import AddCoverLetter from '../../../../pages/system/content/cover-letters/AddCoverLetter'

export default function CoverLetters() {
    return (
        <div>
            <Route path="/cover-letters/add-cover-letter" component={AddCoverLetter}/>
        </div>
    )
}
