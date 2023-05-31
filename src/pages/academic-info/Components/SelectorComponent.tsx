// Import Swiper styles
import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect } from "react";

type Props = {
  items;
  setterMethod;
  nameSelector;
  selection;
  setSelection;
  idSelector;
};

function SelectorComponent({
  items,
  setterMethod,
  selection,
  nameSelector,
  setSelection,
  idSelector,
}: Props) {
  useEffect(() => {}, [selection]);
  const selectItem = (courseId) => {
    if (nameSelector === "courseName") {
      setSelection({ ...selection, courseId });
    }
  };
  const isSelected = (item) => {
    return item[idSelector] === selection[idSelector];
  };
  return (
    <Stack
      sx={{
        height: "70vh",
        overflowY: "scroll",
      }}
      gap={0.5}
    >
      {items?.map((item, index) => {
        return (
          <Button
            size="small"
            onClick={() => selectItem(item[idSelector])}
            key={index}
            variant={isSelected(item[idSelector]) ? "outlined" : "filled"}
          >
            {item[nameSelector]}
          </Button>
        );
      })}
    </Stack>
  );
}

export default SelectorComponent;
