import React, { useState } from "react";
import { capitalCase } from "change-case";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BasicDetail from "../components/user/BasicDetail";
import PaymentIcon from "@mui/icons-material/Payment";
import PaymentDetail from "../components/user/PaymentDetail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PasswordDetail from "../components/user/PasswordDetail";

function ProfilePage() {
  const [currentTab, setCurrentTab] = useState("general");

  const ACCOUNT_TABS = [
    {
      value: "general",
      icon: <AccountBoxIcon sx={{ fontSize: 20 }} />,
      component: <BasicDetail />,
    },
    {
      value: "billing",
      icon: <PaymentIcon sx={{ fontSize: 20 }} />,
      component: <PaymentDetail />,
    },
    {
      value: "password",
      icon: <VpnKeyIcon sx={{ fontSize: 20 }} />,
      component: <PasswordDetail />,
    },
  ];

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Account Settings
      </Typography>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => setCurrentTab(value)}
      >
        {ACCOUNT_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Box sx={{ mb: 5 }} />
      {ACCOUNT_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default ProfilePage;
