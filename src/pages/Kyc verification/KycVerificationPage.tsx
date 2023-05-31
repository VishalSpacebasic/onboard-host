import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import ItemUploaderCard from "../document-verification/component/ItemUploaderCard";
import { getKycLink, uploadKYcInfo } from "../../api/APIS/wizard-api";
import emitter from "../../utils/EventEmiter";

type Props = { next };

function KycVerificationPage({ next }: Props) {
  const [downoadLink, setDownloadLink] = useState<any>(null);
  function handleNextClick() {
    next();
  }
  useEffect(() => {
    getKycLink().then((link) => {
      setDownloadLink(link);
    });
    emitter.on("next-clicked", handleNextClick);
    return () => {
      console.log("unMounted");
      emitter.off("next-clicked", handleNextClick);
    };
  }, []);
  const [doc, setDoc] = useState();
  const setFile = (file: any, id: any) => {
    setDoc({
      file,
    });
    const formData = new FormData();
    formData.append("file", file);
    // console.log(formData);
    uploadKYcInfo(formData);
  };

  return (
    <Container>
      <Typography>KYC verification</Typography>

      <ItemUploaderCard
        title="Upload Doc "
        downloadLink={downoadLink}
        description="Please uplaod your kyc document here"
        selectFile={setFile}
        uploaderFunction={undefined}
        id={undefined}
      />
    </Container>
  );
}

export default KycVerificationPage;
