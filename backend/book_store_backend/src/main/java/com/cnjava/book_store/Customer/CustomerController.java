package com.cnjava.book_store.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/customers")
    public ResponseEntity<List<CustomerDTO>> findAllCustomers() {
        List<Customer> customers = customerService.findAll();
        List<CustomerDTO> customerDTOs = customers.stream()
                .map(CustomerMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(customerDTOs);
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable Long id) {
        Customer foundCustomer = customerService.getCustomerById(id);
        if (foundCustomer != null) {
            return new ResponseEntity<>(CustomerMapper.toDTO(foundCustomer), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/customer")
    public ResponseEntity<String> addNewCustomer(@RequestBody CustomerDTO newCustomerDTO) {
        Customer newCustomer = CustomerMapper.toEntity(newCustomerDTO);
        customerService.createCustomer(newCustomer);
        return new ResponseEntity<>("Customer added successfully", HttpStatus.OK);
    }

    @DeleteMapping("/customers/{id}")
    public ResponseEntity<String> deleteCustomerById(@PathVariable Long id) {
        boolean deleted = customerService.deleteCustomerById(id);
        if (deleted) {
            return new ResponseEntity<>("Customer deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/customers/{id}")
    public ResponseEntity<String> updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO updatedCustomerDTO) {
        Customer updatedCustomer = CustomerMapper.toEntity(updatedCustomerDTO);
        boolean updated = customerService.updateCustomer(id, updatedCustomer);
        if (updated) {
            return new ResponseEntity<>("Customer updated successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
