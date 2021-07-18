import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import JobSeekerUserService from "../../../../../services/jobSeekerUserService";
import * as Yup from 'yup';

export default function Register() {

  const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repassword: "",
        nationalIdentity: "",
        yearOfBirth: ""
      },
      validationSchema: Yup.object({
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
        .required("Gerekli"),
        yearOfBirth: Yup.string()
        .max(4,"En fazla 4 karakter olmalı")
        .required("Gerekli")
      }),
      onSubmit: values => {
        delete values.repassword;
        let jobSeekerUserService = new JobSeekerUserService();
        jobSeekerUserService.register(values);
      }
  });

  return (
    <div>
      <h1>İş Arayan Kayıt Formu</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label>Ad</label>
          <input type="text" id="firstName" name="firstName" placeholder="Ad" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName}/>
          {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
        </Form.Field>
        <Form.Field>
          <label>Soyad</label>
          <input type="text" id="lastName" name="lastName" placeholder="Soyad" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName}/>
          {formik.touched.lastName &&formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
        </Form.Field>
        <Form.Field>
          <label>E-posta</label>
          <input type="email" id="email" name="email" placeholder="E-posta" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </Form.Field>
        <Form.Field>
          <label>Şifre</label>
          <input type="password" id="password" name="password" placeholder="Parola" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
          {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </Form.Field>
        <Form.Field>
          <label>Şifre Tekrar</label>
          <input type="password"  id="repassword" name="repassword" placeholder="Parola Tekrar" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.repassword}/>
          {formik.touched.repassword && formik.errors.repassword ? <div>{formik.errors.repassword}</div> : null}
        </Form.Field>
        <Form.Field>
          <label>Kimlik Numarası</label>
          <input type="text" id="nationalIdentity" name="nationalIdentity" placeholder="Kimlik Numarası" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nationalIdentity}/>
          {formik.touched.nationalIdentity && formik.errors.nationalIdentity ? <div>{formik.errors.nationalIdentity}</div> : null}
        </Form.Field>
        <Form.Field>
          <label>Doğum Yılı</label>
          <input type="text" id="yearOfBirth" name="yearOfBirth" placeholder="Doğum Yılı" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.yearOfBirth}/>
          {formik.touched.yearOfBirth && formik.errors.yearOfBirth ? <div>{formik.errors.yearOfBirth}</div> : null}
        </Form.Field>
        <Button type="submit">Kaydol</Button>
      </Form>
    </div>
  );
}
