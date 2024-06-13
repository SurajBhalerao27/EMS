package com.ems.services;

import java.util.List;

import com.ems.dto.EmployeeDto;

public interface EmployeeService {
	EmployeeDto createEmployee(EmployeeDto employeeDto);

	EmployeeDto getEmployeeById(Long id);
	
	List<EmployeeDto> getAllEmployee();
	
	EmployeeDto updateEmployee(Long id, EmployeeDto updatedEmployee);
	
	void deleteEmployee(Long id);
}
