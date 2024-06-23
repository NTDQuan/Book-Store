package com.cnjava.book_store.Cart.mapper;

import com.cnjava.book_store.Cart.Cart;
import com.cnjava.book_store.Cart.CartDTO;
import com.cnjava.book_store.CartItem.mapper.CartItemMapper;

public class CartMapper {
	public static CartDTO mapToCartDTO(Cart cart) {
		CartDTO cartDTO = new CartDTO();
		cartDTO.setId(cart.getId());
		cartDTO.setTotalPrice(cart.getTotalPrice());
		cartDTO.setUser_id(cart.getUser().getId());
		cartDTO.setCartItems(CartItemMapper.mapToCartItemDTOList(cart.getCartItems()));
		return cartDTO;
	}
}
