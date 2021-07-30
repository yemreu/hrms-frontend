import React, { useState, useEffect } from "react";
import { Icon, Menu, Pagination, Table } from "semantic-ui-react";
import JobService from "../../../../services/jobService";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [activePage,setActivePage] = useState({activePage: 1})
  const [totalPage,setTotalPage] = useState(0);
  const [pageSize,setPageSize] = useState(5);
  const [jobFilter,setJobFilter] = useState({});
  const [jobCount,setJobCount] = useState(0);

  useEffect(() => {
    console.log(activePage)
    let jobService = new JobService();
    jobService.getFilteredJobWithPagination(jobFilter,activePage.activePage,pageSize).then((result) => {setJobs(result.data.data.paginatedJob);setJobCount(result.data.data.jobCount);});
    setTotalPage(Math.ceil(jobCount / pageSize));
  },[jobs.length,pageSize,activePage,jobFilter,jobCount]);

  return (
    <div>
      <h1>İş İlanları</h1>{console.log(totalPage)}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
            <Table.HeaderCell>İş Pozisyonu Adı</Table.HeaderCell>
            <Table.HeaderCell>Açık Pozisyon Adedi</Table.HeaderCell>
            <Table.HeaderCell>Yayın Tarihi</Table.HeaderCell>
            <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
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
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
          <Table.HeaderCell colSpan="6">
            <Pagination activePage={activePage} totalPages={totalPage} onPageChange={(e,{activePage}) => setActivePage({activePage})} /></Table.HeaderCell>
            {/* <Table.HeaderCell colSpan="5">
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
            </Table.HeaderCell> */}
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
