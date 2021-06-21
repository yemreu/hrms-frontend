import React from "react";
import { Button, Form } from 'semantic-ui-react';

export default function AddJobTitle() {
  return (
    <div>
      <h1>İş Pozisyonu Ekle</h1>
      <Form>
        <Form.Field>
          <label>İş Pozisyonu</label>
          <input placeholder="iş Pozisyonu" />
        </Form.Field>
        <Button type="submit">Kaydet</Button>
      </Form>
    </div>
  );
}
