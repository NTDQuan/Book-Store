package com.cnjava.book_store.Book;

import java.util.List;

import com.cnjava.book_store.Author.Author;
import com.cnjava.book_store.Category.Category;
import com.cnjava.book_store.Order.OrderItem;
// import com.cnjava.book_store.Order.Order;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "book")
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false, length = 255)
	private String title;	
	
	@JoinColumn(name = "author_id", nullable = true)
	@ManyToOne()
	private Author author;
	
	@ManyToOne()
	@JoinColumn(name = "category_id", nullable = true)
	private Category category;
    
	// @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
	// private List<OrderItem> orderItems;
	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItem> orderItems;

	private String book_cover;
	private int stock;
	private String description;
	private Double price;
	public Book() {
		
	}
	
	public Book(long id, String title, Author author, Category category, String book_cover, int stock,
			String description) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.category = category;
		this.book_cover = book_cover;
		this.stock = stock;
		this.description = description;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Author getAuthor() {
		return author;
	}
	public void setAuthor(Author author) {
		this.author = author;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	public String getBook_cover() {
		return book_cover;
	}
	public void setBook_cover(String book_cover) {
		this.book_cover = book_cover;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}
	
	
	
	
}
