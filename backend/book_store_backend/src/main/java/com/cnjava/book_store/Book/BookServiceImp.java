package com.cnjava.book_store.Book;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class BookServiceImp implements BookService {
	BookRepository bookRepository;
	
	public BookServiceImp(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}
	
	@Override
	public List<Book> findAll() {
		return bookRepository.findAll();
	}
	
	@Override
	public void createBook(Book newBook) {
		bookRepository.save(newBook);
	}
	
	@Override
	public Book getBookById(Long id) {
		Book book = bookRepository.findById(id).orElse(null);
		return book;
	}
	
	@Override
	public boolean deleteBookById(Long id) {
		try {
			bookRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	@Override
	public boolean updateBook(Long id, Book updatedBook) {
		Optional<Book> bookOptional = bookRepository.findById(id);
		if(bookOptional.isPresent()) {
			Book book = bookOptional.get();
			book.setTitle(updatedBook.getTitle());
			book.setAuthor(updatedBook.getAuthor());
			book.setCategory(updatedBook.getCategory());
			book.setStock(updatedBook.getStock());
			book.setDescription(updatedBook.getDescription());
			book.setBook_cover(updatedBook.getBook_cover());
			bookRepository.save(book);
			return true;
		}
		return false;
	}
}
