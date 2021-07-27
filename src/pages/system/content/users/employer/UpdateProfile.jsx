import React from "react";
import { Button } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import EmployerUserService from "../../../../../services/employerUserService";
import HRMSInput from "../../../../../utilities/customFormControls/HRMSInput";

export default function Register() {

  Yup.addMethod(Yup.string,"checkCompanyEmail",(website,errorMessage) => {
    let companyEmailRegex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + website.toString().replace("wwww.","") + "$";
    return Yup.string().matches(companyEmailRegex);
  });

  const initialValues = {
    companyName: "",
    phoneNumber: "",
    website: ""
  }

  const validationSchema = Yup.object({
    companyName: Yup.string()
    .max(255,"En fazla 255 karakter olmalı"),
    phoneNumber: Yup.string()
    .max(11,"En fazla 11 karakter olmalı")
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"Geçersiz telefon numarası"),
    website: Yup.string()
    .max(253,"En fazla 253 karakter olmalı")
    .matches(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,"Geçersiz website adresi")
  })

  const onSubmit = values => {
    let employerUserService = new EmployerUserService();
    let data = {
        companyName: values.companyName,
        employerUser: {
          id: 32
        },
        phoneNumber: values.phoneNumber,
        website: values.website
      };
    employerUserService.update(data);
  }

  return (
    <div>
      <h1>İşveren Kayıt Formu</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="ui form"> 
          <HRMSInput fluid type="text" id="companyName" name="companyName" placeholder="Şirket Adı" label="Şirket Adı"/>
          <HRMSInput fluid type="text" id="website" name="website" placeholder="Website" label="Website" />
          <HRMSInput fluid type="tel" id="phoneNumber" name="phoneNumber" placeholder="Telefon Numarası" label="Telefon Numarası" />
          <Button type="submit">Kaydet</Button>
        </Form>
      </Formik>
    </div>
  );
}
