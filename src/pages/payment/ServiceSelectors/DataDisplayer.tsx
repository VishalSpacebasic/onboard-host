import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { getTotalSaleItemsBreakdown } from "../../../api/APIS/paymentV2-api";
const ResultCard = ({ saleItemName, feeItems }) => {
  const total = feeItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <Card variant="outlined" style={{ marginBottom: "16px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {saleItemName}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Basic</TableCell>
                <TableCell align="right">CGST</TableCell>
                <TableCell align="right">SGST</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.feeItemName}</TableCell>
                  <TableCell align="right">{item.basic}</TableCell>
                  <TableCell align="right">{item.cgst}</TableCell>
                  <TableCell align="right">{item.sgst}</TableCell>
                  <TableCell align="right">{item.total}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right">
                  Total:
                </TableCell>
                <TableCell align="right">{total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

const RoomCard = ({ saleItemName, roomTypeName, feeItems }) => {
  const total = feeItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <Card variant="outlined" style={{ marginBottom: "16px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {/* {saleItemName} */}
        </Typography>
        <Typography variant="h6" gutterBottom>
          <span style={{fontWeight:"bold"}}> Room Type:</span> {roomTypeName}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Basic</TableCell>
                <TableCell align="right">CGST</TableCell>
                <TableCell align="right">SGST</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.feeItemName}</TableCell>
                  <TableCell align="right">₹ {item.basic} </TableCell>
                  <TableCell align="right">{item.cgst}</TableCell>
                  <TableCell align="right">{item.sgst}</TableCell>
                  <TableCell align="right">₹ {item.total}</TableCell>
                </TableRow>
              ))}
              {/* <TableRow>
                <TableCell colSpan={4} align="right">
                  Total:
                </TableCell>
                <TableCell align="right">{total}</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
function DataDisplayer() {
  const [data, setData] = useState();
  useEffect(() => {
    getTotalSaleItemsBreakdown().then(({ result }) => {
      setData(result);
    });
  }, []);
  return (
    <div>
      {/* <Typography>Room Fee</Typography> */}
      {data?.room.map((room, index) => (
        <RoomCard
          key={index}
          saleItemName={room.saleItemName}
          roomTypeName={room.roomTypeName}
          feeItems={room.feeItems}
        />
      ))}
      {/* {data?.services.length ? <Typography>Services</Typography> : null} */}
      {data?.services.map((service, index) => (
        <ResultCard
          key={index}
          saleItemName={service.saleItemName}
          feeItems={service.feeItems}
        />
      ))}
    </div>
  );
}

export default DataDisplayer;
