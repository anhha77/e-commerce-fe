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
    title: "order",
    path: "#",
    icon: icon("ic_order"),
    id: 1,
  },
  {
    title: "account",
    path: "/users/me",
    icon: icon("ic_user"),
    id: 2,
  },
  {
    title: "setting",
    path: "#",
    icon: icon("ic_setting"),
    id: 3,
  },
];

export default navConfig;
