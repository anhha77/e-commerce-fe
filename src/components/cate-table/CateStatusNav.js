import { Tab, Tabs, Toolbar } from "@mui/material";
import { capitalCase } from "change-case";
import Label from "../label";

function CateStatusNav({ currentTab, setCurrentTab }) {
  const STATUS_TAB = [
    {
      value: "all",
      chipIcon: (
        <Label
          sx={{
            color: (theme) => theme.palette.common.white,
            backgroundColor: (theme) => theme.palette.common.black,
          }}
        >
          11
        </Label>
      ),
    },
    {
      value: "active",
      chipIcon: (
        <Label
          sx={{
            color: (theme) =>
              currentTab === "active"
                ? theme.palette.success.contrastText
                : theme.palette.success.dark,
            backgroundColor: (theme) =>
              currentTab === "active"
                ? theme.palette.success.main
                : theme.palette.success.lighter,
          }}
        >
          11
        </Label>
      ),
    },
    {
      value: "deleted",
      chipIcon: (
        <Label
          sx={{
            color: (theme) =>
              currentTab === "deleted"
                ? theme.palette.error.contrastText
                : theme.palette.error.dark,
            backgroundColor: (theme) =>
              currentTab === "deleted"
                ? theme.palette.error.main
                : theme.palette.error.lighter,
          }}
        >
          0
        </Label>
      ),
    },
  ];
  return (
    <Toolbar>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => setCurrentTab(value)}
      >
        {STATUS_TAB.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            value={tab.value}
            icon={tab.chipIcon}
            iconPosition="end"
          />
        ))}
      </Tabs>
    </Toolbar>
  );
}

export default CateStatusNav;
