// package com.cnjava.book_store.Order;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/admin/order-management")
// public class OrderController {

//     @Autowired
//     private OrderService orderService;

//     @GetMapping
//     public List<OrderDTO> getAllOrders() {
//         return orderService.getAllOrders();
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
//         OrderDTO order = orderService.getOrderById(id);
//         return ResponseEntity.ok(order);
//     }

//     @PostMapping
//     public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
//         OrderDTO newOrder = orderService.createOrder(orderDTO);
//         return ResponseEntity.ok(newOrder);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<OrderDTO> updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
//         OrderDTO updatedOrder = orderService.updateOrder(id, orderDTO);
//         return ResponseEntity.ok(updatedOrder);
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
//         orderService.deleteOrder(id);
//         return ResponseEntity.noContent().build();
//     }
// }
package com.cnjava.book_store.Order;

import com.cnjava.book_store.Customer.Customer;
import com.cnjava.book_store.Customer.CustomerRepository;
import com.cnjava.book_store.Book.Book;
import com.cnjava.book_store.Book.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/order-management")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderDTO orderDTO) {
        try {
            Customer customer = customerRepository.findById(orderDTO.getCustomerId()).orElseThrow();
            List<OrderItem> orderItems = orderDTO.getOrderItems().stream().map(item -> {
                Book book = bookRepository.findById(item.getBookId()).orElseThrow();
                return new OrderItem(null, null, item.getQuantity());
            }).toList();
            Order order = orderService.createOrder(customer, orderItems);
            return new ResponseEntity<>(order, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        try {
            Customer customer = customerRepository.findById(orderDTO.getCustomerId()).orElseThrow();
            List<OrderItem> orderItems = orderDTO.getOrderItems().stream().map(item -> {
                Book book = bookRepository.findById(item.getBookId()).orElseThrow();
                return new OrderItem(null, null, item.getQuantity());
            }).toList();
            Order order = orderService.updateOrder(id, customer, orderDTO.getStatus(), orderItems);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteOrder(@PathVariable Long id) {
        try {
            orderService.deleteOrder(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
