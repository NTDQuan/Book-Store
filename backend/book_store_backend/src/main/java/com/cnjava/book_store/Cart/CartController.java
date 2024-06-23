package com.cnjava.book_store.Cart;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cnjava.book_store.CartItem.CartItem;
import com.cnjava.book_store.CartItem.CartItemDTO;
import com.cnjava.book_store.CartItem.mapper.CartItemMapper;
import com.cnjava.book_store.User.User;
import com.cnjava.book_store.User.UserRepository;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/carts")
public class CartController {
	@Autowired
	private CartService cartService;
	
    @Autowired
    private UserRepository userRepository;
	
	@PostMapping("/items")
	public ResponseEntity<CartDTO> addCartItemToCart(@RequestBody CartItemDTO cartItemRequest) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String currentUsername = authentication.getName();
	    User currentUser = userRepository.findByUsername(currentUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));
	    CartDTO cartDTO = cartService.getOrCreateCartDTO(currentUser.getId());
	    cartService.addCartItemToCart(cartDTO.getId(), cartItemRequest.getBookId(), cartItemRequest.getQuantity());
	    // Fetch the updated cart details
	    CartDTO updatedCartDTO = cartService.getOrCreateCartDTO(currentUser.getId());
	    return ResponseEntity.ok(updatedCartDTO);
	}
    
    @GetMapping("/user")
    public ResponseEntity<CartDTO> getUserCart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User currentUser = userRepository.findByUsername(currentUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));
        CartDTO cartDTO = cartService.getOrCreateCartDTO(currentUser.getId());
        return ResponseEntity.ok(cartDTO);
    }
    
    @DeleteMapping("/items/{bookId}")
    public ResponseEntity<CartDTO> removeCartItem(@PathVariable Long bookId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User currentUser = userRepository.findByUsername(currentUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));
        CartDTO cartDTO = cartService.getOrCreateCartDTO(currentUser.getId());
        cartService.deleteCartItem(cartDTO.getId(), bookId);
        // Fetch the updated cart details
        CartDTO updatedCartDTO = cartService.getOrCreateCartDTO(currentUser.getId());
        return ResponseEntity.ok(updatedCartDTO);
    }
    
    @PutMapping("/items/{bookId}/quantity")
    public ResponseEntity<CartItem> updateCartItemQuantity(
            @PathVariable Long bookId,
            @RequestBody Map<String, Integer> body) {
        int quantity = body.get("quantity");
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User currentUser = userRepository.findByUsername(currentUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));
        CartDTO cartDTO = cartService.getOrCreateCartDTO(currentUser.getId());
        
        CartItem updatedCartItem = cartService.updateCartItemQuantity(cartDTO.getId(), bookId, quantity);
        return ResponseEntity.ok(updatedCartItem);
    }
}
