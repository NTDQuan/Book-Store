// package com.cnjava.book_store.Order;

// import java.util.stream.Collectors;

// public class OrderMapper {
//     public static OrderDTO mapToOrderDTO(Order order) {
//         OrderDTO orderDTO = new OrderDTO();
//         orderDTO.setId(order.getId());
//         orderDTO.setStatus(order.getStatus());
//         orderDTO.setTotalAmount(order.getTotalAmount());
//         orderDTO.setOrderItems(order.getOrderItems().stream()
//                 .map(OrderMapper::mapToOrderItemDTO)
//                 .collect(Collectors.toList()));
//         return orderDTO;
//     }

//     public static Order mapToOrder(OrderDTO orderDTO) {
//         Order order = new Order();
//         order.setId(orderDTO.getId());
//         order.setStatus(orderDTO.getStatus());
//         order.setTotalAmount(orderDTO.getTotalAmount());
//         order.setOrderItems(orderDTO.getOrderItems().stream()
//                 .map(OrderMapper::mapToOrderItem)
//                 .collect(Collectors.toList()));
//         return order;
//     }

//     private static OrderItemDTO mapToOrderItemDTO(OrderItem orderItem) {
//         OrderItemDTO orderItemDTO = new OrderItemDTO();
//         orderItemDTO.setId(orderItem.getId());
//         orderItemDTO.setBookTitle(orderItem.getBook().getTitle());
//         orderItemDTO.setQuantity(orderItem.getQuantity());
//         return orderItemDTO;
//     }

//     private static OrderItem mapToOrderItem(OrderItemDTO orderItemDTO) {
//         OrderItem orderItem = new OrderItem();
//         orderItem.setId(orderItemDTO.getId());
//         // Assuming there's a method to fetch a Book by its title or ID
//         // orderItem.setBook(bookService.findBookByTitle(orderItemDTO.getBookTitle()));
//         orderItem.setQuantity(orderItemDTO.getQuantity());
//         return orderItem;
//     }
// }
package com.cnjava.book_store.Order;

public class OrderMapper {
    public static OrderDTO mapToOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setCustomerId(order.getCustomer().getId());
        orderDTO.setBookIds(order.getBookIds());
        orderDTO.setQuantities(order.getQuantities());
        return orderDTO;
    }
}
