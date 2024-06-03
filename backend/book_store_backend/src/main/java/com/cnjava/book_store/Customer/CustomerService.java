package com.cnjava.book_store.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer> findAll();

    Customer getCustomerById(Long id);

    void createCustomer(Customer customer);

    boolean updateCustomer(Long id, Customer updatedCustomer);

    boolean deleteCustomerById(Long id);
}
