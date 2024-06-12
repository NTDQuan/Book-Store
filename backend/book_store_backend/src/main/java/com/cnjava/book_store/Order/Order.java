package com.cnjava.book_store.Order;

import com.cnjava.book_store.Customer.Customer;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(name = "start_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "total_price")
    private Double totalPrice;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Order() {
        // Default constructor
    }

    public Order(Customer customer, Date startDate, OrderStatus status, List<OrderItem> orderItems) {
        this.customer = customer;
        this.startDate = startDate;
        this.status = status;
        this.orderItems = orderItems;
        this.totalPrice = calculateTotalPrice();
    }

    public Double calculateTotalPrice() {
        return orderItems.stream()
                .mapToDouble(orderItem -> orderItem.getBook().getPrice() * orderItem.getQuantity())
                .sum();
    }

    @PrePersist
    @PreUpdate
    public void updateTotalPrice() {
        this.totalPrice = calculateTotalPrice();
    }
}
