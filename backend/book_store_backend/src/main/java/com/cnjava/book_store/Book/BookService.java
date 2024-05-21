package com.cnjava.book_store.Book;

import java.util.List;

public interface BookService {
	List<Book> findAll();
	void createBook(Book newBook);
	Book getBookById(Long id);
	boolean deleteBookById(Long id);
	boolean updateBook(Long id, Book updatedBook);
}
