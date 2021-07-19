import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import CityService from "../../../../services/cityService";
import JobTitleService from "../../../../services/jobTitleService";
import JobService from "../../../../services/jobService";
import { useFormik } from "formik";
import * as Yup from 'yup';

export default function AddJob() {
  const [jobTitles, setJobTitles] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {
    let  jobTitleService = new JobTitleService();
    let  cityService = new CityService();
    jobTitleService.getJobTitles().then(result => setJobTitles(result.data.data));
    cityService.getCities().then(result => setCities(result.data.data));
  }, [])

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      description: "",
      fullTime: false,
      remote: false,
      city: "",
      minSalary: "",
      maxSalary: "",
      vacancy: "",
      lastApplicationDate: ""
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string()
      .required("Gerekli"),
      description: Yup.string()
      .required("Gerekli"),
      city: Yup.number()
      .required("Gerekli"),
      minSalary: Yup.number()
      .positive("Pozitif değer giriniz")
      .typeError("Sayısal değer giriniz")
      .required("Gerekli"),
      maxSalary: Yup.number()
      .positive("Pozitif değer giriniz")
      .typeError("Sayısal değer giriniz")
      .required("Gerekli"),
      vacancy: Yup.number()
      .positive("Pozitif değer giriniz")
      .typeError("Sayısal değer giriniz")
      .required("Gerekli"),
      lastApplicationDate: Yup.date()
      .required("Gerekli"),
    }),
    onSubmit: values => {
      let jobService = new JobService();
      jobService.addJob(values);
    }
});

  return (
    <div>
      <h1>İş İlanı Formu</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Select id="jobTitle" name="jobTitle" fluid label="İş Pozisyonu" placeholder="İş Pozisyonu" options={jobTitles.map(jobTitle => ({key:jobTitle.id,value:jobTitle.id,text:jobTitle.title}))} onChange={(e,item)=>formik.setFieldValue("jobTitle",item.value)} onBlur={formik.handleBlur}/>
        {formik.touched.jobTitle && formik.errors.jobTitle ? <div>{formik.errors.jobTitle}</div> : null}
        <Form.TextArea id="description" name="description" label="İş Tanımı" placeholder="İş Tanımı" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description}/>
        {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null}
        <Form.Group widths="equal">
          <Form.Checkbox id="fullTime" name="fullTime" toggle label="Full Time" onChange={(e) => formik.setFieldValue("fullTime",!formik.values.fullTime)} onBlur={formik.handleBlur}/>
          <Form.Checkbox id="remote" name="remote" toggle label="Remote" onChange={(e) => formik.setFieldValue("remote",!formik.values.remote)} onBlur={formik.handleBlur}/>
        </Form.Group>
        <Form.Select id="city" name="city" fluid label="Şehir" placeholder="Şehir" options={cities.map(city => ({key:city.code,value:city.code,text:city.name}))} onChange={(e,item)=>formik.setFieldValue("city",item.value)} onBlur={formik.handleBlur}/>
        {formik.touched.city && formik.errors.city ? <div>{formik.errors.city}</div> : null}
        <Form.Group widths="equal">
          <Form.Input id="minSalary" name="minSalary" fluid label="En Düşük Maaş" placeholder="En Düşük Maaş" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.minSalary}/>
          {formik.touched.minSalary && formik.errors.minSalary ? <div>{formik.errors.minSalary}</div> : null}
          <Form.Input id="maxSalary" name="maxSalary" fluid label="En Yüksek Maaş" placeholder="En Yüksek Maaş" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.maxSalary}/>
          {formik.touched.maxSalary && formik.errors.maxSalary ? <div>{formik.errors.maxSalary}</div> : null}
        </Form.Group>
        <Form.Field>
          <label>Açık Pozisyon Adedi</label>
          <input id="vacancy" name="vacancy" type="text" placeholder="Açık Pozisyon Adedi" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.vacancy}/>
          {formik.touched.vacancy && formik.errors.vacancy ? <div>{formik.errors.vacancy}</div> : null}
        </Form.Field>
        <Form.Field>
          <label>Son Başvuru Tarihi</label>
          <input id="lastApplicationDate" name="lastApplicationDate" type="date" placeholder="Son Başvuru Tarihi" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastApplicationDate}/>
          {formik.touched.lastApplicationDate && formik.errors.lastApplicationDate ? <div>{formik.errors.lastApplicationDate}</div> : null}
        </Form.Field>
        <Button type="submit">Kaydet</Button>
      </Form>
    </div>
  );
}
