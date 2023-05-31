import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";

type Props = { transaction };

function TransactionCard({ transaction }: Props) {
  const handleDownload = () => {
    window.open(transaction.receiptLink, "_blank");
  };

  return (
    <Card>
      <CardContent>
        <Typography>Payment Type: {transaction.paymentType}</Typography>
        <Typography>Paid Amount: {transaction.paidAmount}</Typography>
        <Typography>Paid Date: {transaction.createdAt}</Typography>
        <Typography>Payment Mode: {transaction.paymentMode}</Typography>
        <Typography>
          Payment Receipt Number: {transaction.paymentReceiptNumber}
        </Typography>
        <Button variant="contained" onClick={handleDownload}>
          Download Receipt
        </Button>
      </CardContent>
    </Card>
  );
}

export default TransactionCard;
