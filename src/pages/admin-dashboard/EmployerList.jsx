import React, { useState, useEffect } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import EmployerUserService from "../../services/employerUserService";

export default function EmployerList() {
  const [employerUsers, setEmployerUsers] = useState([]);

  useEffect(() => {
    let employerUserService = new EmployerUserService();
    employerUserService
      .getEmployerUsers()
      .then((result) => setEmployerUsers(result.data.data));
  });

  return (
    <div>
      <h1>İşverenler Listesi</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
            <Table.HeaderCell>E-posta</Table.HeaderCell>
            <Table.HeaderCell>Telefon Numarası</Table.HeaderCell>
            <Table.HeaderCell>Website</Table.HeaderCell>
            <Table.HeaderCell>Verified?</Table.HeaderCell>
            <Table.HeaderCell>Active?</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employerUsers.map((employerUser) => (
            <Table.Row key={employerUser.id}>
              <Table.Cell>{employerUser.id}</Table.Cell>
              <Table.Cell>{employerUser.companyName}</Table.Cell>
              <Table.Cell>{employerUser.email}</Table.Cell>
              <Table.Cell>{employerUser.phoneNumber}</Table.Cell>
              <Table.Cell>{employerUser.website}</Table.Cell>
              <Table.Cell>{employerUser.verifiedCompany.toString()}</Table.Cell>
              <Table.Cell>{employerUser.active.toString()}</Table.Cell>
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
