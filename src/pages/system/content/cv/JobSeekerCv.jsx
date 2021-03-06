import React, { useState, useEffect } from "react";
import { Label, Divider, Segment, Image, Rating } from "semantic-ui-react";
import CvLanguageService from "../../../../services/cvLanguageService";
import CvService from "../../../../services/cvService";
import EducationService from "../../../../services/educationService";
import ExperienceService from "../../../../services/experienceService";
import SocialLinkService from "../../../../services/socialLinkService";

export default function JobSeekerCv() {
  const [cv, setCv] = useState([]);
  const [cvLanguages, setCvLanguages] = useState([]);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    let cvService = new CvService();
    let cvLanguageService = new CvLanguageService();
    let educationService = new EducationService();
    let experienceService = new ExperienceService();
    let socialLinkService = new SocialLinkService();
    cvService.getSeekerCv(1).then((result) => setCv(result.data.data));
    cvLanguageService
      .getSeekerCvLanguages(29)
      .then((result) => setCvLanguages(result.data.data));
    educationService
      .getSeekerCvEducations(29)
      .then((result) => setEducations(result.data.data));
    experienceService
      .getSeekerCvExperiences(29)
      .then((result) => setExperiences(result.data.data));
    socialLinkService
      .getSeekerCvSocialLinks(29)
      .then((result) => setSocialLinks(result.data.data));
  },[]);

  return (
    <div>
      <h1>CV</h1>
      <Segment>
        <Image centered src={cv.imageUrl} size="medium" />
        <Divider section />
        <Segment>
          <Label>Ön Yazı</Label>
          <Segment>
            <div>
              <h4>{cv.coverLetterTitle}</h4>
              <br />
              <p>{cv.coverLetterBody}</p>
              <br />
            </div>
          </Segment>
        </Segment>

        <Divider section />
        <Segment>
          <Label>Eğitim Bilgileri</Label>
          {educations.map((education) => (
            <Segment key={education.id}>
              <div>
                <p><b>Kurum:</b> {education.institutionName}</p>
                <p><b>Bölüm:</b> {education.department}</p>
                <p><b>Başlangıç Tarihi:</b> {education.startingDate}</p>
                <p><b>Bitiş Tarihi:</b> {education.completionDate == null ? ("Devam Ediyor."):(education.completionDate)}</p>
              </div>
            </Segment>
          ))}
        </Segment>
        <Divider section />
        <Segment>
          <Label>İş Deneyimleri</Label>
          {experiences.map((experience) => (
            <Segment key={experience.id}>
              <div>
                <p><b>Şirket Adı: </b>{experience.companyName}</p>
                <p><b>Pozisyon: </b>{experience.title}</p>
                <p><b>Başlangıç Tarihi: </b>{experience.startDate}</p>
                <p><b>Bitiş Tarihi: </b>{experience.endDate == null ? ("Devam Ediyor."):(experience.endDate)}</p>
              </div>
            </Segment>
          ))}
        </Segment>
        <Divider section />
        <Segment>
          <Label>Yabancı Diller</Label>
          <Segment>
            {cvLanguages.map((cvLanguage) => (
              <div key={cvLanguage.id}>
                {cvLanguage.name}
                <Rating
                  defaultRating={cvLanguage.level}
                  maxRating={5}
                  disabled
                />
                <br />
              </div>
            ))}
          </Segment>
        </Segment>

        <Divider section />
        <Segment>
          <Label>Sosyal Platformlar</Label>
          <Segment>
            {socialLinks.map((socialLink) => (
              <div key={socialLink.id}>
                <a
                  href={socialLink.url + socialLink.profileName}
                  target="_blank"
                  rel="noreferrer"
                >
                  {socialLink.url + socialLink.profileName}
                </a>
              </div>
            ))}
          </Segment>
        </Segment>
        <Divider section />
        <Segment>
          <Label>Yetenekler</Label>
          <Segment>
            <div>
              {cv.skills}
              <br />
            </div>
          </Segment>
        </Segment>
      </Segment>
    </div>
  );
}
