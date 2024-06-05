package com.cnjava.book_store.Book;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/book-managerment")
public class BookController {
	private BookService bookService;
	
	@Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }
	
	@GetMapping("/books")
	public ResponseEntity<List<Book>> findAllBooks() {
		return ResponseEntity.ok(bookService.findAll());
	}
	
	@GetMapping("/books/{id}")
	public ResponseEntity<Book> getBookById(@PathVariable Long id) {
		Book foundedBook = bookService.getBookById(id);
		if(foundedBook != null) {
			return new ResponseEntity<>(foundedBook, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}	
	
	@PostMapping()
	public ResponseEntity<String> addNewBook(@RequestBody Book newBook) {
		bookService.createBook(newBook);
		return new ResponseEntity<>("Book added successfully", HttpStatus.OK);
	}
	
	@DeleteMapping("/books/{id}")
	public ResponseEntity<String> deleteBookById(@PathVariable Long id) {
		boolean deleted = bookService.deleteBookById(id);
		if(deleted) {
			return new ResponseEntity<>("Book deleted successfully", HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/books/{id}")
	public ResponseEntity<String> updateBook(@PathVariable Long id, @RequestBody Book updatedBook) {
		boolean updated = bookService.updateBook(id, updatedBook);
		if(updated) {
			return new ResponseEntity<>("Updated", HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
