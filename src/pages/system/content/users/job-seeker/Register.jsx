import React from "react";
import { Button } from "semantic-ui-react";
import { Formik, Form } from "formik";
import JobSeekerUserService from "../../../../../services/jobSeekerUserService";
import * as Yup from 'yup';
import HRMSInput from "../../../../../utilities/customFormControls/HRMSInput";

export default function Register() {

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
    nationalIdentity: "",
    yearOfBirth: ""
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
    .max(50,"En fazla 50 karakter olmalı")
    .required("Gerekli"),
    lastName: Yup.string()
    .max(50,"En fazla 50 karakter olmalı")
    .required("Gerekli"),
    email: Yup.string()
    .email("Geçersiz email adresi")
    .required("Gerekli"),
    password: Yup.string()
    .required("Gerekli")
    .min(6,"Parola en az 6 karakter olmalı"),
    repassword: Yup.string()
    .required("Gerekli")
    .min(6,"Parola en az 6 karakter olmalı")
    .oneOf([Yup.ref("password"),null],"Parolalar eşleşmiyor."),
    nationalIdentity: Yup.string()
    .max(11,"En fazla 11 karakter olmalı")
    .required("Gerekli")
    .matches(/^\d+$/,"Kimlik numarası pozitif bir sayısal değer olmalı"),
    yearOfBirth: Yup.string()
    .max(4,"En fazla 4 karakter olmalı")
    .required("Gerekli")
    .matches(/^\d+$/,"Doğum yılı pozitif bir sayısal değer olmalı")
  });

  const onSubmit = values => {
    delete values.repassword;
    let jobSeekerUserService = new JobSeekerUserService();
    jobSeekerUserService.register(values);
  };

  return (
    <div>
      <h1>İş Arayan Kayıt Formu</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="ui form">
          <HRMSInput fluid type="text" id="firstName" name="firstName" placeholder="Ad" label="Ad" />
          <HRMSInput fluid type="text" id="lastName" name="lastName" placeholder="Soyad" label="Soyad" />
          <HRMSInput fluid type="email" id="email" name="email" placeholder="E-posta" label="E-posta" autoComplete="username"/>
          <HRMSInput fluid type="password" id="password" name="password" placeholder="Parola" label="Parola" autoComplete="new-password"/>
          <HRMSInput fluid type="password" id="repassword" name="repassword" placeholder="Parola Tekrar" label="Parola Tekrar" autoComplete="new-password"/>
          <HRMSInput fluid type="text" id="nationalIdentity" name="nationalIdentity" placeholder="Kimlik Numarası" label="Kimlik Numarası" />
          <HRMSInput fluid type="text" id="yearOfBirth" name="yearOfBirth" placeholder="Doğum Yılı" label="Doğum Yılı" />
          <Button type="submit">Kaydol</Button>
        </Form>
      </Formik>
    </div>
  );
}
