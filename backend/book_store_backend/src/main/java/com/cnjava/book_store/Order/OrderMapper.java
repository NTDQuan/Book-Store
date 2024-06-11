// package com.cnjava.book_store.Order;

// import org.mapstruct.Mapper;
// import org.mapstruct.factory.Mappers;

// @Mapper
// public interface OrderMapper {
//     OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

//     OrderDTO toDTO(Order order);

//     Order toEntity(OrderDTO newOrderDTO);
// }
package com.cnjava.book_store.Order;

import com.cnjava.book_store.Book.mapper.BookMapper;
import com.cnjava.book_store.Customer.CustomerMapper;
import com.cnjava.book_store.Order.Order;
import com.cnjava.book_store.Order.OrderDTO;

public class OrderMapper {

    public static OrderDTO toDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setCustomer(CustomerMapper.toDTO(order.getCustomer()));
        orderDTO.setBook(BookMapper.mapToBookDTO(order.getBook()));
        orderDTO.setQuantity(order.getQuantity());
        orderDTO.setTotalPrice(order.getTotalPrice());
        orderDTO.setCreatedAt(order.getCreatedAt());
        orderDTO.setStatus(order.getStatus());
        return orderDTO;
    }

    public static Order toEntity(OrderDTO orderDTO) {
        Order order = new Order();
        order.setId(orderDTO.getId());
        order.setCustomer(CustomerMapper.toEntity(orderDTO.getCustomer()));
        order.setBook(BookMapper.toEntity(orderDTO.getBook()));
        order.setQuantity(orderDTO.getQuantity());
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setCreatedAt(orderDTO.getCreatedAt());
        order.setStatus(orderDTO.getStatus());
        return order;
    }
}
