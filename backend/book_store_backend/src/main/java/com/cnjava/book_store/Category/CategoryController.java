package com.cnjava.book_store.Category;

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
public class CategoryController {
	private CategoryService categoryService;
	
	@Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
	}
	
	@GetMapping("public/categories")
	public ResponseEntity<List<Category>> findAllCategories() {
		return ResponseEntity.ok(categoryService.findAll());
	}
	
	@GetMapping("public/categories/{id}")
	public ResponseEntity<Category> getBookById(@PathVariable Long id) {
		Category foundedCategory = categoryService.getCategoryById(id);
		if(foundedCategory != null) {
			return new ResponseEntity<>(foundedCategory, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}	
	
	@PostMapping("admin/new-category")
	public ResponseEntity<Map<String, String>> addNewCategory(@RequestBody Category newCategory) {
		categoryService.createCategory(newCategory);
		Map<String, String> response = Collections.singletonMap("message", "Category added successfully");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("admin/categories/{id}")
	public ResponseEntity<String> deleteCategoryById(@PathVariable Long id) {
		boolean deleted = categoryService.deleteCategoryById(id);
		if(deleted) {
			return new ResponseEntity<>("Category deleted successfully", HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("admin/categories/{id}")
	public ResponseEntity<Map<String, String>> updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory) {
		boolean updated = categoryService.updateCategory(id, updatedCategory);
		Map<String, String> response = Collections.singletonMap("message", "Category updated successfully");
		if(updated) {
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
