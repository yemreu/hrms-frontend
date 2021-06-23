import React from "react";
import AddJob from "../../../../pages/system/content/jobs/AddJob";
import JobList from "../../../../pages/system/content/jobs/JobList";
import Filters from "./Filters";
import { Grid, Container } from "semantic-ui-react";

export default function Jobs() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Filters />
          </Grid.Column>
          <Grid.Column width={12}>
            <JobList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <AddJob />
    </div>
  );
}
