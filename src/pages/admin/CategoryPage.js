import { Button, Card, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Iconify from "../../components/Iconify";
import { useNavigate } from "react-router-dom";
import CateStatusNav from "../../components/cate-table/CateStatusNav";

function CategoryPage() {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState("all");

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Categories</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate("/admin/create_category")}
        >
          New Category
        </Button>
      </Stack>

      <Card>
        <CateStatusNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </Card>
    </Container>
  );
}

export default CategoryPage;
