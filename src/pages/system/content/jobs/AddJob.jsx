import React, { useState, useEffect } from "react";
import { Button, FormGroup } from "semantic-ui-react";
import CityService from "../../../../services/cityService";
import JobTitleService from "../../../../services/jobTitleService";
import JobService from "../../../../services/jobService";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import HRMSSelect from "../../../../utilities/customFormControls/HRMSSelect";
import HRMSTextArea from "../../../../utilities/customFormControls/HRMSTextArea";
import HRMSCheckbox from "../../../../utilities/customFormControls/HRMSCheckbox";
import HRMSInput from "../../../../utilities/customFormControls/HRMSInput";

export default function AddJob() {
  const [jobTitles, setJobTitles] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {
    let  jobTitleService = new JobTitleService();
    let  cityService = new CityService();
    jobTitleService.getJobTitles().then(result => setJobTitles(result.data.data));
    cityService.getCities().then(result => setCities(result.data.data));
  }, [])

  const initialValues = {
    jobTitle: 0,
    description: "",
    fullTime: false,
    remote: false,
    city: 0,
    minSalary: "",
    maxSalary: "",
    vacancy: 0,
    lastApplicationDate: ""
  };

  const validationSchema = Yup.object({
    jobTitle: Yup.object().shape({
      id: Yup.number()
      .required("Gerekli"),
    }),
    description: Yup.string()
    .required("Gerekli"),
    city: Yup.object().shape({
      code: Yup.number()
      .required("Gerekli")
    }),
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
    .min(new Date(),"Bu tarih seçilemez")
    .required("Gerekli"),
  });

  const onSubmit = values => {
    let jobService = new JobService();
    let data = {
      employerUser: {
        id: 19
      },
      jobTitle: values.jobTitle,
      description: values.description,
      fullTime: values.fullTime,
      remote: values.remote,
      city: values.city,
      minSalary: values.minSalary,
      maxSalary: values.maxSalary,
      vacancy: parseInt(values.vacancy,10),
      lastApplicationDate: values.lastApplicationDate
    }
    jobService.addJob(data);
  };

  return (
    <div>
      <h1>İş İlanı Formu</h1> 
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        { props => (
          <Form className="ui form">
            <HRMSSelect fluid id="jobTitle.id" name="jobTitle.id" placeholder="İş Pozisyonu" label="İş Pozisyonu" options={jobTitles.map(jobTitle => ({key:jobTitle.id,value:jobTitle.id,text:jobTitle.title}))} formikProps={props}/>
            <HRMSTextArea id="description"  name="description" label="İş Tanımı" placeholder="İş Tanımı"/>
            <FormGroup widths="equal">
              <HRMSCheckbox toggle id="fullTime" name="fullTime" label="Full Time" formikProps={props}/>
              <HRMSCheckbox toggle id="remote" name="remote" label="Remote" formikProps={props}/>
            </FormGroup>
            <HRMSSelect fluid id="city.code" name="city.code" placeholder="Şehir" options={cities.map(city => ({key:city.code,value:city.code,text:city.name}))} formikProps={props}/>
            <FormGroup widths="equal">
              <HRMSInput fluid type="text" id="minSalary" name="minSalary" placeholder="En Düşük Maaş" label="En Düşük Maaş" />
              <HRMSInput fluid type="text" id="maxSalary" name="maxSalary" placeholder="En Yüksek Maaş" label="En Yüksek Maaş" />
            </FormGroup>
            <HRMSInput fluid type="text" id="vacancy" name="vacancy" placeholder="Açık Pozisyon Adedi" label="Açık Pozisyon Adedi" />
            <HRMSInput fluid type="date" id="lastApplicationDate" name="lastApplicationDate" placeholder="Son Başvuru Tarihi" label="Son Başvuru Tarihi" />
            <Button type="submit">Kaydet</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
