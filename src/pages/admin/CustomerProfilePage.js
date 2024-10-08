import React, { useEffect, useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {
  Box,
  Chip,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { capitalCase } from "change-case";
import UserOrderList from "../../components/user/UserOrderList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCustomer } from "../../features/customerSlice";
import LoadingScreen from "../../components/LoadingScreen";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";
import CustomerDetail from "../../components/admin/CustomerDetail";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

function CustomerProfilePage() {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState("general");
  const { selectedCustomer, isLoading } = useSelector(
    (state) => state.customer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hi");
    dispatch(getSingleCustomer({ id }));
  }, [dispatch, id]);

  const ACCOUNT_TABS = [
    {
      value: "general",
      icon: <AccountBoxIcon sx={{ fontSize: 20 }} />,
      component: <CustomerDetail user={selectedCustomer} />,
    },
    {
      value: "orders",
      icon: <ShoppingBasketIcon sx={{ fontSize: 20 }} />,
      component: <UserOrderList />,
    },
  ];

  return (
    <>
      {isLoading || !selectedCustomer ? (
        <LoadingScreen />
      ) : (
        <Container>
          <Stack
            direction="row"
            component={RouterLink}
            to={"/admin/users"}
            gap={1}
            sx={{
              textDecoration: "none",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 20 }} />
            <Typography
              variant="p"
              gutterBottom
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Customers List
            </Typography>
          </Stack>

          <Stack direction="row" gap={2}>
            <Typography variant="h5" gutterBottom>
              {selectedCustomer?.username}
            </Typography>
            {selectedCustomer?.isDeleted ? (
              <Chip
                label="Deleted"
                color="error"
                icon={<ClearIcon sx={{ width: "16px" }} />}
              />
            ) : (
              <Chip
                label="Active"
                color="success"
                icon={<CheckIcon sx={{ width: "16px" }} />}
              />
            )}
          </Stack>

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
      )}
    </>
  );
}

export default CustomerProfilePage;
