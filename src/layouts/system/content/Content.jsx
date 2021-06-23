import React from 'react';
import Jobs from './jobs/Jobs';
import Users from './users/Users';
import Cvs from './cvs/Cvs';
import CoverLetters from './cover-letters/CoverLetters';
import { Container } from "semantic-ui-react";

export default function Content() {
    return (
        <div>
            <Container className="main">
            {/* <Users/> */}
            {/* <Jobs/> */}
            {/* <Cvs/> */}
            <CoverLetters/>
            </Container>
        </div>
    )
}
