package com.cnjava.book_store.Order;

import java.util.List;
import java.util.Map;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cnjava.book_store.Book.Book;
import com.cnjava.book_store.Customer.Customer;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/order-management")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> findAllOrders() {
        return ResponseEntity.ok(orderService.findAll());
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            return new ResponseEntity<>(order, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping()
    public ResponseEntity<Map<String, String>> createOrder(@RequestBody OrderDTO orderDTO) {
        orderService.createOrder(orderDTO);
        Map<String, String> response = Collections.singletonMap("message", "Order added successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/orders/{id}")
    public ResponseEntity<String> deleteOrderById(@PathVariable Long id) {
        boolean deleted = orderService.deleteOrderById(id);
        if (deleted) {
            return new ResponseEntity<>("Order deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/orders/{id}")
    public ResponseEntity<Map<String, String>> updateOrderStatus(@PathVariable Long id, @RequestBody OrderStatus status) {
        boolean updated = orderService.updateOrderStatus(id, status);
        if (updated) {
            Map<String, String> response = Collections.singletonMap("message", "Order updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}