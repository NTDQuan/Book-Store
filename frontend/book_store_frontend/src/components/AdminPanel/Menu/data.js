import homeIcon from "../../../assets/home_icon.svg"
import bookIcon from "../../../assets/book_list_admin_icon.svg"
import authorIcon from "../../../assets/author_list_icon.svg"
import categoryIcon from "../../../assets/category_list_icon.svg"
import staffIcon from "../../../assets/staff_icon.svg";
import customerIcon from "../../../assets/customer_icon.svg";
import orderIcon from "../../../assets/order_icon.svg";
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
    ],
  },
  {
    id: 2,
    title: "LIST",
    listItems: [
      {
        id: 1,
        title: "Books",
        url: "/admin/books",
        icon: bookIcon,
      },
      {
        id: 2,
        title: "Authors",
        url: "/admin/authors",
        icon: authorIcon,
      },
      {
        id: 3,
        title: "Categories",
        url: "/admin/categories",
        icon: categoryIcon,
      },
      {
        id: 4,
        title: "Staffs",
        url: "/admin/staffs",
        icon: staffIcon,
      },
      {
        id: 5,
        title: "Customers",
        url: "/admin/customers",
        icon: customerIcon,
      },
      {
        id: 6,
        title: "Orders",
        url: "/admin/orders",
        icon: orderIcon,
      }
    ],
  },
];