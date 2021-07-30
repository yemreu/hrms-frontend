import React from "react";
import AddJob from "../../../../pages/system/content/jobs/AddJob";
import JobDetail from "../../../../pages/system/content/jobs/JobDetail";

import { Route } from "react-router-dom";
import List from "./list/List";

export default function Jobs() {
  return (
    <div>
      <Route exact path="/" component={List}/>
      <Route path="/jobs/add-job" component={AddJob}/>
      <Route path="/jobs/job-detail/:id" component={JobDetail}/>
    </div>
  );
}
