import React, { useState, useEffect } from "react";
import { Label, Segment, Message } from "semantic-ui-react";
import EmployerUserService from "../../../../../services/employerUserService";

export default function EmployerUserProfile() {
  const [employerUserProfile, setEmployerUserProfile] = useState([]);
  const [existsProfileUpdate, setExistsProfileUpdate] = useState([]);

  useEffect(() => {
    let employerUserService = new EmployerUserService();
    employerUserService.getEmployerUser(32).then((result) => setEmployerUserProfile(result.data.data));
    employerUserService.existsEmployerUserProfileUpdate(32).then((result) => setExistsProfileUpdate(result.data.success));
  },[]);

  return (
    <div>
      <h1>İşveren Profili</h1>
        <Segment>
          <Label>Şirket Adı</Label><br></br><br></br>
          {employerUserProfile.companyName}<br></br><br></br>
          <Label>Website</Label><br></br><br></br>
          {employerUserProfile.website}<br></br><br></br>
          <Label>Telefon Numarası</Label><br></br><br></br>
            {employerUserProfile.phoneNumber}
        </Segment>
        {existsProfileUpdate?(<Message warning content="Güncelleme için onay bekleniyor."/>):null}
    </div>
  );
}
