import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import TabPanel from "@mui/lab/TabPanel";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoadingButton, TabContext, TabList } from "@mui/lab";
import {
  getPastTransactions,
  getPaymentInfo,
  getRazorPayOrder,
  payOffline,
} from "../../api/APIS/payment-routes";
import {
  getPaymentMethods,
  getRoomAllocationStatus,
} from "../../api/APIS/wizard-api";
import axiosInstance from "../../api/axios.instance";
import emitter from "../../utils/EventEmiter";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import JSZip from "jszip";
import TransactionCard from "./components/TransactionCard";
import { useParams } from "react-router-dom";
type Props = { next };
type paymentType = {
  id: number;
  tenantURL: string;
  applicationId: string;
  roomType: string;
  attributes: string[];
  hostelName: string;
  blockName: string;
  floorName: string;
  roomName: string;
  basic: string;
  deposit: string;
  sgst: string;
  cgst: string;
  extras: string;
  totalAmount: number;
  pendingAmount: number;
  paidAmount: string;
  paymentId: number;
  paymentType: string;
  paymentStatus: string;
  paymentVerified: number;
  paymentVerifiedBy: string;
  paymentAllowed: number;
};

function PaymentPage({ next }: Props) {
  const [files, setFiles] = useState<any>([]);
  const [paymentStatus, setPaymentStatus] = useState();
  const [dropZoneFiles, setDropZoneFiles] = useState<any>();
  const [paymentInfo, setPaymentInfo] = useState<paymentType>();
  const [checked, setChecked] = useState(false);
  const [allocationStatus, setAllocationStatus] = useState(2);
  const [tab, setTab] = useState<any>("1");
  const [paymentResult, setPaymentResult] = useState();
  const [paymentModes, setPaymentModes] = useState<any>([]);
  const darkMode = useSelector((store) => store.theme.dark);
  const [transactions, setTransactions] = useState([]);
  const [apiTrigger, CallApiTrigger] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [originalPrice, setOriginalPrice] = useState();
  const [active, setActive] = useState<any>(1);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      paidTransactionAmount: "",
      modeOfPayment: "",
      paidDate: "",
      trnRefNumber: "",
    },
  });
  useEffect(() => {
    getRoomAllocationStatus().then((data) => {
      setAllocationStatus(data.allotmentStatus);
    });
    getPaymentInfo().then(({ result }) => {
      setPaymentInfo(result);
      setOriginalPrice(result.totalAmount);
    });
    fetchPaymentHistory();
  }, [apiTrigger]);
  useEffect(() => {
    emitter.removeAllListeners("next-clicked");
    emitter.on("next-clicked", handleNextClicked);
    return () => {
      console.log("unMounted");
      emitter.off("next-clicked", handleNextClicked);
    };
  }, [paymentInfo]);

  useEffect(() => {
    getPaymentMethods().then((data) => {
      setPaymentModes(data.result);
    });
    fetchPaymentHistory();
  }, []);
  const handleNextClicked = () => {
    if(     paymentInfo.paymentStatus == "Paid" && collegeUrl=='sunway'){
      next();
    }
    if (
      paymentInfo.paymentStatus == "Paid" &&
      paymentInfo.paymentVerified == 1
    ) {
      next();
      return 0;
    }
    if (
      paymentInfo.paymentType == "Offline" &&
      paymentInfo?.paymentStatus == "Paid"
    ) {
      next();
    }
    if (allocationStatus == 3) {
      // toast("Please wait till the hostel team allocates a room for you");
      // return;
      next();
    }
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await getRazorPayOrder();
    console.log(result);

    console.log(result);
    const order = result.result;
    console.log(order);
    const options: any = {
      key: order.key,
      amount: order.amount,
      currency: "INR",
      name: order.collegeName,
      description: `${order.receipt}`,
      order_id: order.id,
      notes: order.notes,
      async handler(response) {
        CallApiTrigger(!apiTrigger);
        console.log(response);
        setPaymentStatus("SUCESSS");
        setPaymentInfo({ ...paymentInfo, paymentStatus: "Paid" });
      },
      prefill: {
        name: order.name,
        email: order.email,
        contact: order.phone,
      },
      theme: {
        color: "#303444",
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: "Pay via UPI",
              instruments: [
                {
                  method: "upi",
                },
                {
                  method: "netbanking",
                },
              ],
            },
          },
          sequence: ["block.banks"],
          preferences: {
            show_default_blocks: false,
          },
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  const handleChange = (file) => {
    if (files.length > 4) {
      toast("Max file items reaced", { type: "error" });
      return;
    }
    setFiles([...files, file]);
  };
  const updateFiles = (incommingFiles: ExtFile[]) => {
    setDropZoneFiles(incommingFiles);
    console.log("incommingFiles", incommingFiles);
    const files: (File | undefined)[] = [];
    incommingFiles.forEach((item) => {
      console.log(item.file);
      files.push(item.file);
    });
    console.log("this is files", files);

    setFiles(files);
  };
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const onSubmit = (data) => {
    setButtonLoading(true);
    if (!files.length) {
      toast("Please add a reciept", { type: "error" });
      setButtonLoading(false);
      return;
    }
    const paidAmount = parseInt(data.paidTransactionAmount, 10); // Convert to integer
    const pendingAmount = parseInt(paymentInfo?.pendingAmount, 10);
    console.log(data, paymentInfo, pendingAmount >= paidAmount);

    if (pendingAmount < paidAmount) {
      toast("Amount exceeds the total amount");
      return;
    }

    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(file.name, file);
    });

    console.log("files", zip.files);
    zip.generateAsync({ type: "blob" }).then((content) => {
      const formData = new FormData();
      formData.append("file", content, "files.zip");
      formData.append("data", JSON.stringify(data));

      payOffline(formData)
        .then((data) => {
          CallApiTrigger(!apiTrigger);
          reset();
          setDropZoneFiles([]);
          toast("Submitted successfully");
          setButtonLoading(false);
        })
        .catch(() => {
          toast("Submitted successfully", { type: "error" });
          setButtonLoading(false);
        });
    });
  };
  const fetchPaymentHistory = async () => {
    const { result } = await getPastTransactions();
    setTransactions(result);
  };
  const priceChanger = (divider: number) => {
    const price = paymentInfo?.pendingAmount / divider;
    setPaymentInfo({ ...paymentInfo, pendingAmount: originalPrice / divider });
    setActive(divider);
  };
  const { collegeUrl } = useParams();
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item sm={8}>
          <Paper elevation={3} sx={{ padding: "16px" }}>
            {collegeUrl == "sunway" ? (
              <Stack direction justifyContent={"space-around"}>
                <Button
                  variant={active == 4 ? "contained" : "text"}
                  onClick={() => priceChanger(4)}
                >
                  Quarterly
                </Button>
                <Button
                  variant={active == 2 ? "contained" : "text"}
                  onClick={() => priceChanger(2)}
                >
                  Half-Yearly
                </Button>
                <Button
                  variant={active == 1 ? "contained" : "text"}
                  onClick={() => priceChanger(1)}
                >
                  Anually
                </Button>
              </Stack>
            ) : null}
            <Grid container spacing={2}>
              {paymentInfo?.hostelName ? (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="div" gutterBottom>
                      Room Details
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" gutterBottom>
                      Hostel Name: {paymentInfo?.hostelName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Block Name: {paymentInfo?.blockName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Floor Name: {paymentInfo?.floorName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Room Name: {paymentInfo?.roomName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" gutterBottom>
                      Room Type: {paymentInfo?.roomType}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Attributes: {paymentInfo?.attributes?.join(", ")}
                    </Typography>
                  </Grid>
                </>
              ) : null}
              <Divider />
              <Grid item xs={12}>
                <Typography variant="h5" component="div" gutterBottom>
                  Payment Details
                </Typography>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <Typography variant="body1" gutterBottom>
                  Payment Type: {paymentInfo?.paymentType}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Payment Status: {paymentInfo?.paymentStatus}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Payment Verified:{" "}
                  {paymentInfo?.paymentVerified ? "Yes" : "No"}
                </Typography>
                {paymentInfo?.paymentVerifiedBy && (
                  <Typography variant="body1" gutterBottom>
                    Payment Verified By: {paymentInfo?.paymentVerifiedBy}
                  </Typography>
                )}
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" gutterBottom>
                  Basic (Monthly) : {paymentInfo?.basic} INR
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Deposit : {paymentInfo?.deposit} INR
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Processing Fee : 0 INR
                </Typography>
                <Typography variant="body1" gutterBottom>
                  SGST : {paymentInfo?.sgst} INR
                </Typography>
                <Typography variant="body1" gutterBottom>
                  CGST : {paymentInfo?.cgst} INR
                </Typography>
                {/* <Typography variant="body1" gutterBottom>
                  Payment ID:{" "}
                  {paymentInfo?.paymentId !== 0
                    ? paymentInfo?.paymentId
                    : "N/A"}
                </Typography> */}
                <Typography variant="body1" gutterBottom>
                  Pending Amount: {paymentInfo?.pendingAmount} INR
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Paid Amount: {paymentInfo?.paidAmount} INR
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Box>
              <Stack direction justifyContent={"space-between"}>
                <Stack>
                  <Typography variant="body1">Paid Amount</Typography>

                  <Typography variant="h4">
                    {paymentInfo?.paidAmount} INR
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body1">Payable Amount</Typography>

                  <Typography variant="h4">
                    {paymentInfo?.pendingAmount} INR
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Paper>
          {paymentInfo?.paymentStatus == "Not Paid" ? (
            <>
              {" "}
              <Checkbox
                checked={checked}
                onClick={() => setChecked(!checked)}
                label="I have inspeceted the room before i make the payment"
              />{" "}
              I have reviewed all the information and inspected the room{" "}
            </>
          ) : null}
        </Grid>
        {paymentInfo?.paymentVerified != 1 ? (
          <Grid item sm={4}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    variant="fullWidth"
                    onChange={handleTabChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="ONLINE" value="1" />
                    <Tab label="OFFLINE" value="2" />
                    <Tab label="HISTORY" value="3" />
                  </TabList>
                </Box>
                {paymentInfo?.paymentType == "Offline" ? (
                  <TabPanel value="1">
                    {paymentInfo?.paymentStatus == "Not Paid" ? (
                      <Button
                        disabled={
                          (!checked && paymentInfo?.paymentStatus != "Paid") ||
                          paymentStatus == "SUCCESS"
                        }
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={() => displayRazorpay()}
                      >
                        {paymentStatus == "SUCCESS"
                          ? "PAYMENT SUCCESSFULL"
                          : "Pay Now"}
                      </Button>
                    ) : paymentInfo?.paymentStatus == "Pending" ? (
                      <>
                        <Button fullWidth disabled>
                          Please wait for a moment your previous transaction is
                          processing
                        </Button>
                      </>
                    ) : (
                      <Button fullWidth disabled>
                        {paymentInfo?.paymentType == "Offline"
                          ? "You cant pay online since you have made an offline payment"
                          : "Already paid You would be recieving a welcome shortly"}
                      </Button>
                    )}
                  </TabPanel>
                ) : tab == 1 ? (
                  <Button fullWidth disabled>
                    {paymentInfo?.paymentStatus == "Paid"
                      ? "Payment successfull"
                      : " Please Wait While The Payment Is being Processed"}
                  </Button>
                ) : null}
                <TabPanel value="2">
                  {" "}
                  {paymentInfo?.paymentStatus == "Pending" ? (
                    <>
                      <Button disabled>
                        Please wait while your transaction is being processed
                      </Button>
                    </>
                  ) : (
                    <Paper elevation={4}>
                      <div className="files">
                        <Dropzone
                          accept=".jpg, .jpeg, .png, .gif, .doc, .docx, .pdf"
                          onChange={updateFiles}
                          // onInput={updateFiles}
                          maxFiles={4}
                          value={dropZoneFiles}
                          // maxFileSize={4000000}
                        >
                          {dropZoneFiles?.map((file) => (
                            <FileMosaic
                              key={file}
                              {...file}
                              onDelete={removeFile}
                              preview
                              info
                              darkMode={darkMode}
                            />
                          ))}
                        </Dropzone>
                      </div>
                      <form
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <Stack spacing={1} gap={1}>
                          <Controller
                            name="paidTransactionAmount"
                            control={control}
                            rules={{
                              required: "This field is required",
                              pattern: {
                                value: /^[0-9]*\.?[0-9]*$/,
                                message: "Please enter a valid  amount",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                id="amount"
                                label="Amount paid"
                                fullWidth
                                variant="filled"
                                error={!!errors.paidTransactionAmount}
                                helperText={
                                  errors.paidTransactionAmount?.message
                                }
                                {...field}
                              />
                            )}
                          />
                          <Controller
                            name="trnRefNumber"
                            control={control}
                            rules={{
                              required: "This field is required",
                            }}
                            render={({ field }) => (
                              <TextField
                                id="amount"
                                label="Transaction Number"
                                fullWidth
                                variant="filled"
                                error={!!errors.trnRefNumber}
                                helperText={errors.trnRefNumber?.message}
                                {...field}
                              />
                            )}
                          />
                          <Controller
                            name="modeOfPayment"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <FormControl fullWidth variant="outlined">
                                <InputLabel id="demo-simple-select-label">
                                  Payment Mode
                                </InputLabel>
                                <Select
                                  labelId="guardian-relation-label"
                                  id="guardian-relation"
                                  label="Mode of payment"
                                  variant="filled"
                                  placeholder="Please select relation"
                                  error={!!errors.modeOfPayment}
                                  {...field}
                                >
                                  {paymentModes.map((item) => {
                                    return (
                                      <MenuItem key={item} value={item}>
                                        {item}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                                {errors.modeOfPayment && (
                                  <FormHelperText error>
                                    Mode of payment is required
                                  </FormHelperText>
                                )}
                              </FormControl>
                            )}
                          />
                          <Controller
                            name="paidDate"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <TextField
                                id="paidDate"
                                label="Date of payment"
                                type="date"
                                variant="filled"
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                inputProps={{
                                  min: new Date(
                                    new Date().setMonth(
                                      new Date().getMonth() - 3
                                    )
                                  )
                                    .toISOString()
                                    .split("T")[0],
                                  max: new Date().toISOString().split("T")[0], // Replace with your desired maximum date
                                }}
                                error={!!errors.paidDate}
                                helperText={
                                  errors.paidDate &&
                                  "Date of payment is required"
                                }
                                {...field}
                              />
                            )}
                          />
                        </Stack>
                      </form>

                      <LoadingButton
                        loading={buttonLoading}
                        size="large"
                        fullWidth
                        onClick={handleSubmit(onSubmit)}
                        // type="submit"
                      >
                        Submit
                      </LoadingButton>
                    </Paper>
                  )}
                </TabPanel>
                <TabPanel value="3">
                  {transactions.map((item) => {
                    return (
                      <TransactionCard transaction={item}></TransactionCard>
                    );
                  })}
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        ) : null}
        {/* {paymentInfo?.paymentStatus == "Pending" ? (
          <Grid item sm={4}>
            <Typography
              sx={{ marginX: "auto", marginY: 20, opacity: 0.4 }}
              textAlign="center"
              variant="h5"
            >
              {" "}
              Payment Received! We are currently processing your payment and
              will update you shortly.{" "}
            </Typography>
          </Grid>
        ) : null} */}
        {paymentInfo?.paymentStatus == "Paid" &&
        paymentInfo.paymentVerified == 1 &&
        allocationStatus != 3 ? (
          <Grid item sm={4}>
            <Typography
              sx={{ marginX: "auto", marginY: 20, opacity: 0.4 }}
              textAlign="center"
              variant="h5"
            >
              {" "}
              Payment Processed! Please proceed to the next step and sign the
              contract.
            </Typography>
          </Grid>
        ) : paymentInfo?.paymentStatus == "Paid" &&
          paymentInfo.paymentVerified == 1 &&
          allocationStatus == 3 ? (
          <Grid item sm={4}>
            <Typography
              sx={{ marginX: "auto", marginY: 20, opacity: 0.4 }}
              textAlign="center"
              variant="h5"
            >
              {" "}
              Payment Processed! Please proceed to the next step and sign the
              contract.
            </Typography>
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
}

export default PaymentPage;
