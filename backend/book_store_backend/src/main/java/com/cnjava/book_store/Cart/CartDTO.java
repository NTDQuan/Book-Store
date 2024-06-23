package com.cnjava.book_store.Cart;

import java.util.ArrayList;
import java.util.List;

import com.cnjava.book_store.CartItem.CartItemDTO;

public class CartDTO {
	private long id;
	private long user_id;
	private double totalPrice;
	private List<CartItemDTO> cartItems;
	
	public CartDTO() {
		this.cartItems = new ArrayList<>();
	}
	
	public CartDTO(long id, long user_id, double totalPrice, List<CartItemDTO> cartItems) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.totalPrice = totalPrice;
		this.cartItems = cartItems;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getUser_id() {
		return user_id;
	}

	public void setUser_id(long user_id) {
		this.user_id = user_id;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public List<CartItemDTO> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItemDTO> cartItems) {
		this.cartItems = cartItems;
	}
	
	
}
