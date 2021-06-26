import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import JobSeekerUserService from "../../../../../services/jobSeekerUserService";

export default function Register() {
  const validate = values => {
    const errors = {};
    if(!values.firstName){
      errors.firstName = "Gerekli";
    }else if(values.firstName.length > 50){
      errors.firstName = "En fazla 50 karakter olmalı";
    }

    if(!values.lastName){
      errors.lastName = "Gerekli";
    }else if(values.lastName.length > 50){
      errors.lastName = "En fazla 50 karakter olmalı";
    }

    if(!values.email){
      errors.email = "Gerekli";
    }else if(values.email.length > 320){
      errors.email = "En fazla 320 karakter olmalı";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = "Geçersiz email adresi";
    }

    if(!values.password){
      errors.password = "Gerekli";
    }

    if(!values.repassword){
      errors.repassword = "Gerekli";
    }else if(values.password !== values.repassword){
      errors.repassword = "Parolalar eşleşmiyor.";
    }

    if(!values.nationalIdentity){
      errors.nationalIdentity = "Gerekli";
    }else if(values.nationalIdentity.length > 11){
      errors.nationalIdentity = "En fazla 11 karakter olmalı";
    }

    if(!values.yearOfBirth){
      errors.yearOfBirth = "Gerekli";
    }else if(values.yearOfBirth.length > 4){
      errors.yearOfBirth = "En fazla 4 karakter olmalı";
    }

    return errors;
  }

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
      validate,
      onSubmit: values => {
        delete values.repassword;
        let jobSeekerUserService = new JobSeekerUserService();
        jobSeekerUserService.register(values).then(result => (<div>{result.data.message}</div>));
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
