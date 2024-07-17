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
    title: "order",
    path: "#",
    icon: icon("ic_order"),
    id: 3,
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
];

export default navConfig;
