import React from "react";
import { Button, Form, Divider, Segment, Label,Image } from "semantic-ui-react";

export default function EditCv() {
  return (
    <div>
      <h1>Cv Düzenle</h1>
      <Segment>
        <Form>
          <Label>Fotoğraf</Label>
          <Form.Field>
            <br></br>
            <Image src="http://res.cloudinary.com/dor1iaolp/image/upload/v1623678802/hrms/ezwzm6xwh9fy5uean4ty.png" size="medium"/>
            <Form.Input type="file" />
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Ön Yazı</Label>
          <Form.Field>
          <br></br>
            <Form.Select />
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Eğitim Bilgileri</Label>
          <Form.Field>
            <label>Okul Adı</label>
            <Form.Input fluid placeholder="Okul Adı" />
            <Form.Group widths="equal">
              <Form.Input
                type="month"
                fluid
                label="Başlangıç Tarihi"
                placeholder="Başlangıç Tarihi"
              />
              <Form.Input
                type="month"
                fluid
                label="Bitiş Tarihi"
                placeholder="Bitiş Maaş"
              />
            </Form.Group>
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>İş Deneyimleri</Label>
          <Form.Field>
            <label>İş Yeri Adı</label>
            <Form.Input fluid placeholder="İş Yeri Adı" />
            <label>Pozisyon</label>
            <Form.Input fluid placeholder="Pozisyon" />
            <Form.Group widths="equal">
              <Form.Input
                type="month"
                fluid
                label="Başlangıç Tarihi"
                placeholder="Başlangıç Tarihi"
              />
              <Form.Input
                type="month"
                fluid
                label="Bitiş Tarihi"
                placeholder="Bitiş Maaş"
              />
            </Form.Group>
          </Form.Field>
          <Divider horizontal></Divider>
          <Form.Field>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                label="Yabancı Dil"
                placeholder="Yabancı Dil"
              />
              <Form.Select
                fluid
                label="Seviye"
                placeholder="Seviye"
                options={[
                  { key: "1", value: "1", text: "1" },
                  { key: "2", value: "2", text: "2" },
                  { key: "3", value: "3", text: "3" },
                  { key: "4", value: "4", text: "4" },
                  { key: "5", value: "5", text: "5" },
                ]}
              />
            </Form.Group>
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Sosyal Platformlar</Label>
          <Form.Field>
          <br></br>
            <Form.Group widths="equal">
              <Form.Select />
              <Form.Input type="text" fluid placeholder="Profil Adı" />
            </Form.Group>
          </Form.Field>
          <Divider horizontal></Divider>
          <Label>Yetenekler</Label>
          <Form.Field>
            <Form.TextArea label="Yetenekler" placeholder="Yetenekler" />
          </Form.Field>
          <Button type="submit">Kaydet</Button>
        </Form>
      </Segment>
    </div>
  );
}
