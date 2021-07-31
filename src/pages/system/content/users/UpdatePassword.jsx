import { Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import UserService from '../../../../services/userService';
import HRMSInput from '../../../../utilities/customFormControls/HRMSInput';

export default function UpdatePassword() {
    const initialValues = {
        password: "",
        repassword: ""
      };

      const validationSchema = Yup.object({
        password: Yup.string()
        .required("Gerekli")
        .min(6,"Parola en az 6 karakter olmalı"),
        repassword: Yup.string()
        .required("Gerekli")
        .min(6,"Parola en az 6 karakter olmalı")
        .oneOf([Yup.ref("password"),null],"Parolalar eşleşmiyor.")
      });

      const onSubmit = values => {
        let userService = new UserService();
        let data = {
          id: 35,
          password: values.password
        }
        userService.updatePassword(data);
      };

    return (
      <div>
        <h1>Email Güncelle</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className="ui form">
              <HRMSInput fluid type="password" id="password" name="password" placeholder="Parola" label="Parola" autoComplete="new-password"/>
              <HRMSInput fluid type="password" id="repassword" name="repassword" placeholder="Parola Tekrar" label="Parola Tekrar" autoComplete="new-password"/>
              <Button type="submit">Kaydet</Button>
            </Form>
          </Formik>
      </div>
    )
}
