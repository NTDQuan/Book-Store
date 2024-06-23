package com.cnjava.book_store.Order.mapper;

import java.util.stream.Collectors;

import com.cnjava.book_store.Order.Order;
import com.cnjava.book_store.Order.OrderDTO;
import com.cnjava.book_store.OrderItem.OrderItem;
import com.cnjava.book_store.OrderItem.OrderItemDTO;

public class OrderMapper {
    public static OrderDTO mapToOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setUserId(order.getUser().getId());
        if (order.getStaff() != null) {
            orderDTO.setStaffId(order.getStaff().getId());
        }
        orderDTO.setCreatedAt(order.getCreatedAt());
        orderDTO.setTotalPrice(order.getTotalPrice());
        orderDTO.setOrderItems(order.getOrderItems().stream()
                .map(orderItem -> mapToOrderItemDTO(orderItem))
                .collect(Collectors.toList()));
        orderDTO.setContactNumber(order.getContactNumber());
        orderDTO.setFullName(order.getFullName());
        orderDTO.setAddress(order.getAddress());
        orderDTO.setStatus(order.getStatus());
        return orderDTO;
    }
    
    private static OrderItemDTO mapToOrderItemDTO(OrderItem orderItem) {
        OrderItemDTO orderItemDTO = new OrderItemDTO();
        orderItemDTO.setBookId(orderItem.getBook().getId());
        orderItemDTO.setQuantity(orderItem.getQuantity());
        return orderItemDTO;
    }
}
