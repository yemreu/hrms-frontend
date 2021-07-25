import React, { useState, useEffect } from "react";
import { Button, Divider, Segment, Label,Image, FormGroup, Icon } from "semantic-ui-react";
import CoverLetterService from "../../../../services/coverLetterService";
import LanguageService from "../../../../services/languageService";
import SocialPlatformService from "../../../../services/socialPlatformService";
import CvService from "../../../../services/cvService";
import ImageService from "../../../../services/imageService";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from 'yup';
import HRMSFileInput from "../../../../utilities/customFormControls/HRMSFileInput";
import HRMSSelect from "../../../../utilities/customFormControls/HRMSSelect";
import HRMSInput from "../../../../utilities/customFormControls/HRMSInput";
import HRMSTextArea from "../../../../utilities/customFormControls/HRMSTextArea";

export default function EditCv() {
  const [coverLetters, setCoverLetters] = useState([])
  const [languages, setLanguages] = useState([])
  const [socialPlatforms, setSocialPlatforms] = useState([])
  const fileTypes = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
  const yearMonthToIsoString = (monthYear) => {
    return new Date(monthYear).toISOString().slice(0, 10);
  }

  useEffect(() => {
  let coverLetterService = new CoverLetterService();
  let languageService = new LanguageService();
  let socialPlatformService = new SocialPlatformService();
  coverLetterService.getSeekerCoverLetters(1).then(result => setCoverLetters(result.data.data))
  languageService.getLanguages().then(result => setLanguages(result.data.data))
  socialPlatformService.getSocialPlatforms().then(result => setSocialPlatforms(result.data.data))
  },[])

  const initialValues = {
    image: null,
    coverLetter: {id: 0},
    educations: [],
    experiences: [],
    languages: [],
    socialLinks: [],
    skills: ""
  };

  const validationSchema = Yup.object({
    image: Yup.mixed()
    .test("fileSize","Dosya 1MB'den az olmalı",(file) => !file || (file && file.size < 1048577))
    .test("fileType","Geçersiz dosya formatı",(file) => !file || (file && fileTypes.includes(file.type))),
    educations: Yup.array()
    .of(
      Yup.object().shape({
        institutionName: Yup.string()
        .max(100,"En fazla 100 karakter olmalı")
        .required("Gerekli"),
        department: Yup.string()
        .max(100,"En fazla 100 karakter olmalı"),
        startingDate: Yup.date()
        .required("Gerekli")
      })
    ),
    experiences: Yup.array()
    .of(
      Yup.object().shape({
        companyName: Yup.string()
        .max(100,"En fazla 100 karakter olmalı")
        .required("Gerekli"),
        title: Yup.string()
        .max(50,"En fazla 50 karakter olmalı")
        .required("Gerekli"),
        startDate: Yup.date()
        .required("Gerekli")
      })
    ),
    languages: Yup.array()
    .of(
      Yup.object().shape({
        language: Yup.object().shape({
          id: Yup.number()
          .required("Gerekli")
        }),
        level: Yup.number()
        .min(1)
        .max(5)
        .required("Gerekli")
      })
    ),
    socialLinks: Yup.array()
    .of(
      Yup.object().shape({
        socialPlatform: Yup.object().shape({
          id: Yup.number()
          .required("Gerekli")
        }),
        profileName: Yup.string()
        .max(100,"En fazla 100 karakter olmalı")
      })
    )
  });

  const onSubmit = values => {
    console.log("girdii")
    let imageService = new ImageService();
    if(values.image != null) {
      let file = new FormData();
      file.append("image",values.image);
      imageService.uploadImage(file,1);
    }
    let cvService = new CvService();
    values.educations.forEach(education => { education.startingDate = yearMonthToIsoString(education.startingDate);education.completionDate = yearMonthToIsoString(education.completionDate);});
    values.experiences.forEach(experience => { experience.startDate = yearMonthToIsoString(experience.startDate);experience.endDate = yearMonthToIsoString(experience.endDate);});
    let data = {
      jobSeekerUser: {
        id: 1
      },
      id: 29,
      coverLetter: values.coverLetter,
      educations: values.educations,
      experiences: values.experiences,
      languages: values.languages,
      socialLinks: values.socialLinks,
      skills: values.skills
    }
    console.log(data);
    cvService.saveCv(data);
  };

  return (
    <div>
      <h1>Cv Düzenle</h1>
      <Segment>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {props => (
            <Form className="ui form">
              <Label>Fotoğraf</Label>
              <Image style={{"marginTop": "1em"}} src="http://res.cloudinary.com/dor1iaolp/image/upload/v1623678802/hrms/ezwzm6xwh9fy5uean4ty.png" size="medium" centered/>
              <HRMSFileInput id="image" name="image" formikProps={props}/>
              <Divider section />
              <Label>Ön Yazı</Label>
              <HRMSSelect style={{"marginTop": "1em"}} fluid id="coverLetter.id" name="coverLetter.id" placeholder="Ön Yazı" options={coverLetters.map(coverLetter => ({key:coverLetter.id,value:coverLetter.id,text:coverLetter.title}))} formikProps={props} />
              <Divider section />
              <Label>Eğitim Bilgileri</Label><br></br><br></br>
              <FieldArray props={props} name="educations" render={({ insert, remove, push }) => (
                <div>
                  {props.values.educations.map((education,index) => (
                    <Segment key={index}>
                      <HRMSInput fluid type="text" id={`educations.${index}.institutionName`} name={`educations.${index}.institutionName`} placeholder="Okul Adı" label="Okul Adı" />
                      <HRMSInput fluid type="text" id={`educations.${index}.department`} name={`educations.${index}.department`} placeholder="Bölüm" label="Bölüm" />
                      <FormGroup widths="equal">
                        <HRMSInput fluid type="month" id={`educations.${index}.startingDate`} name={`educations.${index}.startingDate`} placeholder="Başlangıç Tarihi" label="Başlangıç Tarihi" />
                        <HRMSInput fluid type="month" id={`educations.${index}.completionDate`} name={`educations.${index}.completionDate`} placeholder="Bitiş Tarihi" label="Bitiş Tarihi" />
                      </FormGroup>
                      <Button type="button" icon color="red" onClick={(e) => remove(index)}><Icon name="minus" ></Icon></Button>
                    </Segment>
                  ))}
                  <br></br>
                  <Button type="button" icon color="green" onClick={(e) => push({institutionName: "", department: "", startingDate: "", completionDate: ""})}><Icon name="plus"></Icon></Button>
                 </div>
              )} />
              <Divider section />
              <Label>İş Deneyimleri</Label><br></br><br></br>
              <FieldArray props={props} name="experiences" render={({ insert, remove, push }) => (
                <div>
                  {props.values.experiences.map((experience,index) => (
                    <Segment key={index}>
                      <HRMSInput fluid type="text" id={`experiences.${index}.companyName`} name={`experiences.${index}.companyName`} placeholder="İş Yeri Adı" label="İş Yeri Adı" />
                      <HRMSInput fluid type="text" id={`experiences.${index}.title`} name={`experiences.${index}.title`} placeholder="Pozisyon" label="Pozisyon" />
                      <FormGroup widths="equal">
                        <HRMSInput fluid type="month" id={`experiences.${index}.startDate`} name={`experiences.${index}.startDate`} placeholder="Başlangıç Tarihi" label="Başlangıç Tarihi" />
                        <HRMSInput fluid type="month" id={`experiences.${index}.endDate`} name={`experiences.${index}.endDate`} placeholder="Bitiş Tarihi" label="Bitiş Tarihi" />
                      </FormGroup>
                      <Button type="button" icon color="red" onClick={(e) => remove(index)}><Icon name="minus" ></Icon></Button>
                    </Segment>
                  ))}
                  <br></br>
                  <Button type="button" icon color="green" onClick={(e) => push({companyName: "", title: "", startDate: "", endDate: ""})}><Icon name="plus"></Icon></Button>
                 </div>
              )} />
              <Divider section />
              <Label>Yabancı Diller</Label><br></br><br></br>
              <FieldArray props={props} name="languages" render={({ insert, remove, push }) => (
                <div>
                  {props.values.languages.map((language,index) => (
                    <Segment key={index}>
                      <FormGroup widths="equal">
                  <     HRMSSelect fluid id={`languages.${index}.language.id`} name={`languages.${index}.language.id`} placeholder="Yabancı Dil" label="Yabancı Dil" options={languages.map(language => ({key:language.id,value:language.id,text:language.name}))} formikProps={props} />
                        <HRMSSelect fluid id={`languages.${index}.level`} name={`languages.${index}.level`} placeholder="Seviye" label="Seviye" options={[
                          { key: "1", value: "1", text: "1" },
                          { key: "2", value: "2", text: "2" },
                          { key: "3", value: "3", text: "3" },
                          { key: "4", value: "4", text: "4" },
                          { key: "5", value: "5", text: "5" },
                          ]} formikProps={props} />
                      </FormGroup>
                      <Button type="button" icon color="red" onClick={(e) => remove(index)}><Icon name="minus" ></Icon></Button>
                    </Segment>
                  ))}
                  <br></br>
                  <Button type="button" icon color="green" onClick={(e) => push({language: {id: 0}, level: 0})}><Icon name="plus"></Icon></Button>
                 </div>
              )} />
              <Divider section />
              <Label>Sosyal Platformlar</Label><br></br><br></br>
              <FieldArray props={props} name="socialLinks" render={({ insert, remove, push }) => (
                <div>
                  {props.values.socialLinks.map((language,index) => (
                    <Segment key={index}>
                      <FormGroup widths="equal">
                        <HRMSSelect fluid id={`socialLinks.${index}.socialPlatform.id`} name={`socialLinks.${index}.socialPlatform.id`} placeholder="Sosyal Platform" label="Sosyal Platform" options={socialPlatforms.map(socialPlatform => ({key:socialPlatform.id,value:socialPlatform.id,text:socialPlatform.name}))} formikProps={props} />
                        <HRMSInput fluid type="text" id={`socialLinks.${index}.profileName`} name={`socialLinks.${index}.profileName`} placeholder="Profil Adı" label="Profil Adı" />
                      </FormGroup>
                      <Button type="button" icon color="red" onClick={(e) => remove(index)}><Icon name="minus" ></Icon></Button>
                    </Segment>
                  ))}
                  <br></br>
                  <Button type="button" icon color="green" onClick={(e) => push({socialPlatform: {id: 0}, profileName: ""})}><Icon name="plus"></Icon></Button>
                 </div>
              )} />
              <Divider section />
              <Label>Yetenekler</Label>
              <HRMSTextArea id="skills"  name="skills" label="Yetenekler" placeholder="Yetenekler" />
              <Button type="submit">Kaydet</Button>
            </Form>
          )}
        </Formik>
      </Segment>
    </div>
  );
}
