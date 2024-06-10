package com.cnjava.book_store.Order;

import java.util.List;

public interface OrderService {
    List<Order> findAll();

    void createOrder(Order newOrder);

    Order getOrderById(Long id);

    boolean deleteOrderById(Long id);

    boolean updateOrder(Long id, Order updatedOrder);
}
