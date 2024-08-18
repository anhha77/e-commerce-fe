import React, { useState } from "react";
import { capitalCase } from "change-case";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ProfileDetail from "../components/user/ProfileDetail";
import PaymentIcon from "@mui/icons-material/Payment";
import PaymentDetail from "../components/user/PaymentDetail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PasswordDetail from "../components/user/PasswordDetail";
import useAuth from "../hooks/useAuth";

function ProfilePage() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("general");

  const ACCOUNT_TABS =
    user.role === "admin"
      ? [
          {
            value: "general",
            icon: <AccountBoxIcon sx={{ fontSize: 20 }} />,
            component: <ProfileDetail user={user} />,
          },
          {
            value: "payment",
            icon: <PaymentIcon sx={{ fontSize: 20 }} />,
            component: <PaymentDetail />,
          },
          {
            value: "password",
            icon: <VpnKeyIcon sx={{ fontSize: 20 }} />,
            component: <PasswordDetail />,
          },
        ]
      : [
          {
            value: "general",
            icon: <AccountBoxIcon sx={{ fontSize: 20 }} />,
            component: <ProfileDetail user={user} />,
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
