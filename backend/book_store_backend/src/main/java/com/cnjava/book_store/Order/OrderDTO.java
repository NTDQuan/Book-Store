// package com.cnjava.book_store.Order;

// import java.util.List;

// public class OrderDTO {
//     private long id;
//     private String status;
//     private double totalAmount;
//     private List<OrderItemDTO> orderItems;

//     // Getters and setters
//     public long getId() {
//         return id;
//     }

//     public void setId(long id) {
//         this.id = id;
//     }

//     public String getStatus() {
//         return status;
//     }

//     public void setStatus(String status) {
//         this.status = status;
//     }

//     public double getTotalAmount() {
//         return totalAmount;
//     }

//     public void setTotalAmount(double totalAmount) {
//         this.totalAmount = totalAmount;
//     }

//     public List<OrderItemDTO> getOrderItems() {
//         return orderItems;
//     }

//     public void setOrderItems(List<OrderItemDTO> orderItems) {
//         this.orderItems = orderItems;
//     }
// }
package com.cnjava.book_store.Order;

import java.util.List;

public class OrderDTO {
    private Long id;
    private String status;
    private Double totalAmount;
    private Long customerId;
    private List<Long> bookIds;
    private List<Integer> quantities;
    private List<String> bookTitles; // New field for book titles

    // Getters and Setters
    // (Including getters and setters for bookTitles)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public List<Long> getBookIds() {
        return bookIds;
    }

    public void setBookIds(List<Long> bookIds) {
        this.bookIds = bookIds;
    }

    public List<Integer> getQuantities() {
        return quantities;
    }

    public void setQuantities(List<Integer> quantities) {
        this.quantities = quantities;
    }

    public List<String> getBookTitles() {
        return bookTitles;
    }

    public void setBookTitles(List<String> bookTitles) {
        this.bookTitles = bookTitles;
    }
}
