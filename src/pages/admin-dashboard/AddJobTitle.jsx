import React from "react";
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import JobTitleService from "../../services/jobTitleService";

export default function AddJobTitle() {

  const formik = useFormik({
    initialValues: {
      title: ""
    },
    validationSchema: Yup.object({
      title: Yup.string()
      .max(255,"En fazla 255 karakter olmalı")
      .required("Gerekli")
    }),
    onSubmit: values => {
      let jobTitleService = new JobTitleService();
      jobTitleService.addTitle(values);
    }
});

  return (
    <div>
      <h1>İş Pozisyonu Ekle</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label>İş Pozisyonu</label>
          <input type="text" id="title" name="title" placeholder="iş Pozisyonu" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title}/>
          {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
        </Form.Field>
        <Button type="submit">Kaydet</Button>
      </Form>
    </div>
  );
}
