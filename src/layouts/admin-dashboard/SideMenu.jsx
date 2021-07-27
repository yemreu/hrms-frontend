import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function SideMenu() {
  return (
    <div>
      <Menu inverted pointing vertical>
        <Menu.Item
          name="iş pozisyonu ekle"
          as={NavLink}
          to="/admin-dashboard/add-job-title"
        />
        <Menu.Item
          name="iş arayan listesi"
          as={NavLink}
          to="/admin-dashboard/job-seeker-list"
        />
        <Menu.Item
          name="işveren listesi"
          as={NavLink}
          to="/admin-dashboard/employer-list"
        />
        <Menu.Item
          name="iş pozisyonu listesi"
          as={NavLink}
          to="/admin-dashboard/job-title-list"
        />
        <Menu.Item
          name="İnaktif iş ilanları listesi"
          as={NavLink}
          to="/admin-dashboard/inactive-job-list"
        />
        <Menu.Item
          name="İşveren profil güncelleme listesi"
          as={NavLink}
          to="/admin-dashboard/employer-profile-update-list"
        />
      </Menu>
    </div>
  );
}
