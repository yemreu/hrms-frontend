import React from "react";
import "./../../../src/App.css";
import SideMenu from "./SideMenu";
import AddJobTitle from "../../pages/admin-dashboard/AddJobTitle";
import EmployerList from "../../pages/admin-dashboard/EmployerList";
import JobSeekerList from "../../pages/admin-dashboard/JobSeekerList";
import { Grid,Container } from "semantic-ui-react";
import JobTitleList from "../../pages/admin-dashboard/JobTitleList";
import { Route } from "react-router-dom";
import JobList from "../../pages/admin-dashboard/JobList";

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
              <Route exact path="/admin-dashboard/add-job-title" component={AddJobTitle}/>
              <Route exact path="/admin-dashboard/employer-list" component={EmployerList}/>
              <Route exact path="/admin-dashboard/job-seeker-list" component={JobSeekerList}/>
              <Route exact path="/admin-dashboard/job-title-list" component={JobTitleList}/>
              <Route exact path="/admin-dashboard/inactive-job-list" component={JobList}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}
