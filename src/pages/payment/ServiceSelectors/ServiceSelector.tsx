import React, { useEffect, useState } from "react";
import { getServices } from "../../../api/APIS/wizard-api";
import ServiceCard from "./ServiceCard";
import { Grid } from "@mui/material";

type Props = { masterServices; masterServiceSetter };

function ServiceSelector({ masterServiceSetter, masterServices }: Props) {
  const [services, setServices] = useState<any>([]);
  const [total, setTotal] = useState<any>({
    gst: 0,
    sgst: 0,
    total_amount: 0,
    basic: 0,
  });
  useEffect(() => {
    getServices().then(({ result }) => {
      console.log(result);
      setServices(result);
    });
  }, []);
  const addToMaster = (data, method) => {
    if (method == "add") {
      masterServiceSetter([...masterServices, data]);
    } else {
      masterServiceSetter(masterServices.filter((item) => item.id != data.id));
    }
  };
  useEffect(() => {
    
    const initialValue = {
      gst: 0,
      sgst: 0,
      total_amount: 0,
      basic: 0,
    };

    const calculateCharges = () => {
      const charges = masterServices.reduce((accumulator, item) => {
        // Perform your calculations based on each item in masterServices
        // Update the accumulator object with the calculated values
        return {
          gst: accumulator.gst + item.gst,
          sgst: accumulator.sgst + item.sgst,
          total_amount: accumulator.total_amount + item.total_amount,
          basic: accumulator.basic + item.basic,
        };
      }, initialValue);

      // Do something with the calculated charges, e.g., update state or perform any other logic
      console.log(charges);
    };

    setTotal(calculateCharges()); // Initial calculation when masterServices changes
  }, [masterServices]);
  return (
    <div>
      {/* {JSON.stringify(masterServices)} */}
      <Grid container>
        
        <Grid item sm={8}>
          {services.map((service) => (
            <ServiceCard
              pusher={addToMaster}
              masterServices={masterServices}
              key={service.id}
              service={service}
            />
          ))}
        </Grid>
        {/* <Grid item sm={3}>haha{JSON.stringify(total)}</Grid> */}
      </Grid>
    </div>
  );
}

export default ServiceSelector;
