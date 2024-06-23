package com.cnjava.book_store.Cart;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.cnjava.book_store.CartItem.CartItem;
import com.cnjava.book_store.User.User;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	
    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
	private Date startDate;
    
    @Column(name = "total_price")
    private Double totalPrice;
    
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<CartItem> cartItems;

	public Cart() {
		super();
		this.cartItems = new ArrayList<>();
	}

	public Cart(Long id, User user, Date startDate, Double totalPrice, List<CartItem> cartItems) {
		super();
		this.id = id;
		this.user = user;
		this.startDate = startDate;
		this.totalPrice = totalPrice;
		this.cartItems = cartItems;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public List<CartItem> getCartItems() {
		return cartItems;
	}

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }
    
    public void addCartItem(CartItem cartItem) {
        this.cartItems.add(cartItem);
    }
    
    
}
