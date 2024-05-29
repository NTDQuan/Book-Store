import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/admin/staff-managerment/"; // Địa chỉ API của backend

export function getStaffData() {
  return axios
    .get(REST_API_BASE_URL + "staffs") // Thêm 'staffs' vào đường dẫn để phù hợp với API của bạn
    .then((response) => {
      if (response.status === 200) {
        console.log("Fetched staff data successfully");
        return response.data;
      } else {
        throw new Error("Failed to fetch staff data");
      }
    })
    .catch((error) => {
      console.error("Error fetching staff data", error);
      throw error;
    });
}
