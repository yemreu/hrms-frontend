import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormSelect, Pagination, Table } from "semantic-ui-react";
import JobService from "../../../../services/jobService";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [activePage,setActivePage] = useState({activePage: 1})
  const [totalPage,setTotalPage] = useState(0);
  const [pageSize,setPageSize] = useState(10);
  const [jobCount,setJobCount] = useState(0);
  const {jobFilter} = useSelector(state => state.jobFilter);

  useEffect(() => {
    let jobService = new JobService();
    jobService.getFilteredJobWithPagination(jobFilter,activePage.activePage,pageSize).then((result) => {setJobs(result.data.data.paginatedJob);setJobCount(result.data.data.jobCount);});
    setTotalPage(Math.ceil(jobCount / pageSize));
  },[jobs.length,pageSize,activePage,jobFilter,jobCount]);

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
              <Pagination defaultActivePage={activePage} totalPages={totalPage} onPageChange={(e,{activePage}) => setActivePage({activePage})} /> <FormSelect id="pageSize" name="pageSize" options={[{key:10,value:10,text:10},{key:20,value:20,text:20},{key:50,value:50,text:50},{key:100,value:100,text:100}]} onChange={(e,item) => setPageSize(item.value)} defaultValue={pageSize}/>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
