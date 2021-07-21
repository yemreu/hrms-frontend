import React, { useState, useEffect } from "react";
import { Button, Icon, Menu, Table } from "semantic-ui-react";
import JobService from "../../services/jobService";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const activateJob = (jobId) => {
    let jobService = new JobService();
    jobService.activateJob(jobId);
  }

  useEffect(() => {
    let jobService = new JobService();
    jobService.getInActiveJobs().then((result) => setJobs(result.data.data));
  },[]);

  return (
    <div>
      <h1>İş İlanları</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
            <Table.HeaderCell>İş Pozisyonu Adı</Table.HeaderCell>
            <Table.HeaderCell>Açık Pozisyon Adedi</Table.HeaderCell>
            <Table.HeaderCell>Yayın Tarihi</Table.HeaderCell>
            <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
            <Table.HeaderCell>Onay</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobs.map((job) => (
            <Table.Row key={job.id}>
              <Table.Cell>{job.id}</Table.Cell>
              <Table.Cell>{job.companyName}</Table.Cell>
              <Table.Cell>{job.jobTitle}</Table.Cell>
              <Table.Cell>{job.vacancy}</Table.Cell>
              <Table.Cell>{job.postingDate}</Table.Cell>
              <Table.Cell>{job.lastApplicationDate}</Table.Cell>
              <Table.Cell>{job.active?null:<Button onClick={() => activateJob(job.id)} positive>Onayla</Button>}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
