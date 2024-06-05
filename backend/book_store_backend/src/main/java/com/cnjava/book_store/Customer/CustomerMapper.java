package com.cnjava.book_store.Customer;


public class CustomerMapper {

    public static CustomerDTO toDTO(Customer customer) {
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(customer.getId());
        customerDTO.setFullName(customer.getFullName());
        customerDTO.setBirthDate(customer.getBirthDate());
        customerDTO.setAddress(customer.getAddress());
        customerDTO.setUsername(customer.getUsername());
        customerDTO.setPassword(customer.getPassword());
        customerDTO.setPhoneNumber(customer.getPhoneNumber());
        return customerDTO;
    }

    public static Customer toEntity(CustomerDTO customerDTO) {
        Customer customer = new Customer();
        customer.setId(customerDTO.getId());
        customer.setFullName(customerDTO.getFullName());
        customer.setBirthDate(customerDTO.getBirthDate());
        customer.setAddress(customerDTO.getAddress());
        customer.setUsername(customerDTO.getUsername());
        customer.setPassword(customerDTO.getPassword());
        customer.setPhoneNumber(customerDTO.getPhoneNumber());
        return customer;
    }
}
