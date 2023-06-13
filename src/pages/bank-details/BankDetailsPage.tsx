import React from "react";
import BankDetailsForm from "./components/BankDetailsForm";
import { Container } from "@mui/system";

type Props = {next};

function BankDetailsPage({next}: Props) {
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Container maxWidth="lg" sx={{mt:5}}>
        <BankDetailsForm next={next}></BankDetailsForm>
      </Container>
    </div>
  );
}

export default BankDetailsPage;
