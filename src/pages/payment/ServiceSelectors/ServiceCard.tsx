import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  Radio,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
// import { Card, CardContent, Typography,  } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    width: 300,
    margin: 10,
    border:"1px solid #1976d2",
    borderRadius:19
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: "gray",
  },
  // addButton: {
  //     position: 'absolute',
  //     bottom: 10,
  //     right: 10,
  //   },
});

function ServiceCard({ service, pusher, masterServices }) {
  const classes = useStyles();

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
    // return value;
  };
  const checkIfExist = () => {
    const found = masterServices.some((item) => item.id == service.id);
    console.log(found);

    return found;
  };

  const getPriceBreakdown = () => {
    const { basic, sgst, cgst, total_price } = service;
    return (
      <Stack width={"100%"}>
        {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">Basic:</Typography>
          <Typography variant="body2" style={{ textAlign: "right" }}>
            {formatCurrency(basic)}
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">SGST:</Typography>
          <Typography variant="body2" style={{ textAlign: "right" }}>
            {formatCurrency(sgst)}
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">CGST:</Typography>
          <Typography variant="body2" style={{ textAlign: "right" }}>
            {formatCurrency(cgst)}
          </Typography>
        </div> */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5"></Typography>
          <Typography variant="h5" style={{ textAlign: "right" }}>
            {formatCurrency(total_price)}
          </Typography>
        </div>
      </Stack>
    );
  };

  return (
    // <Tooltip title={getPriceBreakdown()} placement="bottom">
    <Card elevation={4} className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Stack
            direction
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h6" >
              {service.name}
            </Typography>
            <Radio
              color="success"
              checked={checkIfExist()}
              onClick={() => {
                if (!checkIfExist()) {
                  pusher(service, "add");
                } else {
                  pusher(service, "remove");
                }
              }}
            />
          </Stack>

          {/* <Typography variant="body2" className={classes.details}>
                Service ID: {service.service_id}
              </Typography> */}
          {/* <Divider sx={{mb:5}}></Divider> */}
        
          <Stack mt={2} spacing={0.5} gap={1} >
            {service?.services?.map((item) => {
              return <Chip variant="outlined" label={item} />;
            })}
       
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* {!checkIfExist() ? (
            <Button
              // className={classes.addButton}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => pusher(service, "add")}
            >
              Add
            </Button>
          ) : (
            <Button
              // className={classes.addButton}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => pusher(service, "remove")}
            >
              Remove
            </Button>
          )} */}
        {getPriceBreakdown()}
        {/* <Typography variant="body1" className={classes.price}>
              Price: {formatCurrency(service.total_price)}
            </Typography> */}
      </CardActions>
    </Card>
    // </Tooltip>
  );
}

export default ServiceCard;
