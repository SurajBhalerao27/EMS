import React, { useEffect, useState } from 'react'
import { createEmployee } from '../Services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigator = useNavigate();
    const { id } = useParams();

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    useEffect(()=>{
        if(id){
            getEmployee(id) 
            .then((res)=>{
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
            })
        }
    },[id])

    function handleFirstName(e) {
        setFirstName(e.target.value);
    }
    function handleLastName(e) {
        setLastName(e.target.value);
    }
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function saveEmployee(e) {
        if (validate) {
            e.preventDefault();
            const employee = { firstName, lastName, email }
            createEmployee(employee).then((res) => {
                console.log(res.data);
                navigator('/employees')
            })
        }
    }

    function validate() {
        let isValid = true;
        if (firstName.length === 0) {
            isValid = false;
            setError({
                ...error,
                firstName: 'First name cannot be empty'
            })
        }
        if (lastName.length === 0) {
            isValid = false;
            setError({
                ...error,
                lastName: 'Last name cannot be empty'
            })
        }
        if (email.length === 0) {
            isValid = false;
            setError({
                ...error,
                email: 'Email cannot be empty'
            })
        }
        return isValid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center mt-5'>Update Employee</h2>
        }
        else {
            return <h2 className='text-center mt-5'>Add Employee</h2>
        }
    }

    return (
        <div className="component">
            <br /><br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form onSubmit={saveEmployee}>
                            <div className="form-group mb-2">
                                <label className='form-lebel'>First Name</label>
                                <input
                                    className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                                    type="text"
                                    name="first name"
                                    value={firstName}
                                    placeholder="Enter first name"
                                    onChange={handleFirstName}
                                ></input>
                                {error.firstName && <div className='invalid-feedback'>{error.firstName}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-lebel'>Last Name</label>
                                <input
                                    className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                                    type="text"
                                    name="last name"
                                    value={lastName}
                                    placeholder="Enter last name"
                                    onChange={handleLastName}
                                ></input>
                                {error.lastName && <div className='invalid-feedback'>{error.lastName}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-lebel'>Email</label>
                                <input
                                    className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Enter email"
                                    onChange={handleEmail}
                                ></input>
                                {error.email && <div className='invalid-feedback'>{error.email}</div>}
                            </div>
                            <button className='btn btn-success' type="submit" onClick={saveEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent