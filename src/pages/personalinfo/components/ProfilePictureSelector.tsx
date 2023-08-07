import { Avatar, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useRef, useEffect } from "react";
import { getProfilePicture, setProfileImage } from "../../../api/APIS/wizard-api";
import { toast } from "react-toastify";
// import { Avatar, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    cursor: "pointer",
  },
  input: {
    display: "none",
  },
}));

const ProfilePictureSelector = () => {
  const classes = useStyles();
  const [profilePicture, setProfilePicture] = useState(null);
  const inputRef = useRef(null);
  useEffect(() => {
    getProfilePicture().then((link) => {
      setProfilePicture(link);
    });
  },[]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
    // if (file) {
      const convertAndUploadImage = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function (event) {
            const image = new Image();
            image.src = event.target.result;
            image.onload = function () {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              // Set the desired width and height
              const maxWidth = 800;
              const maxHeight = 800;
              let width = image.width;
              let height = image.height;

              if (width > height) {
                if (width > maxWidth) {
                  height *= maxWidth / width;
                  width = maxWidth;
                }
              } else {` `
                if (height > maxHeight) {
                  width *= maxHeight / height;
                  height = maxHeight;
                }
              }
  
              // Resize the canvas to the new dimensions
              canvas.width = width;
              canvas.height = height;
  
              // Draw the image on the canvas
              ctx.drawImage(image, 0, 0, width, height);
  
              // Convert the canvas image to a Blob with reduced size
              canvas.toBlob(
                (blob) => {
                  const convertedFile = new File([blob], file.name, {
                    type: file.type,
                  });
  
                  // Perform the upload operation with the converted file
                  const formData = new FormData();
                  formData.append("file", convertedFile);
                  setProfileImage(formData)
                    .then(() => {
                      toast("Profile Picture Updated");
                      resolve();
                    })
                    .catch((error) => {
                      reject(error);
                    });
                },
                file.type,
                0.7
              );
            };
  
            image.onerror = function (error) {
              reject(error);
            };
          };
  
          reader.onerror = function (error) {
            reject(error);
          };
  
          reader.readAsDataURL(file);
        });
      };
  
      convertAndUploadImage(file)
        .then(() => {
          // Success: Profile picture updated
        })
        .catch((error) => {
          // Error: Failed to update profile picture
          console.error(error);
        });
    // }
  };

  return (
    <div>
        <Typography>Profile Image</Typography>
      <Avatar
        alt="Profile Picture"
        src={profilePicture}
        //   className={classes.avatar}
        onClick={() => {
          inputRef.current.click();
        }}
        sx={{ width: "250px", height: "250px" }}
      />
      <input
        accept="image/*"
        id="profile-picture-input"
        type="file"
        className={classes.input}
        onChange={handleFileChange}
        ref={inputRef}
        
      />
    </div>
  );
};

export default ProfilePictureSelector;
