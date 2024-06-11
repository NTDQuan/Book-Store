package com.cnjava.book_store.Order;

import com.cnjava.book_store.Book.dto.BookDTO;
import com.cnjava.book_store.Customer.CustomerDTO;

import java.time.LocalDateTime;

public class OrderDTO {
    private Long id;
    private CustomerDTO customer;
    private BookDTO book;
    private int quantity;
    private double totalPrice;
    private LocalDateTime createdAt;
    private OrderStatus status;
    
    // Constructor
    public OrderDTO() {
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public CustomerDTO getCustomer() {
        return customer;
    }
    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }
    public BookDTO getBook() {
        return book;
    }
    public void setBook(BookDTO book) {
        this.book = book;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public double getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public OrderStatus getStatus() {
        return status;
    }
    public void setStatus(OrderStatus status) {
        this.status = status;
    }

}
