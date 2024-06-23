package com.cnjava.book_store.CartItem.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.cnjava.book_store.CartItem.CartItem;
import com.cnjava.book_store.CartItem.CartItemDTO;

public class CartItemMapper {
	public static CartItemDTO mapToCartItem(CartItem cartItem) {
		CartItemDTO cartItemDTO = new CartItemDTO();
		cartItemDTO.setBookId(cartItem.getBook().getId());
		cartItemDTO.setQuantity(cartItem.getQuantity());
		return cartItemDTO;
	}
	
	public static List<CartItemDTO> mapToCartItemDTOList(List<CartItem> cartItems) {
		return cartItems.stream()
				.map(CartItemMapper::mapToCartItem)
				.collect(Collectors.toList());
	}
}
