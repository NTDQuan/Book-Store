package com.cnjava.book_store.Author;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/")
public class AuthorController {
	AuthorService authorService;
	
	@Autowired
	public AuthorController(AuthorService authorService) {
		this.authorService = authorService;
	}
	
	@GetMapping("public/authors")
	public ResponseEntity<List<Author>> findAllAuthors() {
		return ResponseEntity.ok(authorService.findAll());
	}
	
	@GetMapping("public/authors/{id}")
	public ResponseEntity<Author> getAuthorById(@PathVariable Long id) {
		Author foundedAuthor = authorService.getAuthorById(id);
		if(foundedAuthor != null) {
			return new ResponseEntity<>(foundedAuthor, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}	
	
	@PostMapping("admin/new-author")
	public ResponseEntity<Map<String, String>> addNewAuthor(@RequestBody Author newAuthor) {
		authorService.createAuthor(newAuthor);
		Map<String, String> response = Collections.singletonMap("message", "Author added successfully");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("admin/authors/{id}")
	public ResponseEntity<Void> deleteAuthorById(@PathVariable Long id) {
		boolean deleted = authorService.deleteAuthorById(id);
		if(deleted) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("admin/authors/{id}")
	public ResponseEntity<Map<String, String>> updateAuthor(@PathVariable Long id, @RequestBody Author updatedAuthor) {
		boolean updated = authorService.updateAuthor(id, updatedAuthor);
		Map<String, String> response = Collections.singletonMap("message", "Category updated successfully");
		if(updated) {
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
