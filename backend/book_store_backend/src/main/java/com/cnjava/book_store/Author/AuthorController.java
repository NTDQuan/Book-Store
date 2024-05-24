package com.cnjava.book_store.Author;

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
@RequestMapping("/admin/author-managermant")
public class AuthorController {
	AuthorService authorService;
	
	@Autowired
	public AuthorController(AuthorService authorService) {
		this.authorService = authorService;
	}
	
	@GetMapping("/authors")
	public ResponseEntity<List<Author>> findAllAuthors() {
		return ResponseEntity.ok(authorService.findAll());
	}
	
	@GetMapping("/authors/{id}")
	public ResponseEntity<Author> getAuthorById(@PathVariable Long id) {
		Author foundedAuthor = authorService.getAuthorById(id);
		if(foundedAuthor != null) {
			return new ResponseEntity<>(foundedAuthor, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}	
	
	@PostMapping()
	public ResponseEntity<String> addNewAuthor(@RequestBody Author newAuthor) {
		authorService.createAuthor(newAuthor);
		return new ResponseEntity<>("Author added successfully", HttpStatus.OK);
	}
	
	@DeleteMapping("/authors/{id}")
	public ResponseEntity<String> deleteAuthorById(@PathVariable Long id) {
		boolean deleted = authorService.deleteAuthorById(id);
		if(deleted) {
			return new ResponseEntity<>("Author deleted successfully", HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/authors/{id}")
	public ResponseEntity<String> updateAuthor(@PathVariable Long id, @RequestBody Author updatedAuthor) {
		boolean updated = authorService.updateAuthor(id, updatedAuthor);
		if(updated) {
			return new ResponseEntity<>("Updated", HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
