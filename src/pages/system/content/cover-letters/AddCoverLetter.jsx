import React from "react";
import { Button } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import CoverLetterService from "../../../../services/coverLetterService";
import HRMSInput from "../../../../utilities/customFormControls/HRMSInput";
import HRMSTextArea from "../../../../utilities/customFormControls/HRMSTextArea";

export default function AddCoverLetter() {

  const initialValues = {
    title: "",
    body: ""
  };

  const validationSchema = Yup.object({
    title: Yup.string()
    .max(50,"En fazla 50 karakter olmalı")
    .required("Gerekli"),
    body: Yup.string()
    .max(4000,"En fazla 4000 karakter olmalı")
    .required("Gerekli")
  });

  const onSubmit = values => {
    let coverLetterService = new CoverLetterService();
    let data = {
      jobSeekerUser: {
        id: 1
      },
      title: values.title,
      body: values.body
    }
    coverLetterService.addCoverLetter(data);
  };

  return (
    <div>
      <h1>Önyazı Ekle</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="ui form">
          <HRMSInput fluid type="text" id="title" name="title" placeholder="Başlık" label="Başlık" />
          <HRMSTextArea id="body"  name="body" label="Önyazı" placeholder="Önyazı" />
          <Button type="submit">Kaydet</Button>
        </Form>
      </Formik>
    </div>
  );
}
