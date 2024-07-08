import { useState } from "react";

import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

// ----------------------------------------------------------------------

const LANGS = [
  {
    id: 0,
    label: "English",
    icon: "/assets/icons/ic_flag_en.svg",
  },
  {
    id: 1,
    label: "German",
    icon: "/assets/icons/ic_flag_de.svg",
  },
  {
    id: 2,
    label: "French",
    icon: "/assets/icons/ic_flag_fr.svg",
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);
  const [selectLang, setSelectLang] = useState(0);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: "action.selected",
          }),
        }}
      >
        <img src={LANGS[selectLang].icon} alt={LANGS[selectLang].label} />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 180,
          },
        }}
      >
        {LANGS.map((option) => (
          <MenuItem
            key={option.id}
            selected={option.id === LANGS[selectLang].id}
            onClick={() => {
              setSelectLang(option.id);
              handleClose();
            }}
            sx={{ typography: "body2", py: 1 }}
          >
            <Box
              component="img"
              alt={option.label}
              src={option.icon}
              sx={{ width: 28, mr: 2 }}
            />

            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
