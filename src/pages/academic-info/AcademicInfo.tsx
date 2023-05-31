import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getAcademicDropDown,
  getAccademicInfo,
  setAcademicInfo,
} from "../../api/APIS/wizard-api";
import emitter from "../../utils/EventEmiter";

type Props = { next: any };
type selector = {
  courseId: number;
  streamId: number;
  batch: number;
};

function AcademicInfo({ next }: Props) {
  const [dropdownItems, setDropDownItems] = useState<any>({});
  const { currentStatus } = useSelector((store: any) => store.step);
  const [selection, setSelection] = useState<selector>({
    courseId: 0,
    streamId: 0,
    batchId: 0,
  });
  const [streams, setStreams] = useState([]);
  const StyledHeading = styled(Typography)({
    textAlign: "center",
    padding: 10,
  });
  function handleNextClick() {
    console.log("THIS IS SELCTIOn", selection);
    if (selection?.courseId == null) {
      toast("Please select a course", { type: "error" });
      return 0;
    }
    if (selection?.streamId == null) {
      toast("Please select a stream", { type: "error" });
      return 0;
    }
    // // console.log(selection.academicYearId)
    // if (!selection?.academicYearId) {
    //   toast("Please select your accademic year", { type: "error" });
    //   return 0;
    // }
    setAcademicInfo(selection)
      .then(({ data }) => {
        console.log("THiS ISapi response", data);
        next();
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getAcademicDropDown().then(({ data }) => {
      setDropDownItems(data);
      getAccademicInfo().then((result) => {
        console.log(result, "THIS IS COURSE INFO");
        setSelection({ ...result });
      });
    });
  }, []);
  useEffect(() => {
    if (selection?.courseId) {
      const streamsSelection = dropdownItems.streams.filter((item) => {
        return item.courseId === selection?.courseId;
      });
      setStreams(streamsSelection);
    }
    emitter.removeAllListeners("next-clicked");
    emitter.on("next-clicked", handleNextClick);
    return () => {
      console.log("unMounted");
      emitter.off("next-clicked", handleNextClick);
    };
  }, [dropdownItems.streams, selection]);
  const handleCourseSelection = (item) => {
    if (currentStatus === 2) {
      setStreams([]);
      return setSelection({
        ...selection,
        courseId: item.courseId,
        streamId: null,
      });
    }
  };
  return (
    <Container maxWidth="lg">
      <Grid container spacing={6} justifyContent="center">
        <Grid item md={4}>
          <Paper
            elevation={3}
            sx={{
              height: "70vh",
              borderRadius: 3,
              // paddingLeft:2
            }}
          >
            <StyledHeading variant="body1">
              {" "}
              Please select your course
            </StyledHeading>
            {/* <Stack
              sx={{
                height: "70vh",
                overflowY: "scroll",
              }}
              gap={0.5}
            > */}
            <Scrollbars
              style={{
                width: "100%",
                height: "60vh",
                display: "flex",
                flexDirection: "column",
              }}
              // autoHeight
            >
              {dropdownItems?.courses?.map((item, index) => {
                return (
                  <Button
                    onClick={() => handleCourseSelection(item)}
                    sx={{
                      borderRadius: 0,
                    }}
                    key={item?.courseId}
                    variant={
                      selection?.courseId != item?.courseId
                        ? "text"
                        : "contained"
                    }
                    fullWidth
                  >
                    {item?.courseName}
                  </Button>
                );
              })}
            </Scrollbars>
            {/* </Stack> */}
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper
            elevation={3}
            sx={{
              height: "70vh",
              borderRadius: 3,
            }}
          >
            <StyledHeading>Please select your stream</StyledHeading>
            <Scrollbars
              style={{
                width: "100%",
                height: "60vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {streams?.map((item, index) => {
                return (
                  <Button
                    sx={{
                      borderRadius: 0,
                    }}
                    onClick={() =>
                      currentStatus === 2
                        ? setSelection({
                            ...selection,
                            streamId: item.streamId,
                          })
                        : null
                    }
                    fullWidth
                    key={item.streamId}
                    variant={
                      selection?.streamId != item?.streamId
                        ? "text"
                        : "contained"
                    }
                  >
                    {item.streamName}
                  </Button>
                );
              })}
            </Scrollbars>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper
            elevation={3}
            sx={{
              height: "70vh",
              borderRadius: 3,
              paddingLeft: 0,
            }}
          >
            <StyledHeading variant="body1">
              {" "}
              Please select your academic year
            </StyledHeading>
            <Scrollbars
              style={{
                width: "100%",
                height: "60vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {dropdownItems?.academicYear?.map((item, index) => {
                return (
                  <Button
                    sx={{
                      borderRadius: 0,
                    }}
                    onClick={() =>
                      currentStatus === 2
                        ? setSelection({
                            ...selection,
                            batchId: item.academicYearId,
                          })
                        : null
                    }
                    fullWidth
                    key={item.academicYearId}
                    variant={
                      selection.batchId != item.academicYearId
                        ? "text"
                        : "contained"
                    }
                  >
                    {item.academicYear}
                  </Button>
                );
              })}
            </Scrollbars>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AcademicInfo;
