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
    title: "user",
    path: "#",
    icon: icon("ic_user"),
    id: 1,
  },
  {
    title: "product",
    path: "#",
    icon: icon("ic_cart"),
    id: 2,
  },
  {
    title: "blog",
    path: "#",
    icon: icon("ic_blog"),
    id: 3,
  },
  {
    title: "login",
    path: "#",
    icon: icon("ic_lock"),
    id: 4,
  },
  {
    title: "Not found",
    path: "#",
    icon: icon("ic_disabled"),
    id: 5,
  },
];

export default navConfig;
