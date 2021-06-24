import React, { useState, useEffect } from "react";
import { Label,Divider,Segment,Image } from "semantic-ui-react";
import CvLanguageService from "../../../../services/cvLanguageService";
import CvService from "../../../../services/cvService";

export default function JobSeekerCv() {
const [cv, setCv] = useState([]);
const [cvLanguages, setCvLanguages] = useState([]);

useEffect(() => {
  let cvService = new CvService();
  let cvLanguageService = new CvLanguageService();
  cvService.getSeekerCv(1).then(result => setCv(result.data.data));
  cvLanguageService.getSeekerCvLanguages(29).then(result => result.data.data);
})

  return (
    <div>
      <h1>CV</h1>
      <Segment>
        <Label>Fotoğraf</Label>
          <Image
            src={cv.jobSeekerUser.image.imageUrl}
            size="medium"
/>
        <Divider horizontal></Divider>
        <Label>Ön Yazı</Label>
        {cv.coverLetter.title}<br/>
        {cv.coverLetter.body}
        <Divider horizontal></Divider>
        <Label>Eğitim Bilgileri</Label>
        {cv.educations.map(result => (
          <div>
            {result.instutionName}<br/>
            {result.department}<br/>
            {result.startingDate}<br/>
            {result.completionDate}<br/>
          </div>
        ))}
        <Divider horizontal></Divider>
        <Label>İş Deneyimleri</Label>
        <Divider horizontal></Divider>
        {cvLanguages.map(cvLanguage => (
          <div>
            {cvLanguage.name}<br/>
            {cvLanguage.level}
          </div>
        ))}
        <Divider horizontal></Divider>
        <Label>Sosyal Platformlar</Label>
        <Divider horizontal></Divider>
        <Label>Yetenekler</Label>
      </Segment>
    </div>
  );
}
