package com.cnjava.book_store.Order;

import java.util.Date;
import java.util.List;

public class OrderDTO {
    private Long id;
    private Long customerId;
    private Date startDate;
    private OrderStatus status;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getCustomerId() {
        return customerId;
    }
    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }
    public Date getStartDate() {
        return startDate;
    }
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
    public OrderStatus getStatus() {
        return status;
    }
    public void setStatus(OrderStatus status) {
        this.status = status;
    }
    private List<OrderItemDTO> orderItems;
    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }
    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }

}
