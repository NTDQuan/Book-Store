package com.cnjava.book_store.Book;

import java.util.List;

import com.cnjava.book_store.Book.dto.BookDTO;

public interface BookService {
	List<BookDTO> findAll();
	void createBook(Book newBook);
	Book getBookById(Long id);
	boolean deleteBookById(Long id);
	boolean updateBook(Long id, Book updatedBook);
}
