import React from "react";
import { Grid } from "semantic-ui-react";
import JobList from "../../../../../pages/system/content/jobs/JobList";
import Filters from "./Filters";

export default function List() {
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
    </div>
  );
}
