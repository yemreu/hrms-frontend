import React from "react";
import "./../../../src/App.css";
import SideMenu from "./SideMenu";
import AddJobTitle from "../../pages/admin-dashboard/AddJobTitle";
import EmployerList from "../../pages/admin-dashboard/EmployerList";
import JobSeekerList from "../../pages/admin-dashboard/JobSeekerList";
import { Grid,Container } from "semantic-ui-react";
import JobTitleList from "../../pages/admin-dashboard/JobTitleList";

export default function AdminDashboard() {
  return (
    <div >
      <Container className="dashboard">
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <SideMenu />
            </Grid.Column>
            <Grid.Column width={12}>
              <AddJobTitle />
              <EmployerList />
              <JobSeekerList />
              <JobTitleList/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}
