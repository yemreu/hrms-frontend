import React from "react";
import { Label,Divider,Segment,Image } from "semantic-ui-react";

export default function JobSeekerCv() {
  return (
    <div>
      <h1>CV</h1>
      <Segment>
        <Label>Fotoğraf</Label>
          <Image
            src="http://res.cloudinary.com/dor1iaolp/image/upload/v1623678802/hrms/ezwzm6xwh9fy5uean4ty.png"
            size="medium"
/>
        <Divider horizontal></Divider>
        <Label>Ön Yazı</Label>
        <Divider horizontal></Divider>
        <Label>Eğitim Bilgileri</Label>
        <Divider horizontal></Divider>
        <Label>İş Deneyimleri</Label>
        <Divider horizontal></Divider>
        yabancı dil
        <Divider horizontal></Divider>
        <Label>Sosyal Platformlar</Label>
        <Divider horizontal></Divider>
        <Label>Yetenekler</Label>
      </Segment>
    </div>
  );
}
