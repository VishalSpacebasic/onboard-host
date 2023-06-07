import { Button, MobileStepper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import * as React from "react";
import { useDispatch } from "react-redux";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  GetCurrentStatus,
  GetCurrentStep,
  getStudentInfo,
} from "../../api/APIS/wizard-api";
import { setApplicationInfo } from "../../redux/Reducers/applicationReducer";
import {
  setCurrentStatus,
  setWizardStep,
} from "../../redux/Reducers/stepReducer";
import emitter from "../../utils/EventEmiter";
import AcademicInfo from "../academic-info/AcademicInfo";
import DocumentVerification from "../document-verification/DocumentVerification";
import ParentInfo from "../parentinfo/ParentInfo";
import PaymentPage from "../payment/PaymentPage";
import RoomPreferenceV2 from "../room-preference-v2/RoomPreferenceV2";
import PersonalInfo from "../personalinfo/PersonalInfo";
import KycVerificationPage from "../Kyc verification/KycVerificationPage";
import axiosInstance from "../../api/axios.instance";
import { NavLink, useParams } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";

function WizardComponent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { collegeUrl } = useParams();
  const [currentStepId, setcurrentStepId] = React.useState<any>(1);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [steps, setsteps] = React.useState<any>([]);
  const [roomSelectionComplete, setRoomSelectionComplete] =
    React.useState(false);
  const dispatch = useDispatch();
  async function initailizeCurentStep() {
    const step = await GetCurrentStep();
    setActiveStep(step - 1);

    dispatch(setWizardStep(step));
    setcurrentStepId(step);
  }
  React.useEffect(() => {
    // getStudentInfo().then(({ data }) => {
    //   dispatch(setApplicationInfo(data));
    //   // setActiveStep(data.applicationStatus);
    //   // setcurrentStepId(data.applicationStatus);
    // });
    const result =
      collegeUrl == "taylors"
        ? [
            { title: "Personal Info", id: 1, show: true },
            { title: "Kyc Verification", id: 2, show: false },
            { title: "Parent Info", id: 3, show: false },
            { title: "Academic Info", id: 4, show: false },
            { title: "Document Verification", id: 5, show: true },
            { title: "Room Preference", id: 6, show: true },
            { title: "Fee Payment", id: 7, show: true },
            { title: "Sign Contract", id: 8, show: true },
          ]
        : collegeUrl == "sunway"
        ? [
            { title: "Personal Info", id: 1, show: true },
            { title: "Kyc Verification", id: 2, show: false },
            { title: "Parent Info", id: 3, show: false },
            { title: "Academic Info", id: 4, show: false },
            { title: "Room Preference", id: 6, show: true },
            { title: "Fee Payment", id: 7, show: true },
            { title: "Document Verification", id: 5, show: true },
            { title: "Sign Contract", id: 8, show: true },
          ]
        : [
            { title: "Personal Info", id: 1, show: true },
            { title: "Kyc Verification", id: 2, show: false },
            { title: "Parent Info", id: 3, show: true },
            { title: "Academic Info", id: 4, show: true },
            { title: "Document Verification", id: 5, show: true },
            { title: "Room Preference", id: 6, show: true },
            { title: "Fee Payment", id: 7, show: true },
            { title: "Sign Contract", id: 8, show: true },
          ];
    setsteps(result.filter((item) => item.show));
    initailizeCurentStep();
    setcurrentStatus();
    GetCurrentStep().then((data) => {
      setRoomSelectionComplete(data === 7);
    });
    // setcurrentStepId(1);
  }, []);

  const goToNextStep = async () => {
    console.log("CLICKED", steps, activeStep, currentStepId);
    const currStep = activeStep;
    // setActiveStep(currStep + 1);
    console.log(steps[currStep + 1].id);

    setcurrentStepId(steps[currStep + 1].id);
    dispatch(setWizardStep(currStep + 1));
    setcurrentStatus();
    const currentStep = await GetCurrentStep();
    setRoomSelectionComplete(currentStep === 7);
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    emitter.emit("next-clicked");
  };

  const handleBack = async () => {
    const prevActiveStep = activeStep - 1;
    setActiveStep(prevActiveStep);
    setcurrentStepId(steps[prevActiveStep].id);
    setcurrentStatus();
    const currentStep = await GetCurrentStep();
    setRoomSelectionComplete(currentStep === 7);
    console.log(currentStep);
  };
  const handleReset = () => {
    // setActiveStep(0);
  };
  async function setcurrentStatus() {
    const result = await GetCurrentStatus();
    dispatch(setCurrentStatus(result));
  }
  React.useEffect(() => {
    console.log("THIS IS console log", currentStepId, steps);

    const index = steps.findIndex((item) => item.id === currentStepId);
    setActiveStep(index);
    console.log("THIS IS CURRENT INDEX", index);
  }, [currentStepId, steps]);
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        sx={{
          p: 2,
        }}
        activeStep={activeStep}
      >
        {steps.map((item: any, index: number) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={item.id} {...stepProps}>
              <StepLabel {...labelProps}>{item.title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Scrollbars
            style={{
              width: "100%",
              height: "70vh",
              display: "flex",
              flexDirection: "column",
            }}
            // autoHeight
          >
            {/* TESTER COMPONENT */}
            {/* {currentStepId + "  " + activeStep} */}
            {/* {currentStepId === 1 ? <PaymentPage /> : null} */}
            {currentStepId === 1 ? <PersonalInfo next={goToNextStep} /> : null}
            {currentStepId === 2 ? (
              <KycVerificationPage next={goToNextStep} />
            ) : null}
            {currentStepId === 3 ? <ParentInfo next={goToNextStep} /> : null}
            {currentStepId === 4 ? <AcademicInfo next={goToNextStep} /> : null}
            {currentStepId === 5 ? (
              <DocumentVerification next={goToNextStep} />
            ) : null}
            {currentStepId === 6 ? (
              <RoomPreferenceV2 next={goToNextStep} />
            ) : null}
            {currentStepId === 7 ? <PaymentPage next={goToNextStep} /> : null}
            {currentStepId === 8 ? (
              <Box
                height="80vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h2" textAlign="center" color="grey">
                  Contract signing will be configured according to the
                  university policy.
                </Typography>
              </Box>
            ) : null}
          </Scrollbars>

          <MobileStepper
            variant="progress"
            steps={6}
            position="bottom"
            activeStep={activeStep}
            // sx={{ flexGrow: 1 }}
            nextButton={
              currentStepId == 5 ? (
                <>
                  <Button disabled>
                    <Typography>Click On Upload To Proceed</Typography>
                  </Button>
                </>
              ) : (
                <Button
                  size="small"
                  onClick={handleNext}
                  // disabled={activeStep === 5}
                  variant="contained"
                >
                  Next
                  <KeyboardArrowRight />
                </Button>
              )
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                // disabled={activeStep === 0 || activeStep === 6}
                variant="contained"
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </>
      )}
    </Box>
  );
}

export default WizardComponent;
