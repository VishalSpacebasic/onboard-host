import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useState,useEffect } from "react";
import { getServices } from "../../api/APIS/wizard-api";
import ServiceSelector from "../payment/ServiceSelectors/ServiceSelector";
import {
  getServiceSaleItems,
  setServicesSaleItems,
} from "../../api/APIS/paymentV2-api";
import ServiceCard from "../payment/ServiceSelectors/ServiceCard";
import emitter from "../../utils/EventEmiter";
import { toast } from "react-toastify";

type Props = { next };

function ServiceSelectorPage({ next }: Props) {
  const [services, setServices] = React.useState<any>([]);
  const [masterServices, masterServiceSetter] = React.useState<any>([]);
  const [preSelected, setPreselected] = useState();
  const [serviceIds, setServiceIds] = useState([]);
  const [total, setTotal] = React.useState({
    cgst: 0,
    sgst: 0,
    total_price: 0,
    basic: 0,
  });
  const handleNextClicked = () => {
    // const serviceIds = masterServices.map((item) => item.id.toString());
    console.log("Service ids", serviceIds);

    setServicesSaleItems({
      selectedServiceIds: serviceIds
    }).then((result) => {
      toast("items added");
      next();
    });
    next();
  };
  useEffect(() => {
    const serviceIds = masterServices.map((item) => item.id.toString());
    setServiceIds(serviceIds);
  }, [masterServices]);
  React.useEffect(() => {
    emitter.removeAllListeners("next-clicked");
    emitter.on("next-clicked", handleNextClicked);
    return () => {
      console.log("unMounted");
      emitter.off("next-clicked", handleNextClicked);
    };
  }, [total, masterServices,serviceIds]);

  React.useEffect(() => {
    getServiceSaleItems().then(({ result, selected }) => {
      setServices(result);
      const selectedItemms = result.filter((item) => {
        return selected.some((id) => id == item.id);
      });
      console.log(selectedItemms);

      masterServiceSetter(selectedItemms);
    });
  }, []);
  const addToMaster = (data, method) => {
    if (method == "add") {
      masterServiceSetter([...masterServices, data]);
    } else {
      masterServiceSetter(masterServices.filter((item) => item.id != data.id));
    }
  };
  React.useEffect(() => {
    const initialValue = {
      cgst: 0,
      sgst: 0,
      total_price: 0,
      basic: 0,
    };

    const calculateCharges = () => {
      const charges = masterServices.reduce((accumulator, item) => {
        // Perform your calculations based on each item in masterServices
        // Update the accumulator object with the calculated values
        return {
          cgst: accumulator.cgst + item.cgst,
          sgst: accumulator.sgst + item.sgst,
          total_price: accumulator.total_price + item.total_price,
          basic: accumulator.basic + item.basic,
        };
      }, initialValue);

      // Do something with the calculated charges, e.g., update state or perform any other logic
      setTotal(charges);
    };

    calculateCharges(); // Initial calculation when masterServices changes
  }, [masterServices]);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
    // return value;
  };
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" color={"gray"}>
        Offers
      </Typography>
      {/* <Divider sx={{ mb: 2 }}></Divider> */}
      <Grid container>
        <Grid item sm={8}>
          <Stack direction>
            {services?.map((service) => {
              return (
                <ServiceCard
                  service={service}
                  pusher={addToMaster}
                  masterServices={masterServices}
                />
                // <>{JSON.stringify(service)}</>
              );
            })}
          </Stack>
        </Grid>
        <Grid item sm={4}>
          {masterServices.map((item) => {
            return (
              <Card key={item.id}>
                <CardContent>
                  <Stack direction justifyContent={"space-between"}>
                    <Typography variant="h6" color="initial">
                      {item.name}
                    </Typography>
                    <Typography variant="h6" color="initial">
                      {formatCurrency(item.total_price)} INR
                    </Typography>
                  </Stack>
                  {/* <div>
                    <Typography variant="body2">Basic: {item.basic}</Typography>
                    <Typography variant="body2">SGST: {item.sgst}</Typography>
                    <Typography variant="body2">CGST: {item.cgst}</Typography>
                    <Typography variant="body2">
                      Total Amount: {item.total_price}
                    </Typography>
                  </div> */}
                </CardContent>
              </Card>
            );
          })}
          <Divider sx={{ mt: 5 }} />
          <Stack direction justifyContent={"space-between"}>
            <Typography variant="h5">Total Amount</Typography>
            <Typography variant="h5" fontWeight={"600"}>
              {formatCurrency(total.total_price)} INR
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ServiceSelectorPage;
