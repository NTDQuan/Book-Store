package com.cnjava.book_store.Order;

import com.cnjava.book_store.Book.Book;
import com.cnjava.book_store.Customer.Customer;
import com.cnjava.book_store.Customer.CustomerRepository;
import com.cnjava.book_store.Book.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class OrderMapper {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BookRepository bookRepository;

    public Order toEntity(OrderDTO orderDTO) {
        Customer customer = customerRepository.findById(orderDTO.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Order order = new Order();
        order.setCustomer(customer);
        order.setStartDate(orderDTO.getStartDate());
        order.setStatus(orderDTO.getStatus());
        order.setOrderItems(orderDTO.getOrderItems().stream()
                .map(this::toEntity)
                .collect(Collectors.toList()));
        return order;
    }

    public OrderItem toEntity(OrderItemDTO orderItemDTO) {
        Book book = bookRepository.findById(orderItemDTO.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return new OrderItem(null, book, orderItemDTO.getQuantity());
    }

    public OrderDTO toDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setCustomerId(order.getCustomer().getId());
        orderDTO.setStartDate(order.getStartDate());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setOrderItems(order.getOrderItems().stream()
                .map(this::toDTO)
                .collect(Collectors.toList()));
        return orderDTO;
    }

    public OrderItemDTO toDTO(OrderItem orderItem) {
        OrderItemDTO orderItemDTO = new OrderItemDTO();
        orderItemDTO.setBookId(orderItem.getBook().getId());
        orderItemDTO.setQuantity(orderItem.getQuantity());
        return orderItemDTO;
    }
}
