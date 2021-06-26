import React, { useState, useEffect } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import JobSeekerUserService from "../../services/jobSeekerUserService";

export default function JobSeekerList() {
const [jobSeekerUsers, setJobSeekerUsers] = useState([])

useEffect(() => {
  let jobSeekerUserService = new JobSeekerUserService();
  jobSeekerUserService.getJobSeekerUsers().then(result => setJobSeekerUsers(result.data.data));
},[])

  return (
    <div>
      <h1>İş Arayanlar Listesi</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Ad</Table.HeaderCell>
            <Table.HeaderCell>Soyad</Table.HeaderCell>
            <Table.HeaderCell>E-posta</Table.HeaderCell>
            <Table.HeaderCell>Kimlik Numarası</Table.HeaderCell>
            <Table.HeaderCell>Doğum yılı</Table.HeaderCell>
            <Table.HeaderCell>Active?</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobSeekerUsers.map(jobSeekerUser => (
          <Table.Row key={jobSeekerUser.id}>
          <Table.Cell>{jobSeekerUser.id}</Table.Cell>
          <Table.Cell>{jobSeekerUser.firstName}</Table.Cell>
          <Table.Cell>{jobSeekerUser.lastName}</Table.Cell>
          <Table.Cell>{jobSeekerUser.email}</Table.Cell>
          <Table.Cell>{jobSeekerUser.nationalIdentity}</Table.Cell>
          <Table.Cell>{jobSeekerUser.yearOfBirth}</Table.Cell>
          <Table.Cell>{jobSeekerUser.active.toString()}</Table.Cell>
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
