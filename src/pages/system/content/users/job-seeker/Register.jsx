import React from "react";
import { Button, Form } from "semantic-ui-react";

export default function Register() {
  return (
    <div>
      <h1>İş Arayan Kayıt Formu</h1>
      <Form>
        <Form.Field>
          <label>Ad</label>
          <input type="text" placeholder="Ad" />
        </Form.Field>
        <Form.Field>
          <label>Soyad</label>
          <input type="text" placeholder="Soyad" />
        </Form.Field>
        <Form.Field>
          <label>E-posta</label>
          <input type="email" placeholder="E-posta" />
        </Form.Field>
        <Form.Field>
          <label>Şifre</label>
          <input type="password" placeholder="Şifre" />
        </Form.Field>
        <Form.Field>
          <label>Şifre Tekrar</label>
          <input type="password" placeholder="Şifre Tekrar" />
        </Form.Field>
        <Form.Field>
          <label>Kimlik Numarası</label>
          <input type="text" placeholder="Kimlik Numarası" />
        </Form.Field>
        <Form.Field>
          <label>Doğum Yılı</label>
          <input type="text" placeholder="Doğum Yılı" />
        </Form.Field>
        <Button type="submit">Kaydol</Button>
      </Form>
    </div>
  );
}
