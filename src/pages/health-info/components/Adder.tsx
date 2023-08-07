import { Button, IconButton, Input, Stack, TextField } from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

type Props = { render; setter };

function Adder({ render, setter }: Props) {
  const changeValue = (data, i) => {
    setter(
      render?.map((item, index) => {
        if (index == i) {
          return data;
        } else return data;
      })
    );
  };
  return (
    <Stack gap={2} mt={5}>
      {render?.map((item, i) => {
        return (
          <Stack direction>
            <TextField
              fullWidth
              onChange={(e) => changeValue(e.target.value, i)}
            ></TextField>
            {i == render.length - 1 ? (
              <IconButton   onClick={() => setter([...render, ""])}><AddIcon/>  </IconButton>
            ) : (
              <IconButton
                onClick={() => setter(render.filter((item, index) => i != index))}
                color="error"
              >
                <CloseIcon/>
              </IconButton>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
}

export default Adder;
