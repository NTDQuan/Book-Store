package com.cnjava.book_store.Order;

import com.cnjava.book_store.Book.Book;
import com.cnjava.book_store.Customer.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public void createOrder(Customer customer, Book book, int quantity) {
        double totalPrice = book.getPrice() * quantity;
        Order order = new Order(customer, book, quantity, totalPrice, LocalDateTime.now(), OrderStatus.PENDING);
        book.setStock(book.getStock() - quantity);
        orderRepository.save(order);
    }

    @Override
    public boolean updateOrderStatus(Long id, OrderStatus status) {
        if (!orderRepository.existsById(id)) {
            return false;
        }
        Order order = orderRepository.findById(id).get();
        order.setStatus(status);
        orderRepository.save(order);
        return true;
    }

    @Override
    public boolean deleteOrderById(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public void createOrder(OrderDTO orderDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createOrder'");
    }
}
