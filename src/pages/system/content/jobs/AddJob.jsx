import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import CityService from "../../../../services/cityService";
import JobTitleService from "../../../../services/jobTitleService";

export default function AddJob() {
  const [jobTitles, setJobTitles] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {
    let  jobTitleService = new JobTitleService();
    let  cityService = new CityService();
    jobTitleService.getJobTitles().then(result => setJobTitles(result.data.data));
    cityService.getCities().then(result => setCities(result.data.data));
  }, [])

  return (
    <div>
      <h1>İş İlanı Formu</h1>
      <Form>
        <Form.Select fluid label="İş Pozisyonu" placeholder="İş Pozisyonu" options={jobTitles.map(jobTitle => ({key:jobTitle.id,value:jobTitle.title,text:jobTitle.title}))}/>
        <Form.TextArea label="İş Tanımı" placeholder="İş Tanımı" />
        <Form.Select fluid label="Şehir" placeholder="Şehir" options={cities.map(city => ({key:city.code,value:city.name,text:city.name}))}/>
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
