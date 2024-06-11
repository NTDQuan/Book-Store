package com.cnjava.book_store.Order;

import com.cnjava.book_store.Book.Book;
import com.cnjava.book_store.Customer.Customer;

import java.util.List;

public interface OrderService {
    List<Order> findAll();

    Order getOrderById(Long id);

    void createOrder(Customer customer, Book book, int quantity);

    boolean updateOrderStatus(Long id, OrderStatus status);

    boolean deleteOrderById(Long id);

    void createOrder(OrderDTO orderDTO);
}
