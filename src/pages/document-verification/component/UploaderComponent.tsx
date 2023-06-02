import { Button, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { filesize } from "filesize";
import JSZip from "jszip";
import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { FileIcon, defaultStyles } from "react-file-icon";
import { toast } from "react-toastify";
import {
  getKycLink,
  uplaodFileForVerification,
} from "../../../api/APIS/wizard-api";
import { LoadingButton } from "@mui/lab";

type Props = { docs; next; setDocs; selectFile; setTouched; touched };

function UploaderComponent({
  docs,
  next,
  setDocs,
  selectFile,
  touched,
  setTouched,
}: Props) {
  const [doc, setDoc] = useState<any>();
  const [loading, setLoading] = useState(false);

  const uploadFiles = () => {
    if (remarks.document_verified == 2) {
      toast("Your document is already verified ..!");
      next();
      return;
    }
    setLoading(true);
    const zip = new JSZip();
    Object.keys(docs).forEach((item) => {
      if (docs[item].name) {
        zip?.file(
          `${item}.${docs[item].name.split(".").pop().toLowerCase()}`,
          docs[item]
        );
      }
    });
    console.log("FILLLES", zip.files);

    zip.generateAsync({ type: "blob" }).then((content) => {
      const formData = new FormData();
      formData.append("file", content, "files.zip");

      if (touched) {
        uplaodFileForVerification(formData)
          .then((response) => {
            toast("Documents uploaded successfully", { type: "success" });
            next();
            // Handle success response
            // Call the uploadKYcInfo function or perform any other actions
            // next();
          })
          .catch((error) => {
            console.error("Upload error:", error);
          });
      } else {
        next();
      }
    });
  };
  async function decompressZipFile(url) {
    const response = await fetch(url, { mode: "no-cors", method: "GET" });
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    // const arrayBuffer = await response.arrayBuffer();
    console.log(arrayBuffer);
    const zip = await JSZip.loadAsync(arrayBuffer);

    const files = [];

    Object.keys(zip.files).forEach(async (filename) => {
      const file = zip.files[filename];
      if (!file.dir) {
        const blob = await file.async("blob");
        const fileNameWithoutExt = file.name.split(".").slice(0, -1).join(".");
        const newFile = new File([blob], fileNameWithoutExt, {
          type: blob.type,
        });
        files.push(newFile);
      }
    });

    return files;
  }
  const downloadFiles = () => {
    const zip = new JSZip();
    Object.keys(docs).forEach((item) => {
      if (docs[item]?.name) {
        zip?.file(
          `${item}.${docs[item].name.split(".").pop().toLowerCase()}`,
          docs[item]
        );
      }
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(content);
      downloadLink.download = "files.zip";
      downloadLink.click();
    });
  };
  function decompress(url) {
    // Usage
    decompressZipFile("http://localhost:3000/download").then((files) => {
      console.log(files);
    });
  }
  const [extractedFiles, setExtractedFiles] = useState<any>([]);
  const downloadAndExtractFiles = (fileUrl) => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((content) => {
        // Create a JSZip instance and load the content of the downloaded file
        const zip = new JSZip();
        zip.loadAsync(content).then(() => {
          // Extract the contents of the zip file
          const extractedFilesArray: File[] = [];
          zip.forEach((relativePath, file) => {
            file
              .async("blob")
              .then((fileContent) => {
                const extractedFile = new File([fileContent], file.name, {
                  type: file.type,
                  lastModified: new Date(),
                });
                extractedFilesArray.push(extractedFile);
                console.log(extractedFile);
              })
              .then(() => {
                setDocs(extractedFilesArray);
                const docsObject = extractedFilesArray.reduce((obj, file) => {
                  const fileName = file.name.split(".").slice(0, -1).join(".");
                  return { ...obj, [fileName]: file };
                }, {});
                setDocs(docsObject);
              });
          });
        });
      })
      .catch((error) => {
        console.error("Download error:", error);
      });
  };
  const [remarks, setRemarks] = useState<any>({});
  useEffect(() => {
    getKycLink().then((data) => {
      downloadAndExtractFiles(data.result);
      setRemarks(data.remarks);
    });
  }, []);
  function getFileExtension(filename) {
    const extension = filename.split(".").pop();
    return extension;
  }
  return (
    <Paper
      elevation={11}
      sx={{
        minHeight: "50vh",
        p: 2,
      }}
    >
      <Stack>
        <Scrollbars
          style={{
            width: "100%",
            height: "45vh",
            display: "flex",
            flexDirection: "column",
          }}
          // autoHeight
        >
          {Object?.keys(docs)?.map((item) => {
            return docs[item]?.name ? (
              <Paper sx={{ mb: 3 }} key={item}>
                <Stack direction>
                  <Box p={2} width={70}>
                    <FileIcon
                      extention={getFileExtension(docs[item].name)}
                      {...defaultStyles[getFileExtension(docs[item].name)]}
                    />
                  </Box>
                  {/* <UploadFile
                    color="primary"
                    sx={{
                      width: 90,
                      height: 90,
                    }}
                  /> */}
                  <Stack>
                    <Typography variant="h5">{item}</Typography>
                    <Typography>File : {docs[item].name}</Typography>
                    <Typography>
                      Size :
                      {filesize(docs[item].size, {
                        base: 2,
                        standard: "jedec",
                      })}
                    </Typography>
                  </Stack>
                  {/* <Box>{JSON.stringify(docs[item].name) + item}</Box> */}
                </Stack>
              </Paper>
            ) : null;
          })}
        </Scrollbars>

        {/* </Scrollbars> */}
        <LoadingButton
          loading={loading}
          onClick={() => uploadFiles()}
          variant="contained"
        >
          {touched ? " Upload Files" : "continue"}
        </LoadingButton>
      </Stack>
      {/* {docs?.map((file: File) => {
        return <Chip label={file.name}></Chip>;
      })} */}
    </Paper>
  );
}

export default UploaderComponent;
