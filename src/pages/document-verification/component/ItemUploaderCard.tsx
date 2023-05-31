import ArticleIcon from "@mui/icons-material/Article";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DescriptionIcon from "@mui/icons-material/Description";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import Files from "react-files";
import { toast } from "react-toastify";

type Props = {
  title: string;
  downloadLink: string;
  description: string;
  selectFile: any;
  uploaderFunction: any;
  id: any;
};

function ItemUploaderCard({
  title,
  downloadLink,
  description,
  selectFile,
  id,
  uploaderFunction,
}: Props) {
  const [file, setFile] = useState<any>(null);
  function handleDownload() {
    const fileUrl = downloadLink;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("target", "blank");
    link.setAttribute("download", "example.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleFileSelect(file: any) {
    console.log(file);
    if (file.length > 0) {
      selectFile(file[0], title);
      setFile(file[0]);
    }
  }
  function clearFile(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();
    selectFile(null, title);
    setFile(null);
  }
  return (
    <Card
      elevation={6}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <Box sx={{ display: "flex" }}>
        <CardMedia
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* {downloadLink} */}
          <ArticleIcon
            sx={{
              width: "150px",
              height: "120px",
              color: "grey",
            }}
          />
        </CardMedia>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          {downloadLink ? (
            <IconButton
              onClick={() => handleDownload()}
              color="primary"
              size="large"
              sx={{
                maxWidth: 40,
              }}
            >
              <CloudDownloadIcon />
            </IconButton>
          ) : null}
        </CardContent>
      </Box>
      {/* <Input type="file" /> */}
      <CardActions>
        <Files
          className="files-dropzone"
          accepts={[
            ".doc",
            ".docx",
            ".pdf",
            ".xls",
            ".xlsx",
            ".ppt",
            ".pptx",
            ".txt",
            ".rtf",
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/bmp",
            "image/tiff",
          ]}
          // multiple
          maxFileSize={10000000}
          onChange={(file) => handleFileSelect(file)}
          minFileSize={0}
          onError={(error, file) => {
            toast(error.message, { type: "error" });
          }}
          clickable
        >
          {/* <IconButton >
            <DeleteIcon color="error" />
          </IconButton> */}
          {!file ? (
            <Box
              sx={{
                display: "Flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
                maxWidth: "100px",
              }}
            >
              <FileUploadIcon color="primary" />
              <Typography fontSize={12}>
                Drop files here or click to upload
              </Typography>
            </Box>
          ) : (
            <Box>
              <Stack justifyContent="center" alignItems="center" spacing={2}>
                <Button size="small" onClick={(event) => clearFile(event)}>
                  CLEAR
                </Button>
                <DescriptionIcon />
                <Stack justifyContent="center" alignItems="center">
                  <Typography>{file.name.substring(0, 18)}</Typography>
                  <Typography>{file.sizeReadable}</Typography>
                </Stack>
                {/* <Button
                  size="small"
                  variant="outlined"
                  onClick={(event) => clearFile(event)}
                >
                  Upload
                </Button> */}
              </Stack>
            </Box>
          )}
        </Files>
      </CardActions>
    </Card>
  );
}

export default ItemUploaderCard;
