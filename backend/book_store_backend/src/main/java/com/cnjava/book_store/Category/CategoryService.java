package com.cnjava.book_store.Category;

import java.util.List;

public interface CategoryService {
	List<Category> findAll();
	void createCategory(Category newCategory);
	Category getCategoryById(Long id);
	boolean deleteCategoryById(Long id);
	boolean updateCategory(Long id, Category updatedCategory);
}
