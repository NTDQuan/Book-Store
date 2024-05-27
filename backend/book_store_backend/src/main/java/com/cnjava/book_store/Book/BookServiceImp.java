package com.cnjava.book_store.Book;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.cnjava.book_store.Author.Author;
import com.cnjava.book_store.Book.dto.BookDTO;
import com.cnjava.book_store.Book.mapper.BookMapper;
import com.cnjava.book_store.Category.Category;

@Service
public class BookServiceImp implements BookService {
	BookRepository bookRepository;
	
	@Autowired
	RestTemplate restTemplate ;
	
	public BookServiceImp(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}
	
	@Override
	public List<BookDTO> findAll() {
		List<Book> books = bookRepository.findAll();
		List<BookDTO> bookDTOs = new ArrayList<>();
		
		return books.stream().map(BookMapper::mapToBookDTO).collect(Collectors.toList());
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
			book.setPrice(updatedBook.getPrice());
			bookRepository.save(book);
			return true;
		}
		return false;
	}
}
