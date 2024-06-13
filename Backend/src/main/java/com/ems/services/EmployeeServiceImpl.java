package com.ems.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.dto.EmployeeDto;
import com.ems.exceptions.ResourceNotFoundException;
import com.ems.model.Employee;
import com.ems.repository.EmpRepository;
import com.mapper.EmployeeMapper;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmpRepository empRepository;

	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		Employee savedEmployee = empRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}

	@Override
	public EmployeeDto getEmployeeById(Long id) {
		Employee employee = empRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee with given id is not found!" + id));
		return EmployeeMapper.mapToEmployeeDto(employee);
	}

	@Override
	public List<EmployeeDto> getAllEmployee() {
		List<Employee> employees = empRepository.findAll();
		return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
				.collect(Collectors.toList());
	}

	@Override
	public EmployeeDto updateEmployee(Long id,EmployeeDto updatedEmployee) {
		Employee employee = empRepository.findById(id) .orElseThrow(() -> new ResourceNotFoundException("Employee Not Found with id " + id));

		employee.setFirstName(updatedEmployee.getFirstName());
		employee.setLastName(updatedEmployee.getLastName());
		employee.setEmail(updatedEmployee.getEmail());
		
		Employee updatedEmployeeObj = empRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
	}

	@Override
	public void deleteEmployee(Long id) {
		// to check it is present in data or not
		empRepository.findById(id) .orElseThrow(() -> new ResourceNotFoundException("Employee Not Found with id " + id));
		// and then delete it 
		empRepository.deleteById(id);
	}
}
