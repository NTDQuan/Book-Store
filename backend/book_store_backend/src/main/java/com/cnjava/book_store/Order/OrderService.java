package com.cnjava.book_store.Order;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.cnjava.book_store.Cart.Cart;
import com.cnjava.book_store.Cart.CartRepository;
import com.cnjava.book_store.CartItem.CartItem;
import com.cnjava.book_store.CartItem.CartItemRepository;
import com.cnjava.book_store.OrderItem.OrderItem;
import com.cnjava.book_store.OrderItem.OrderItemRepository;
import com.cnjava.book_store.User.User;
import com.cnjava.book_store.User.UserRepository;

import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;

@Service
public class OrderService {
	
	@Autowired
	private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Transactional
    public Order placeOrder(Long userId, String contractNumber, String fullName, String address) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("Cart not found"));
        
        Order order = new Order();
        order.setUser(cart.getUser());
        order.setCreatedAt(new Date());
        order.setStatus("PENDING");
        order.setTotalPrice(cart.getTotalPrice());
        order.setContactNumber(contractNumber); 
        order.setFullName(fullName);
        order.setAddress(address); 
        
        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setBook(cartItem.getBook());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getBook().getPrice());
            order.getOrderItems().add(orderItem);
        }
        
        orderRepository.save(order);
        orderItemRepository.saveAll(order.getOrderItems());

        // Clear the cart
        cart.getCartItems().clear();
        cart.setTotalPrice(0.0);
        cartRepository.save(cart);

        return order;
    }
    
    @Transactional
    public Order confirmOrder(Long orderId, User staff) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new IllegalArgumentException("Order not found"));
        if (!order.getStatus().equals("PENDING")) {
            throw new IllegalStateException("Order cannot be confirmed because it is not in PENDING status");
        }
        order.setStaff(staff);
        order.setStatus("CONFIRMED");
        orderRepository.save(order);
        return order;
    }
    
    @Transactional
    public Order refuseOrder(Long orderId, User staff) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new IllegalArgumentException("Order not found"));
        if (!order.getStatus().equals("PENDING")) {
            throw new IllegalStateException("Order cannot be refused because it is not in PENDING status");
        }
        order.setStaff(staff);
        order.setStatus("REFUSED");
        orderRepository.save(order);
        return order;
    }
    
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    @Transactional
    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new IllegalArgumentException("Order not found"));
        orderRepository.delete(order);
    }
    
}
