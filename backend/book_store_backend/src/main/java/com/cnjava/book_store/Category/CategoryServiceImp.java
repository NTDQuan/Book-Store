package com.cnjava.book_store.Category;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cnjava.book_store.Book.Book;
import com.cnjava.book_store.Book.BookRepository;

@Service
public class CategoryServiceImp implements CategoryService {
	CategoryRepository categoryRepository;
	
	public CategoryServiceImp(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}
	
	@Override
	public List<Category> findAll() {
		return categoryRepository.findAll();
	}
	
	@Override
	public void createCategory(Category newCategory) {
		categoryRepository.save(newCategory);
	}
	
	@Override
	public Category getCategoryById(Long id) {
		Category category = categoryRepository.findById(id).orElse(null);
		return category;
	}
	
	@Override
	public boolean deleteCategoryById(Long id) {
		try {
			categoryRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean updateCategory(Long id, Category updatedCategory) {
		Optional<Category> categoryOptional = categoryRepository.findById(id);
		if(categoryOptional.isPresent()) {
			Category category = categoryOptional.get();
			category.setName(updatedCategory.getName());
			categoryRepository.save(category);
			return true;
		}
		return false;
	}
}
