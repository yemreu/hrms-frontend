import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, FormSelect, Menu } from "semantic-ui-react";
import CityService from "../../../../../services/cityService";
import { filterJob, resetFilter } from "../../../../../store/actions/jobFilterActions";

export default function Filters() {
  const [cities, setCities] = useState([])
  const [filter,setFilter] = useState({});
  const dispatch = useDispatch();
  
  useEffect(() => {
    let  cityService = new CityService();
    cityService.getCities().then(result => setCities(result.data.data));
  }, [])

  const handleFilter = () => {
    dispatch(filterJob(filter));
  };
  
  const handleReset = () => {
    dispatch(resetFilter());
  };

  return (
    <div>
      <Menu vertical>
      <h4>Filtrele</h4>
        <Menu.Item>
          <Menu.Header>Şehir</Menu.Header>
          <Menu.Menu>
            <Menu.Item><FormSelect fluid id="city" name="city" options={cities.map(city => ({key:city.code,value:city.code,text:city.name}))} onChange={(e,item) => setFilter({...filter,cityCode:item.value})}/></Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Çalışma Türü</Menu.Header>
          <Menu.Menu>
            <Menu.Item><FormSelect fluid id="city" name="city" options={[{key:0,value:true,text:"Tam Zamanlı"},{key:1,value:false,text:"Yarı Zamanlı"}]} onChange={(e,item) => setFilter({...filter,fullTime:item.value})}/></Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Button type="button" onClick={() => handleFilter()}>Filtrele</Button><Button type="button" onClick={() => handleReset()}>Resetle</Button>
        </Menu.Item>
      </Menu>
    </div>
  );
}
