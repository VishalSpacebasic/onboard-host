import React, { useEffect, useState } from "react";
import { getServices } from "../../../api/APIS/wizard-api";
import ServiceCard from "./ServiceCard";

type Props = { masterServices; masterServiceSetter };

function ServiceSelector({ masterServiceSetter, masterServices }: Props) {
  const [services, setServices] = useState<any>([]);
  useEffect(() => {
    getServices().then(({ result }) => {
      console.log(result);
      setServices(result);
    });
  }, []);
  const addToMaster = (data, method) => {
    if (method == "add") {
      masterServiceSetter([...masterServices, data]);
    }
    else{
        masterServiceSetter(masterServices.filter((item)=>item.id!=data.id))
    }
  };
  return (
    <div>
      {JSON.stringify(masterServices)}
      {services.map((service) => (
        <ServiceCard
          pusher={addToMaster}
          masterServices={masterServices}
          key={service.id}
          service={service}
        />
      ))}
    </div>
  );
}

export default ServiceSelector;
