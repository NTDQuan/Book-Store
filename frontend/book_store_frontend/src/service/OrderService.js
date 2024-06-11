import axios from "axios";

const BASE_URL = "http://localhost:8080/admin/order-management"; // Thay đổi URL API của bạn tại đây

const getOrdersData = async () => {
  return axios
    .get(`${BASE_URL}/orders`)
    .then((response) => {
      if (response.status === 200) {
        console.log("fetch data");
        return response.data;
      } else {
        throw new Error("Failed to fetch orders");
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

const addOrder = async (orderData) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const deleteOrder = async (orderID) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderID}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getOrderDataByID = async (orderID) => {
  return axios
    .get(`${BASE_URL}/orders/${orderID}`)
    .then((response) => {
      if (response.status === 200) {
        console.log("fetch data");
        return response.data;
      } else {
        throw new Error("Failed to fetch order");
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const updateOrder = async (orderID, orderData) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export { getOrdersData, addOrder, deleteOrder, getOrderDataByID, updateOrder };