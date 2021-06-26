import React from "react";
import Jobs from "./jobs/Jobs";
import Users from "./users/Users";
import Cv from "./cv/Cv";
import CoverLetters from "./cover-letters/CoverLetters";
import { Container } from "semantic-ui-react";
import { Route } from "react-router-dom";

export default function Content() {
  return (
    <div>
      <Container className="main">
        <Route path="/users" component={Users} />
        <Route path="/" component={Jobs} />
        <Route path="/cv" component={Cv} />
        <Route path="/cover-letters" component={CoverLetters} />
      </Container>
    </div>
  );
}
