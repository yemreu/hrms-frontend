import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Menu, Dropdown } from "semantic-ui-react";

export default function SignedOut({ signIn }) {
  return (
    <div>
      <Menu.Item>
        <Button onClick={signIn} primary>
          Giriş Yap
        </Button>
        <Button
          primary
          style={{ marginLeft: "0.5em" }}
          as={NavLink}
          to="/users/job-seekers/register"
        >
          Kayıt Ol
        </Button>
          <Dropdown item text="İşveren" style={{ marginLeft: "0.5em" }} button>
            <Dropdown.Menu>
              <Dropdown.Item>Giriş Yap</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/users/employers/register">
                Kayıt Ol
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </Menu.Item>
    </div>
  );
}
