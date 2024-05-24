import homeIcon from "../../../assets/home_icon.svg"
import bookIcon from "../../../assets/book_list_admin_icon.svg"

export const menu = [
    {
        id: 1,
        title: "MAIN",
        listItems: [
            {
                id: 1,
                title: "Homepage",
                url: "/admin",
                icon: homeIcon
            }
        ]
    },
    {
        id: 2,
        title: "LIST",
        listItems: [
            {
                id: 1,
                title: "Books",
                url: "/admin/books",
                icon: bookIcon
            }
        ]
    }
]