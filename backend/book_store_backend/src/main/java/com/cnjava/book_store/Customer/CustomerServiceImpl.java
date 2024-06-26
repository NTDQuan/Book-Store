package com.cnjava.book_store.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    @Override
    public void createCustomer(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public boolean updateCustomer(Long id, Customer updatedCustomer) {
        if (!customerRepository.existsById(id)) {
        	return false;
        }
        Customer existingCustomer = customerRepository.findById(id).get();
        
        existingCustomer.setAddress(updatedCustomer.getAddress());
        existingCustomer.setBirthDate(updatedCustomer.getBirthDate());
        existingCustomer.setFullName(updatedCustomer.getFullName());
        existingCustomer.setPhoneNumber(updatedCustomer.getPhoneNumber());
        existingCustomer.setPassword(updatedCustomer.getPassword());
        customerRepository.save(existingCustomer);
        return true;
    }

    @Override
    public boolean deleteCustomerById(Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
