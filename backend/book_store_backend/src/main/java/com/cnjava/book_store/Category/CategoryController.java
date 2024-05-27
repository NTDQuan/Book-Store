package com.cnjava.book_store.Category;

import java.util.List;

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
@CrossOrigin("*")
@RequestMapping("/admin/category-managerment")
public class CategoryController {
	private CategoryService categoryService;
	
	@Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
	}
	
	@GetMapping("/categories")
	public ResponseEntity<List<Category>> findAllCategories() {
		return ResponseEntity.ok(categoryService.findAll());
	}
	
	@GetMapping("/categories/{id}")
	public ResponseEntity<Category> getBookById(@PathVariable Long id) {
		Category foundedCategory = categoryService.getCategoryById(id);
		if(foundedCategory != null) {
			return new ResponseEntity<>(foundedCategory, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}	
	
	@PostMapping()
	public ResponseEntity<String> addNewCategory(@RequestBody Category newCategory) {
		categoryService.createCategory(newCategory);
		return new ResponseEntity<>("Category added successfully", HttpStatus.OK);
	}
	
	@DeleteMapping("/categories/{id}")
	public ResponseEntity<String> deleteCategoryById(@PathVariable Long id) {
		boolean deleted = categoryService.deleteCategoryById(id);
		if(deleted) {
			return new ResponseEntity<>("Category deleted successfully", HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/categories/{id}")
	public ResponseEntity<String> updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory) {
		boolean updated = categoryService.updateCategory(id, updatedCategory);
		if(updated) {
			return new ResponseEntity<>("Updated", HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
