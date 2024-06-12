// package com.cnjava.book_store.Order;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;
// import java.util.stream.Collectors;

// @Service
// public class OrderService {

//     @Autowired
//     private OrderRepository orderRepository;

//     @Autowired
//     private OrderMapper orderMapper;

//     public List<OrderDTO> getAllOrders() {
//         return orderRepository.findAll().stream()
//                 .map(orderMapper::toDTO)
//                 .collect(Collectors.toList());
//     }

//     public OrderDTO getOrderById(Long id) {
//         Optional<Order> order = orderRepository.findById(id);
//         return order.map(orderMapper::toDTO)
//                 .orElseThrow(() -> new RuntimeException("Order not found"));
//     }

//     public OrderDTO createOrder(OrderDTO orderDTO) {
//         Order order = orderMapper.toEntity(orderDTO);
//         order = orderRepository.save(order);
//         return orderMapper.toDTO(order);
//     }

//     public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
//         Order existingOrder = orderRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Order not found"));
//         Order order = orderMapper.toEntity(orderDTO);
//         order.setId(existingOrder.getId());
//         order = orderRepository.save(order);
//         return orderMapper.toDTO(order);
//     }

//     public void deleteOrder(Long id) {
//         orderRepository.deleteById(id);
//     }
// }
package com.cnjava.book_store.Order;

import com.cnjava.book_store.Customer.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order createOrder(Customer customer, List<OrderItem> orderItems) {
        Order order = new Order();
        order.setCustomer(customer);
        order.setOrderItems(orderItems);
        orderItems.forEach(item -> item.setOrder(order));
        return orderRepository.save(order);
    }

    public Order updateOrder(Long id, Customer customer, OrderStatus status, List<OrderItem> orderItems) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setCustomer(customer);
        order.setStatus(status);
        order.setOrderItems(orderItems);
        orderItems.forEach(item -> item.setOrder(order));
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
