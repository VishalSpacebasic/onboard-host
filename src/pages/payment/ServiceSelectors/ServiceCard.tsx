import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
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

const ServiceCard = ({ service, pusher, masterServices }) => {
  const classes = useStyles();

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };
  const checkIfExist = () => {
    const found =masterServices.some((item) => item.id == service.id);
    console.log(found);
    
    return found;
  };

  const getPriceBreakdown = () => {
    const { basic, sgst, cgst, total_amount } = service;
    return (
      <div>
        <Typography variant="body2">Basic: {formatCurrency(basic)}</Typography>
        <Typography variant="body2">SGST: {formatCurrency(sgst)}</Typography>
        <Typography variant="body2">CGST: {formatCurrency(cgst)}</Typography>
        <Typography variant="body2">
          Total Amount: {formatCurrency(total_amount)}
        </Typography>
      </div>
    );
  };

  return (
    <Tooltip title={getPriceBreakdown()} placement="bottom">
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6" className={classes.serviceName}>
              {service.name}
            </Typography>
            <Typography variant="body1" className={classes.price}>
              Price: {formatCurrency(service.total_amount)}
            </Typography>
            {/* <Typography variant="body2" className={classes.details}>
                Service ID: {service.service_id}
              </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          {!checkIfExist() ? (
            <Button
              // className={classes.addButton}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => pusher(service,"add")}
            >
              Add
            </Button>
          ) : (
            <Button
              // className={classes.addButton}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => pusher(service,"remove")}
            >
              Remove
            </Button>
          )}
        </CardActions>
      </Card>
    </Tooltip>
  );
};

export default ServiceCard;
