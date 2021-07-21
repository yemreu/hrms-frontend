import React, { useState, useEffect } from "react";
import { Button, Form, Divider, Segment, Label,Image } from "semantic-ui-react";
import CoverLetterService from "../../../../services/coverLetterService";
import LanguageService from "../../../../services/languageService";
import SocialPlatformService from "../../../../services/socialPlatformService";
import CvService from "../../../../services/cvService";
import ImageService from "../../../../services/imageService";
import { useFormik } from "formik";
import * as Yup from 'yup';

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

  const formik = useFormik({
    initialValues: {
      image: null,
      coverLetter: 0,
      institutionName: "",
      department: "",
      startingDate: "",
      completionDate: "",
      companyName: "",
      title: "",
      startDate: "",
      endDate: "",
      languages: 0,
      level: 0,
      socialPlatform: 0,
      profileName: "",
      skills: ""
    },
    validationSchema: Yup.object({
      image: Yup.mixed()
      .test("fileSize","Dosya 1MB'den az olmalı",(file) => !file || (file && file.size < 1048577))
      .test("fileType","Geçersiz dosya formatı",(file) => !file || (file && fileTypes.includes(file.type))),
      institutionName: Yup.string()
      .max(100,"En fazla 100 karakter olmalı")
      .required("Gerekli"),
      department: Yup.string()
      .max(100,"En fazla 100 karakter olmalı"),
      startingDate: Yup.date()
      .required("Gerekli"),
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
    }),
    onSubmit: values => {
      let imageService = new ImageService();
      if(values.image != null) {
        let file = new FormData();
        file.append("image",values.image);
        imageService.uploadImage(file,1);
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
        educations: [
          {
            id: 69,
            institutionName: values.institutionName,
            department: values.department,
            startingDate: yearMonthToIsoString(values.startingDate),
            completionDate: yearMonthToIsoString(values.completionDate)
          }
        ],
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
      console.log(data);
      cvService.saveCv(data);
    }
});

  return (
    <div>
      <h1>Cv Düzenle</h1>
      <Segment>
        <Form onSubmit={formik.handleSubmit}>
          <Label>Fotoğraf</Label>
          <Form.Field>
            <br></br>
            <Image src="http://res.cloudinary.com/dor1iaolp/image/upload/v1623678802/hrms/ezwzm6xwh9fy5uean4ty.png" size="medium" centered/>
            <Form.Input id="image" name="image" type="file" onChange={(e) => formik.setFieldValue("image",e.currentTarget.files[0])} onBlur={formik.handleBlur}/>
            {formik.touched.image && formik.errors.image ? <div>{formik.errors.image}</div> : null}
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Ön Yazı</Label>
          <Form.Field>
          <br></br>
            <Form.Select id="coverLetter" name="coverLetter" options={coverLetters.map(coverLetter => ({key:coverLetter.id,value:coverLetter.id,text:coverLetter.title}))} onChange={(e,item)=>formik.setFieldValue("coverLetter",item.value)} onBlur={formik.handleBlur}/>
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Eğitim Bilgileri</Label>
          <Form.Field>
            <label>Okul Adı</label>
            <Form.Input id="institutionName" name="institutionName" fluid placeholder="Okul Adı" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.institutionName}/>
            {formik.touched.institutionName && formik.errors.institutionName ? <div>{formik.errors.institutionName}</div> : null}
            <label>Bölüm</label>
            <Form.Input id="department" name="department" fluid placeholder="Bölüm" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.department}/>
            {formik.touched.department && formik.errors.department ? <div>{formik.errors.department}</div> : null}
            <Form.Group widths="equal">
              <Form.Input id="startingDate" name="startingDate"
                type="month"
                fluid
                label="Başlangıç Tarihi"
                placeholder="Başlangıç Tarihi"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.startingDate}
              />
              {formik.touched.startingDate && formik.errors.startingDate ? <div>{formik.errors.startingDate}</div> : null}
              <Form.Input id="completionDate" name="completionDate"
                type="month"
                fluid
                label="Bitiş Tarihi"
                placeholder="Bitiş Tarihi"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.completionDate}
              />
            </Form.Group>
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>İş Deneyimleri</Label>
          <Form.Field>
            <label>İş Yeri Adı</label>
            <Form.Input id="companyName" name="companyName" fluid placeholder="İş Yeri Adı" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.companyName}/>
            {formik.touched.companyName && formik.errors.companyName ? <div>{formik.errors.companyName}</div> : null}
            <label>Pozisyon</label>
            <Form.Input id="title" name="title" fluid placeholder="Pozisyon" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title}/>
            {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
            <Form.Group widths="equal">
              <Form.Input id="startDate" name="startDate"
                type="month"
                fluid
                label="Başlangıç Tarihi"
                placeholder="Başlangıç Tarihi"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.startDate}
              />
              {formik.touched.startDate && formik.errors.startDate ? <div>{formik.errors.startDate}</div> : null}
              <Form.Input id="endDate" name="endDate"
                type="month"
                fluid
                label="Bitiş Tarihi"
                placeholder="Bitiş Maaş"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endDate}
              />
            </Form.Group>
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Yabancı Diller</Label>
          <Form.Field>
            <Form.Group widths="equal">
              <Form.Select id="languages" name="languages"
                fluid
                label="Yabancı Dil"
                placeholder="Yabancı Dil"
                options = {languages.map(language => ({key:language.id,value:language.id,text:language.name}))}
                onChange={(e,item)=>formik.setFieldValue("languages",item.value)} onBlur={formik.handleBlur}
              />
              {formik.touched.languages && formik.errors.languages ? <div>{formik.errors.languages}</div> : null}
              <Form.Select id="level" name="level"
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
                onChange={(e,item)=>formik.setFieldValue("level",item.value)} onBlur={formik.handleBlur}
              />
              {formik.touched.level && formik.errors.level ? <div>{formik.errors.level}</div> : null}
            </Form.Group>
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Sosyal Platformlar</Label>
          <Form.Field>
          <br></br>
            <Form.Group widths="equal">
              <Form.Select id="socialPlatform" name="socialPlatform" options={socialPlatforms.map(socialPlatform => ({key:socialPlatform.id,value:socialPlatform.id,text:socialPlatform.name}))} onChange={(e,item)=>formik.setFieldValue("socialPlatform",item.value)} onBlur={formik.handleBlur}/>
              {formik.touched.socialPlatform && formik.errors.socialPlatform ? <div>{formik.errors.socialPlatform}</div> : null}
              <Form.Input id="profileName" name="profileName" type="text" fluid placeholder="Profil Adı" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.profileName}/>
              {formik.touched.profileName && formik.errors.profileName ? <div>{formik.errors.profileName}</div> : null}
            </Form.Group>
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Yetenekler</Label>
          <Form.Field>
            <Form.TextArea id="skills" name="skills" label="Yetenekler" placeholder="Yetenekler" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.skills}/>
          </Form.Field>
          <Button type="submit">Kaydet</Button>
        </Form>
      </Segment>
    </div>
  );
}
