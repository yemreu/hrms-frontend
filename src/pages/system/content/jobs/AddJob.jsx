import React from "react";
import { Button, Form } from "semantic-ui-react";

export default function AddJob() {
  return (
    <div>
      <h1>İş İlanı Formu</h1>
      <Form>
        <Form.Select fluid label="İş Pozisyonu" placeholder="İş Pozisyonu" />
        <Form.TextArea label="İş Tanımı" placeholder="İş Tanımı" />
        <Form.Select fluid label="Şehir" placeholder="Şehir" />
        <Form.Group widths="equal">
          <Form.Input fluid label="En Düşük Maaş" placeholder="En Düşük Maaş" />
          <Form.Input fluid label="En Yüksek Maaş" placeholder="En Yüksek Maaş" />
        </Form.Group>
        <Form.Field>
          <label>Açık Pozisyon Adedi</label>
          <input type="text" placeholder="Açık Pozisyon Adedi" />
        </Form.Field>
        <Form.Field>
          <label>Son Başvuru Tarihi</label>
          <input type="date" placeholder="Son Başvuru Tarihi" />
        </Form.Field>
        <Button type="submit">Kaydet</Button>
      </Form>
    </div>
  );
}
