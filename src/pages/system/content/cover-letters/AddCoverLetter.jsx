import React from "react";
import { Form,Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import CoverLetterService from "../../../../services/coverLetterService";

export default function AddCoverLetter() {

  const formik = useFormik({
    initialValues: {
      title: "",
      body: ""
    },
    validationSchema: Yup.object({
      title: Yup.string()
      .max(50,"En fazla 50 karakter olmalı")
      .required("Gerekli"),
      body: Yup.string()
      .max(4000,"En fazla 4000 karakter olmalı")
      .required("Gerekli")
    }),
    onSubmit: values => {
      delete values.repassword;
      let coverLetterService = new CoverLetterService();
      coverLetterService.addCoverLetter(values);
    }
});

  return (
    <div>
      <h1>Önyazı Ekle</h1>
      <Form>
      <Form.Field>
          <label>Başlık</label>
          <input type="text" id="title" name="title" placeholder="Ön Yazı Başlığı" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title}/>
          {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
        </Form.Field>
        <Form.Field>
          <Form.TextArea id="body" name="body" label="Önyazı" placeholder="Önyazı" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.body} />
          {formik.touched.body && formik.errors.body ? <div>{formik.errors.body}</div> : null}
        </Form.Field>
        <Button type="submit">Kaydet</Button>
      </Form>
    </div>
  );
}
