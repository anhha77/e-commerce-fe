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
    title: "product",
    path: "#",
    icon: icon("ic_cart"),
    id: 0,
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
      {
        title: "product details",
        path: "#",
        icon: icon("ic_productdetail"),
        id: 2,
      },
    ],
  },
  {
    title: "account",
    path: "#",
    icon: icon("ic_user"),
    id: 1,
  },
  {
    title: "setting",
    path: "#",
    icon: icon("ic_setting"),
    id: 2,
  },
  {
    title: "dashboard",
    path: "#",
    icon: icon("ic_analytics"),
    id: 3,
  },
  {
    title: "order",
    path: "#",
    icon: icon("ic_order"),
    id: 4,
    subItem: [
      {
        title: "list orders",
        path: "#",
        icon: icon("ic_orderlist"),
        id: 0,
      },
      {
        title: "order details",
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
    id: 5,
    subItem: [
      {
        title: "list customers",
        path: "#",
        icon: icon("ic_customerlist"),
        id: 0,
      },
      {
        title: "customer details",
        path: "#",
        icon: icon("ic_customerdetail"),
        id: 1,
      },
    ],
  },
];

export default navConfig;
