import React from "react";
import { Button, Form } from "semantic-ui-react";

export default function Register() {
  return (
    <div>
      <h1>İşveren Kayıt Formu</h1>
      <Form>
        <Form.Field>
          <label>Şirket Adı</label>
          <input type="text" placeholder="Şirket Adı" />
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
          <label>Telefon Numarası</label>
          <input type="tel" placeholder="Telefon Numarası" />
        </Form.Field>
        <Form.Field>
          <label>Website</label>
          <input type="url" placeholder="website" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
