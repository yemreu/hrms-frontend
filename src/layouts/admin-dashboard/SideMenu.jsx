import React from "react";
import { Menu } from "semantic-ui-react";

export default function SideMenu() {
  return (
    <div>
      <Menu inverted pointing vertical>
        <Menu.Item
          name="iş pozisyonu ekle"
        />
        <Menu.Item
          name="iş arayanlar listesi"
        />
        <Menu.Item
          name="iş verenler listesi"
        />
        <Menu.Item
          name="iş pozisyonu listesi"
        />
      </Menu>
    </div>
  );
}
