import React, { useState, useEffect } from "react";
import { Button, Form, Divider, Segment, Label,Image } from "semantic-ui-react";
import CoverLetterService from "../../../../services/coverLetterService";
import LanguageService from "../../../../services/languageService";
import SocialPlatformService from "../../../../services/socialPlatformService";

export default function EditCv() {
  const [coverLetters, setCoverLetters] = useState([])
  const [languages, setLanguages] = useState([])
  const [socialPlatforms, setSocialPlatforms] = useState([])

  useEffect(() => {
  let coverLetterService = new CoverLetterService();
  let languageService = new LanguageService();
  let socialPlatformService = new SocialPlatformService();
  coverLetterService.getSeekerCoverLetters(1).then(result => setCoverLetters(result.data.data))
  languageService.getLanguages().then(result => setLanguages(result.data.data))
  socialPlatformService.getSocialPlatforms().then(result => setSocialPlatforms(result.data.data))
  },[])

  return (
    <div>
      <h1>Cv Düzenle</h1>
      <Segment>
        <Form>
          <Label>Fotoğraf</Label>
          <Form.Field>
            <br></br>
            <Image src="http://res.cloudinary.com/dor1iaolp/image/upload/v1623678802/hrms/ezwzm6xwh9fy5uean4ty.png" size="medium" centered/>
            <Form.Input type="file" />
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Ön Yazı</Label>
          <Form.Field>
          <br></br>
            <Form.Select options={coverLetters.map(coverLetter => ({key:coverLetter.id,value:coverLetter.title,text:coverLetter.title}))}/>
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Eğitim Bilgileri</Label>
          <Form.Field>
            <label>Okul Adı</label>
            <Form.Input fluid placeholder="Okul Adı" />
            <Form.Group widths="equal">
              <Form.Input
                type="month"
                fluid
                label="Başlangıç Tarihi"
                placeholder="Başlangıç Tarihi"
              />
              <Form.Input
                type="month"
                fluid
                label="Bitiş Tarihi"
                placeholder="Bitiş Maaş"
              />
            </Form.Group>
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>İş Deneyimleri</Label>
          <Form.Field>
            <label>İş Yeri Adı</label>
            <Form.Input fluid placeholder="İş Yeri Adı" />
            <label>Pozisyon</label>
            <Form.Input fluid placeholder="Pozisyon" />
            <Form.Group widths="equal">
              <Form.Input
                type="month"
                fluid
                label="Başlangıç Tarihi"
                placeholder="Başlangıç Tarihi"
              />
              <Form.Input
                type="month"
                fluid
                label="Bitiş Tarihi"
                placeholder="Bitiş Maaş"
              />
            </Form.Group>
          </Form.Field>
          <Divider horizontal></Divider>
          <Form.Field>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                label="Yabancı Dil"
                placeholder="Yabancı Dil"
                options = {languages.map(language => ({key:language.id,value:language.name,text:language.name}))}
              />
              <Form.Select
                fluid
                label="Seviye"
                placeholder="Seviye"
                options={[
                  { key: "1", value: "1", text: "1" },
                  { key: "2", value: "2", text: "2" },
                  { key: "3", value: "3", text: "3" },
                  { key: "4", value: "4", text: "4" },
                  { key: "5", value: "5", text: "5" },
                ]}
              />
            </Form.Group>
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Sosyal Platformlar</Label>
          <Form.Field>
          <br></br>
            <Form.Group widths="equal">
              <Form.Select options={socialPlatforms.map(socialPlatform => ({key:socialPlatform.id,value:socialPlatform.name,text:socialPlatform.name}))}/>
              <Form.Input type="text" fluid placeholder="Profil Adı" />
            </Form.Group>
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Yetenekler</Label>
          <Form.Field>
            <Form.TextArea label="Yetenekler" placeholder="Yetenekler" />
          </Form.Field>
          <Button type="submit">Kaydet</Button>
        </Form>
      </Segment>
    </div>
  );
}
