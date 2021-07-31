import { Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import UserService from '../../../../services/userService';
import HRMSInput from '../../../../utilities/customFormControls/HRMSInput';

export default function UpdateEmail() {
    const initialValues = {
        email: ""
      };

      const validationSchema = Yup.object({
        email: Yup.string()
        .email("Geçersiz email adresi")
        .required("Gerekli")
      });

      const onSubmit = values => {
        let userService = new UserService();
        let data = {
          id: 35,
          email: values.email
        }
        userService.updateEmail(data);
      };

    return (
      <div>
        <h1>Email Güncelle</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className="ui form">
              <HRMSInput fluid type="email" id="email" name="email" placeholder="E-posta" label="E-posta" autoComplete="username"/>
              <Button type="submit">Kaydet</Button>
            </Form>
          </Formik>
      </div>
    )
}
