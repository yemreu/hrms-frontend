import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import EmployerUserService from "../../../../../services/employerUserService";

export default function Register() {

  Yup.addMethod(Yup.string,"checkCompanyEmail",(website,errorMessage) => {
    let companyEmailRegex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + website.toString().replace("wwww.","") + "$";
    return Yup.string().matches(companyEmailRegex);
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      password: "",
      repassword: "",
      phoneNumber: "",
      website: ""
    },
    validationSchema: Yup.object({
      companyName: Yup.string()
      .max(255,"En fazla 255 karakter olmalı")
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
      phoneNumber: Yup.string()
      .max(11,"En fazla 11 karakter olmalı")
      .required("Gerekli")
      .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"Geçersiz telefon numarası"),
      website: Yup.string()
      .max(253,"En fazla 253 karakter olmalı")
      .matches(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,"Geçersiz website adresi")
      .required("Gerekli")
    }),
    onSubmit: values => {
      delete values.repassword;
      let employerUserService = new EmployerUserService();
      employerUserService.register(values);
    }
});

  return (
    <div>
      <h1>İşveren Kayıt Formu</h1>
      <Form onSubmit={formik.handleSubmit}> 
        <Form.Field>
          <label>Şirket Adı</label>
          <input type="text" id="companyName" name="companyName" placeholder="Şirket Adı" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.companyName}/>
          {formik.touched.companyName && formik.errors.companyName ? <div>{formik.errors.companyName}</div> : null}
        </Form.Field>
        <Form.Field>
          <label>E-posta</label>
          <input type="email" id="email" name="email" placeholder="E-posta" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </Form.Field>
        <Form.Field>
          <label>Şifre</label>
          <input type="password" id="password" name="password" placeholder="Şifre" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
          {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </Form.Field>
        <Form.Field>
          <label>Şifre Tekrar</label>
          <input type="password" id="repassword" name="repassword" placeholder="Şifre Tekrar" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.repassword}/>
          {formik.touched.repassword && formik.errors.repassword ? <div>{formik.errors.repassword}</div> : null}
        </Form.Field>
        <Form.Field>
          <label>Telefon Numarası</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Telefon Numarası" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phoneNumber}/>
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div>{formik.errors.phoneNumber}</div> : null}
        </Form.Field>
        <Form.Field>
          <label>Website</label>
          <input type="text" id="website" name="website" placeholder="website" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.website}/>
          {formik.touched.website && formik.errors.website ? <div>{formik.errors.website}</div> : null}
        </Form.Field>
        <Button type="submit">Kaydol</Button>
      </Form>
    </div>
  );
}
