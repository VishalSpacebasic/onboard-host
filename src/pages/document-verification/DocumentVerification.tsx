import { Box, Container, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { getFileUplaodTemplate, getKycLink } from "../../api/APIS/wizard-api";
import emitter from "../../utils/EventEmiter";
import ItemUploaderCard from "./component/ItemUploaderCard";
import UploaderComponent from "./component/UploaderComponent";
import Paper from "@mui/material/Paper/Paper";

type Props = {
  next: any;
};

function DocumentVerification({ next }: Props) {
  // const [file, setFile] = useState(0);
  const [verificationArray, setVerificationArray] = useState<any>([]);
  const [remarks, setRemarks] = useState<any>({});
  const [docs, setDocs] = useState<any>({});
  const handleNextClick = () => {
    console.log("handleNextClick");

    // send Docs to server;

    console.log(docs);
    next();
  };
  useEffect(() => {
    emitter.on("next-clicked", handleNextClick);
    getFileUplaodTemplate().then((data) => {
      setVerificationArray(data);
    });
    getKycLink().then(({ remarks }) => {
      setRemarks(remarks);
    });
    return () => {
      emitter.off("next-clicked", handleNextClick);
    };
  }, []);
  const setFile = (file: any, id: any) => {
    setDocs({
      ...docs,
      [id]: file,
    });
  };

  return (
    <Box>
      <Container maxWidth="lg">
        <Typography color={"GrayText"} textAlign={"center"} variant="h4">
          Please upload the necessary documents for verification
        </Typography>
      </Container>
      <Container sx={{ mt: 9 }} maxWidth="xl">
        <Grid spacing={4} container>
          <Grid item sm={7}>
            <Scrollbars
              style={{
                width: "100%",
                height: "52vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack padding={1} spacing={2}>
                {/* {JSON.stringify(verificationArray)} */}
                {verificationArray?.map((item: any) => {
                  return (
                    <ItemUploaderCard
                      key={item.id}
                      id={item.id}
                      description={item.description}
                      title={item.title}
                      downloadLink={item.templateLink}
                      selectFile={setFile}
                    />
                  );
                })}
              </Stack>
            </Scrollbars>
          </Grid>
          <Grid item sm={5}>
            <UploaderComponent
              selectFile={setFile}
              setDocs={setDocs}
              next={next}
              docs={docs}
            />
          </Grid>
        </Grid>
        {remarks?.document_rejection_remark &&
        remarks?.document_verified == 3 ? (
          <Paper p={2}>
            <Typography color="error" sx={{ textAlign: "center" }}>
              {" "}
              Your documents have been rejected :{" "}
              {remarks?.document_rejection_remark}
            </Typography>
          </Paper>
        ) : null}
      </Container>
    </Box>
  );
}

export default DocumentVerification;
