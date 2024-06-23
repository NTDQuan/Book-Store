package com.cnjava.book_store.Cart;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnjava.book_store.Book.Book;
import com.cnjava.book_store.Book.BookRepository;
import com.cnjava.book_store.Cart.mapper.CartMapper;
import com.cnjava.book_store.CartItem.CartItem;
import com.cnjava.book_store.CartItem.CartItemRepository;
import com.cnjava.book_store.User.User;
import com.cnjava.book_store.User.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private CartItemRepository cartItemRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
    @Autowired
    private UserRepository userRepository;
	
	public List<Cart> getAllCarts() {
		return cartRepository.findAll();
	}
	
	public Cart getCartById(Long id) {
		return cartRepository.findById(id).orElse(null);
	}
	
	public Cart saveCart(Cart cart) {
		return cartRepository.save(cart);
	}
	
	public void deleteCart(Long id) {
		cartRepository.deleteById(id);
	}
	
	public CartDTO getCartDTOById(Long id) {
	    Cart cart = cartRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Cart not found"));
	    return CartMapper.mapToCartDTO(cart);
	}
	
	public CartDTO getOrCreateCartDTO(Long userId) {
	    Optional<Cart> cartOpt = cartRepository.findByUserId(userId);
	    Cart cart;
	    if (cartOpt.isPresent()) {
	        cart = cartOpt.get();
	    } else {
	        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
	        cart = new Cart();
	        cart.setUser(user);
	        cart.setStartDate(new Date());
	        cart.setTotalPrice(0.0);
	        cart = cartRepository.save(cart);
	    }
	    return CartMapper.mapToCartDTO(cart);
	}
	
    @Transactional
    public CartItem addCartItemToCart(Long cartId, Long bookId, int quantity) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new IllegalArgumentException("Cart not found"));
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException("Book not found"));

        // Check if the cart already contains the item
        Optional<CartItem> existingCartItemOpt = cart.getCartItems().stream()
                .filter(item -> item.getBook().getId() == bookId)
                .findFirst();

        CartItem cartItem;
        if (existingCartItemOpt.isPresent()) {
            // If the item already exists in the cart, update the quantity
            cartItem = existingCartItemOpt.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            // If the item does not exist in the cart, create a new cart item
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setBook(book);
            cartItem.setQuantity(quantity);
            cart.getCartItems().add(cartItem);
        }
        
        CartItem savedCartItem = cartItemRepository.save(cartItem);
        
        // Recalculate the total price
        double updatedTotalPrice = cart.getCartItems().stream()
                .mapToDouble(item -> item.getBook().getPrice() * item.getQuantity())
                .sum();
        cart.setTotalPrice(updatedTotalPrice);
        cartRepository.save(cart);
        
        return savedCartItem;
    }

    @Transactional
    public void deleteCartItem(Long cartId, Long bookId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found"));
        
        // Find the CartItem in the Cart by bookId
        CartItem cartItem = cart.getCartItems().stream()
                .filter(item -> item.getBook().getId() == bookId)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("CartItem not found for bookId: " + bookId));
        
        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);

        // Recalculate the total price
        double updatedTotalPrice = cart.getCartItems().stream()
                .mapToDouble(item -> item.getBook().getPrice() * item.getQuantity())
                .sum();
        cart.setTotalPrice(updatedTotalPrice);
        cartRepository.save(cart);
    }

    @Transactional
    public CartItem updateCartItemQuantity(Long cartId, Long bookId, int quantity) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found"));
        
        // Find the CartItem in the Cart by bookId
        Optional<CartItem> cartItemOpt = cart.getCartItems().stream()
                .filter(item -> item.getBook().getId() == bookId)
                .findFirst();

        if (cartItemOpt.isPresent()) {
            CartItem cartItem = cartItemOpt.get();
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);

            // Recalculate the total price
            double updatedTotalPrice = cart.getCartItems().stream()
                    .mapToDouble(item -> item.getBook().getPrice() * item.getQuantity())
                    .sum();
            cart.setTotalPrice(updatedTotalPrice);
            cartRepository.save(cart);
            
            return cartItem;
        } else {
            throw new IllegalArgumentException("CartItem not found in the cart for book with id: " + bookId);
        }
    }
}
