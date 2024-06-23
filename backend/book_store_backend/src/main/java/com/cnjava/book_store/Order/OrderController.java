package com.cnjava.book_store.Order;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnjava.book_store.Cart.CartService;
import com.cnjava.book_store.Order.mapper.OrderMapper;
import com.cnjava.book_store.User.User;
import com.cnjava.book_store.User.UserRepository;

import jakarta.annotation.Nullable;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/orders")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
    @Autowired
    private UserRepository userRepository;
	
    @PostMapping("/place-order")
    public ResponseEntity<OrderDTO> placeOrder(@RequestBody OrderRequestDTO orderRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User currentUser = userRepository.findByUsername(currentUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        Order order = orderService.placeOrder(currentUser.getId(), orderRequest.getContractNumber(), orderRequest.getFullName(), orderRequest.getAddress());
        OrderDTO orderDTO = OrderMapper.mapToOrderDTO(order);
        return ResponseEntity.ok(orderDTO);
    }
    
    @PostMapping("/admin/confirm-order/{orderId}")
    public ResponseEntity<OrderDTO> confirmOrder(@PathVariable Long orderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User staff = userRepository.findByUsername(currentUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        Order order = orderService.confirmOrder(orderId, staff);
        OrderDTO orderDTO = OrderMapper.mapToOrderDTO(order);
        return ResponseEntity.ok(orderDTO);
    }

    @PostMapping("/admin/refuse-order/{orderId}")
    public ResponseEntity<OrderDTO> refuseOrder(@PathVariable Long orderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User staff = userRepository.findByUsername(currentUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        Order order = orderService.refuseOrder(orderId, staff);
        OrderDTO orderDTO = OrderMapper.mapToOrderDTO(order);
        return ResponseEntity.ok(orderDTO);
    }
    
    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderDTO>> getMyOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User currentUser = userRepository.findByUsername(currentUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Order> orders = orderService.getOrdersByUserId(currentUser.getId());
        List<OrderDTO> orderDTOs = orders.stream().map(OrderMapper::mapToOrderDTO).collect(Collectors.toList());

        return ResponseEntity.ok(orderDTOs);
    }

    @GetMapping("/admin/all-orders")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        List<OrderDTO> orderDTOs = orders.stream().map(OrderMapper::mapToOrderDTO).collect(Collectors.toList());

        return ResponseEntity.ok(orderDTOs);
    }
    
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }
}
