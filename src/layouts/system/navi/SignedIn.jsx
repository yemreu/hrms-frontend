import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";

export default function SignedIn({signOut}) {
  return (
    <div>
      <Menu.Item>
        <Image
          avatar
          spaced="right"
          src="http://res.cloudinary.com/dor1iaolp/image/upload/v1623678802/hrms/ezwzm6xwh9fy5uean4ty.png"
        />
        <Dropdown pointing="top left" text="Emre">
          <Dropdown.Menu>
            <Dropdown.Item text="Ön Yazı Ekle" icon="file alternate" as={NavLink} to="/cover-letters/add-cover-letter"/>
            <Dropdown.Item text="Cv Düzenle" icon="pencil alternate" as={NavLink} to="/cv/edit-cv"/>
            <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out"/>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}