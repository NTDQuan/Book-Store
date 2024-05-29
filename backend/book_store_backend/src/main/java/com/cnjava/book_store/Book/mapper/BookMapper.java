package com.cnjava.book_store.Book.mapper;

import com.cnjava.book_store.Author.Author;
import com.cnjava.book_store.Book.Book;
import com.cnjava.book_store.Book.dto.BookDTO;
import com.cnjava.book_store.Category.Category;

public class BookMapper {
	public static BookDTO mapToBookDTO(Book book) {
		BookDTO bookDTO = new BookDTO();
		bookDTO.setId(book.getId());
		bookDTO.setTitle(book.getTitle());
		if(book.getAuthor() != null) {
			bookDTO.setAuthor(book.getAuthor().getFullName());
		} else {
			bookDTO.setAuthor("");
		}		
		if(book.getCategory() != null) {
			bookDTO.setCategory(book.getCategory().getName());
		} else {
			bookDTO.setCategory("");
		}		
		bookDTO.setBook_cover(book.getBook_cover());
		bookDTO.setDescription(book.getDescription());
		bookDTO.setStock(book.getStock());
		bookDTO.setPrice(book.getPrice());
		return bookDTO;
	}
}
