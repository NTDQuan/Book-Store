package com.cnjava.book_store.Author;

import java.util.List;

import com.cnjava.book_store.Book.Book;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PreRemove;
import jakarta.persistence.Table;

@Entity
@Table(name = "author")
public class Author {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String fullName;
	@OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
	private List<Book> books;
	public Author(long id, String fullName) {
		super();
		this.id = id;
		this.fullName = fullName;
	}
	public Author() {
		
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	
	@PreRemove
	private void preRemove() {
		for (Book s : books) {
			s.setAuthor(null);
		}
	}
}
