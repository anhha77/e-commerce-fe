import SvgColor from "../components/SvgColor";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "#",
    icon: icon("ic_analytics"),
    id: 0,
  },
  {
    title: "product",
    path: "#",
    icon: icon("ic_cart"),
    id: 1,
    subItem: [
      {
        title: "list products",
        path: "#",
        icon: icon("ic_productlist"),
        id: 0,
      },
      {
        title: "create product",
        path: "#",
        icon: icon("ic_addproduct"),
        id: 1,
      },
    ],
  },
  {
    title: "order",
    path: "#",
    icon: icon("ic_order"),
    id: 2,
    subItem: [
      {
        title: "list orders",
        path: "#",
        icon: icon("ic_orderlist"),
        id: 0,
      },
      {
        title: "create order",
        path: "#",
        icon: icon("ic_productdetail"),
        id: 1,
      },
    ],
  },
  {
    title: "customer",
    path: "#",
    icon: icon("ic_customer"),
    id: 3,
    subItem: [
      {
        title: "list customers",
        path: "/admin/users",
        icon: icon("ic_customerlist"),
        id: 0,
      },
      {
        title: "create customer",
        path: "/admin/create_user",
        icon: icon("ic_customerdetail"),
        id: 1,
      },
    ],
  },
  {
    title: "account",
    path: "/admin/users/me",
    icon: icon("ic_user"),
    id: 4,
  },
  {
    title: "setting",
    path: "#",
    icon: icon("ic_setting"),
    id: 5,
  },
];

export default navConfig;
