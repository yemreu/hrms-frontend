import React, { useState, useEffect } from "react";
import { Button, Icon, Menu, Table } from "semantic-ui-react";
import EmployerUserService from "../../services/employerUserService";

export default function EmployerProfileUpdateList() {
  const [employerProfileUpdates, setEmployerProfileUpdates] = useState([]);
  const approveProfileUpdate = (profileUpdateId) => {
    let employerUserService = new EmployerUserService();
    employerUserService.approveProfileUpdate(profileUpdateId);
  }

  useEffect(() => {
    let employerUserService = new EmployerUserService();
    employerUserService.getEmployerUserProfileUpdates().then((result) => setEmployerProfileUpdates(result.data.data));
  },[]);

  return (
    <div>
      <h1>İşveren Profile Güncellemeleri</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
            <Table.HeaderCell>Website</Table.HeaderCell>
            <Table.HeaderCell>Telefon Numarası</Table.HeaderCell>
            <Table.HeaderCell>Onay</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employerProfileUpdates.map((employerProfileUpdate) => (
            <Table.Row key={employerProfileUpdate.id}>
              <Table.Cell>{employerProfileUpdate.id}</Table.Cell>
              <Table.Cell>{employerProfileUpdate.companyName}</Table.Cell>
              <Table.Cell>{employerProfileUpdate.website}</Table.Cell>
              <Table.Cell>{employerProfileUpdate.phoneNumber}</Table.Cell>
              <Table.Cell>{employerProfileUpdate.active?null:<Button type="button" onClick={() => approveProfileUpdate(employerProfileUpdate.id)} positive>Onayla</Button>}</Table.Cell>
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
