import React, { useState, useEffect, Fragment } from "react";
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
    coverLetter: 0,
    educations: [],
    // institutionName: "",
    // department: "",
    // startingDate: "",
    // completionDate: "",
    companyName: "",
    title: "",
    startDate: "",
    endDate: "",
    languages: 0,
    level: 0,
    socialPlatform: 0,
    profileName: "",
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
        .required("Gerekli"),
      })
    ),
    // institutionName: Yup.string()
    // .max(100,"En fazla 100 karakter olmalı")
    // .required("Gerekli"),
    // department: Yup.string()
    // .max(100,"En fazla 100 karakter olmalı"),
    // startingDate: Yup.date()
    // .required("Gerekli"),
    companyName: Yup.string()
    .max(100,"En fazla 100 karakter olmalı")
    .required("Gerekli"),
    title: Yup.string()
    .max(50,"En fazla 50 karakter olmalı")
    .required("Gerekli"),
    startDate: Yup.date()
    .required("Gerekli"),
    languages: Yup.number()
    .required("Gerekli"),
    level: Yup.number()
    .min(1)
    .max(5)
    .required("Gerekli"),
    socialPlatform: Yup.number()
    .required("Gerekli"),
    profileName: Yup.string()
    .max(100,"En fazla 100 karakter olmalı")
    .required("Gerekli")
  });

  const onSubmit = values => { console.log("girdiii");
    let imageService = new ImageService();
    if(values.image != null) {
      let file = new FormData();
      file.append("image",values.image);
      //imageService.uploadImage(file,1);
    }
    let cvService = new CvService();
    let data = {
      jobSeekerUser: {
        id: 1
      },
      id: 29,
      coverLetter: {
        id: values.coverLetter
      },
      educations: values.educations,
      // educations: [
      //   {
      //     id: 69,
      //     institutionName: values.institutionName,
      //     department: values.department,
      //     startingDate: yearMonthToIsoString(values.startingDate),
      //     completionDate: yearMonthToIsoString(values.completionDate)
      //   }
      // ],
      experiences: [
        {
          id: 9,
          companyName: values.companyName,
          title: values.title,
          startDate: yearMonthToIsoString(values.startDate),
          endDate: yearMonthToIsoString(values.endDate)
        }
      ],
      languages: [
        {
          id: 9,
          language: {
            id: values.languages
          },
          level: values.level
        }
      ],
      socialLinks: [
        {
          id: 14,
          socialPlatform: {
            id: values.socialPlatform
          },
          profileName: values.profileName
        }
      ],
      skills: values.skills
    }
    console.log(data.educations);
    //cvService.saveCv(data);
  };

  return (
    <div>
      <h1>Cv Düzenle</h1>
      <Segment>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {props => (
            <Form className="ui form">{console.log(props.values.educations)}
              <Label>Fotoğraf</Label>
              <Image style={{"marginTop": "1em"}} src="http://res.cloudinary.com/dor1iaolp/image/upload/v1623678802/hrms/ezwzm6xwh9fy5uean4ty.png" size="medium" centered/>
              <HRMSFileInput id="image" name="image" formikProps={props}/>
              <Divider horizontal></Divider>
              <Label>Ön Yazı</Label>
              <HRMSSelect style={{"marginTop": "1em"}} fluid id="coverLetter" name="coverLetter" placeholder="Ön Yazı" options={coverLetters.map(coverLetter => ({key:coverLetter.id,value:coverLetter.id,text:coverLetter.title}))} formikProps={props} />
              <Divider horizontal></Divider>
              <Label>Eğitim Bilgileri</Label>
              <FieldArray props={props} name="educations" render={({ insert, remove, push }) => (
                 props.values.educations.map((education,index) => (
                  <Segment key={index}>
                    <HRMSInput fluid type="text" id={`educations.${index}.institutionName`} name={`educations.${index}.institutionName`} placeholder="Okul Adı" label="Okul Adı" />
                    <HRMSInput fluid type="text" id={`educations.${index}.department`} name={`educations.${index}.department`} placeholder="Bölüm" label="Bölüm" />
                    <FormGroup widths="equal">
                      <HRMSInput fluid type="month" id={`educations.${index}.startingDate`} name={`educations.${index}.startingDate`} placeholder="Başlangıç Tarihi" label="Başlangıç Tarihi" />
                      <HRMSInput fluid type="month" id={`educations.${index}.completionDate`} name={`educations.${index}.completionDate`} placeholder="Bitiş Tarihi" label="Bitiş Tarihi" />
                    </FormGroup>
                  </Segment>
                  
                 ))
              )} />
              <br></br><br></br>
              <Button icon color="green" onClick={(e) => props.values.educations.push({institutionName: "", department: "", startingDate: "", completionDate: ""})}><Icon name="plus"></Icon></Button>
              {/* 
              <Segment>
                <HRMSInput fluid type="text" id="institutionName" name="institutionName" placeholder="Okul Adı" label="Okul Adı" />
                <HRMSInput fluid type="text" id="department" name="department" placeholder="Bölüm" label="Bölüm" />
                <FormGroup widths="equal">
                  <HRMSInput fluid type="month" id="startingDate" name="startingDate" placeholder="Başlangıç Tarihi" label="Başlangıç Tarihi" />
                  <HRMSInput fluid type="month" id="completionDate" name="completionDate" placeholder="Bitiş Tarihi" label="Bitiş Tarihi" />
                </FormGroup>
              </Segment>
              <Button icon color="green"><Icon name="plus"></Icon></Button><Button icon color="red"><Icon name="minus"></Icon></Button>
              <Divider horizontal></Divider>
              <Label>İş Deneyimleri</Label>
              <Segment>
                <HRMSInput fluid type="text" id="companyName" name="companyName" placeholder="İş Yeri Adı" label="İş Yeri Adı" />
                <HRMSInput fluid type="text" id="title" name="title" placeholder="Pozisyon" label="Pozisyon" />
                <FormGroup widths="equal">
                  <HRMSInput fluid type="month" id="startDate" name="startDate" placeholder="Başlangıç Tarihi" label="Başlangıç Tarihi" />
                  <HRMSInput fluid type="month" id="endDate" name="endDate" placeholder="Bitiş Tarihi" label="Bitiş Tarihi" />
                </FormGroup>
              </Segment>
              <Button icon color="green"><Icon name="plus"></Icon></Button><Button icon color="red"><Icon name="minus"></Icon></Button>
              <Divider horizontal></Divider>
              <Label>Yabancı Diller</Label>
              <Segment>
                <FormGroup widths="equal">
                  <HRMSSelect fluid id="languages" name="languages" placeholder="Yabancı Dil" label="Yabancı Dil" options={languages.map(language => ({key:language.id,value:language.id,text:language.name}))} formikProps={props} />
                  <HRMSSelect fluid id="level" name="level" placeholder="Seviye" label="Seviye" options={[
                    { key: "1", value: "1", text: "1" },
                    { key: "2", value: "2", text: "2" },
                    { key: "3", value: "3", text: "3" },
                    { key: "4", value: "4", text: "4" },
                    { key: "5", value: "5", text: "5" },
                  ]} formikProps={props} />
                </FormGroup>
              </Segment>
              <Button icon color="green"><Icon name="plus"></Icon></Button><Button icon color="red"><Icon name="minus"></Icon></Button>
              <Divider horizontal></Divider>
              <Label>Sosyal Platformlar</Label>
              <Segment>
                <FormGroup widths="equal">
                  <HRMSSelect fluid id="socialPlatform" name="socialPlatform" placeholder="Sosyal Platform" label="Sosyal Platform" options={socialPlatforms.map(socialPlatform => ({key:socialPlatform.id,value:socialPlatform.id,text:socialPlatform.name}))} formikProps={props} />
                  <HRMSInput fluid type="text" id="profileName" name="profileName" placeholder="Profil Adı" label="Profil Adı" />
                </FormGroup>
              </Segment>
              <Button icon color="green"><Icon name="plus"></Icon></Button><Button icon color="red"><Icon name="minus"></Icon></Button> */}
              <Divider horizontal></Divider>
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
