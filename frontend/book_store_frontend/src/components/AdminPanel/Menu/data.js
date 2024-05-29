import homeIcon from "../../../assets/home_icon.svg"
import staffIcon from "../../../assets/staff_icon.svg"
export const menu = [
  {
    id: 1,
    title: "MAIN",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/admin",
        icon: homeIcon,
      },
      {
        id: 2,
        title: "Staff",
        url: "/admin/staff",
        icon: staffIcon,
      },
    ],
  },
];