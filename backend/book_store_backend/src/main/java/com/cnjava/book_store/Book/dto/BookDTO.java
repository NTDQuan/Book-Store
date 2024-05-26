package com.cnjava.book_store.Book.dto;

import com.cnjava.book_store.Author.Author;
import com.cnjava.book_store.Category.Category;

public class BookDTO {
	private long id;
	private String title;
	private String author;
	private String category;
	private String book_cover;
	private int stock;
	private String description;
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
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
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

	
	
}
