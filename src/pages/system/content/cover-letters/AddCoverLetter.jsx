import React from "react";
import { Form,Button } from "semantic-ui-react";

export default function AddCoverLetter() {
  return (
    <div>
      <h1>Önyazı Ekle</h1>
      <Form>
        <Form.Field>
          <Form.TextArea label="Önyazı" placeholder="Önyazı" />
        </Form.Field>
        <Button type="submit">Kaydet</Button>
      </Form>
    </div>
  );
}
