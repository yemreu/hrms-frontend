import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Icon, Label, Segment } from 'semantic-ui-react';
import JobService from "../../../../services/jobService";

export default function JobDetail() {
    let { id } = useParams();

    const [job,setJob] = useState({});

    const addToFavorite = (jobId) => {
      let jobService = new JobService();
      let data = {
        jobSeekerUser: {
          id: 3
        },
        job: {
          id: jobId
        }
      };
      jobService.addToFavorite(data);
    }
  
    useEffect(() => {
      let jobService = new JobService();
      jobService.getJob(id).then(result => setJob(result.data.data));
    }, [id]);

    return (
        <div>
          <Segment>
						<Button type="button" icon labelPosition="left" onClick={() => addToFavorite(job.id)}><Icon name="star"/>Favorilere Ekle</Button><br></br><br></br>
            <Label>Şirket Adı</Label><br></br><br></br>
            {job.companyName}<br></br><br></br>
            <Label>İş Pozisyonu</Label><br></br><br></br>
            {job.jobTitle}<br></br><br></br>
            <Label>Şehir</Label><br></br><br></br>
            {job.city}<br></br><br></br>
						<Label>İş Tanımı</Label><br></br><br></br>
            {job.description}<br></br><br></br>
						<Label>Maaş Aralığı</Label><br></br><br></br>
            {job.minSalary} - {job.maxSalary}<br></br><br></br>
						<Label>Açık Pozisyon Adedi</Label><br></br><br></br>
            {job.vacancy}<br></br><br></br>
						<Label>Çalışma Türü</Label><br></br><br></br>
            {job.remote?"Uzaktan":"İş yerinde"}<br></br><br></br>
						<Label>Çalışma Zamanı</Label><br></br><br></br>
            {job.fullTime?"Tam Zamanlı":"Yarı Zamanlı"}<br></br><br></br>
						<Label>Yayın Tarihi</Label><br></br><br></br>
            {job.postingDate}<br></br><br></br>
						<Label>Son Başvuru Tarihi</Label><br></br><br></br>
            {job.lastApplicationDate}<br></br><br></br>
        </Segment>
      </div>
    )
}
