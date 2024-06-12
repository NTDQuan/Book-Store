package com.cnjava.book_store.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    public void deleteOrderItem(Long id) {
        orderItemRepository.deleteById(id);
    }
}
