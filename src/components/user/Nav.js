import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { usePathname } from "../../hooks/usePathname";
import { Link as RouterLink } from "react-router-dom";

import { useResponsive } from "../../hooks/useResponsive";

import { account } from "../../mock/account";

import Logo from "../Logo";
import Scrollbar from "../scrollbar";

import { NAV } from "../../app/configLayout";
import navConfig from "../../app/configNavigation";
import { Collapse } from "@mui/material";

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item, index) => {
        if (item.title === "order") {
          return (
            <NestedNavItem
              key={item.title}
              item={item}
              id={index}
              subItem={item.subItem}
            />
          );
        } else {
          return <NavItem key={item.title} item={item} id={index} />;
        }
      })}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item, id }) {
  const urlParams = new URLSearchParams(window.location.search);
  const idx = urlParams.get("id");
  let active = null;
  if (idx === null && item.id === 0) {
    active = true;
  } else {
    active = item.id === parseInt(idx);
  }

  return (
    <ListItemButton
      component={RouterLink}
      to={`/?id=${id}`}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

function NestedNavItem({ item, subItem, id }) {
  const [open, setOpen] = useState(false);

  const handleSubNav = () => setOpen(!open);

  const urlParams = new URLSearchParams(window.location.search);
  const idx = urlParams.get("id");
  let active = null;
  if (idx === null && item.id === 0) {
    active = true;
  } else {
    active = item.id === parseInt(idx);
  }

  return (
    <>
      <ListItemButton
        component={RouterLink}
        to={`/?id=${id}`}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: "body2",
          color: "text.secondary",
          textTransform: "capitalize",
          justifyContent: "space-between",
          fontWeight: "fontWeightMedium",
          ...(active && {
            color: "primary.main",
            fontWeight: "fontWeightSemiBold",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
        }}
        onClick={handleSubNav}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
            {item.icon}
          </Box>

          <Box component="span">{item.title} </Box>
        </Box>

        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {subItem.map((subItem, index) => (
          <ListItemButton
            sx={{
              minHeight: 44,
              borderRadius: 0.75,
              typography: "body2",
              color: "text.secondary",
              textTransform: "capitalize",
              fontWeight: "fontWeightMedium",
            }}
            key={subItem.title}
          >
            <Box sx={{ display: "flex", flexDirection: "row", ml: 3 }}>
              <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
                {subItem.icon}
              </Box>

              <Box component="span">{subItem.title} </Box>
            </Box>
          </ListItemButton>
        ))}
      </Collapse>
    </>
  );
}

NestedNavItem.propTypes = {
  item: PropTypes.object,
};

NavItem.propTypes = {
  item: PropTypes.object,
};
