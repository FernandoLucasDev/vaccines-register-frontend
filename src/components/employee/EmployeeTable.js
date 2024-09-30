import React, { useEffect, useState } from 'react';
import { Table, Spinner, Card, Pagination, Form } from 'react-bootstrap';

const EmployeeTable = ({ filteredEmployees, handleDelete, handleEdit, isLoading }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isLoading) {
        return <Spinner animation="grow" variant="info" className='position-relative top-50 start-50 translate-middle' />;
    }

    if (filteredEmployees.length === 0) {
        return <p className='text-center'>There are no employees.<br></br>You can create one by clicking in the Add new employee in the menu.</p>;
    }

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

    const renderCards = () => {
        return currentEmployees.map((employee, index) => (
            <Card key={index} className="mb-3">
                <Card.Body>
                    <Card.Title>{employee.full_name}</Card.Title>
                    <Card.Text>
                        <strong>CPF:</strong> {employee.cpf}<br />
                        <strong>Person with disabily:</strong> {employee.is_pcd ? "Yes" : "No"}<br />
                        <strong>Vaccine Name:</strong> {employee.vaccine_name}<br />
                        <strong>First Dose:</strong> {employee.first_dose_vaccine || 'N/A'}<br />
                        <strong>Second Dose:</strong> {employee.second_dose_vaccine || 'N/A'}<br />
                        <strong>Third Dose:</strong> {employee.third_dose_vaccine || 'N/A'}
                    </Card.Text>
                    <button 
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => handleDelete(employee)}
                    >
                        Delete
                    </button>
                    <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(employee)}
                    >
                        Edit
                    </button>
                </Card.Body>
            </Card>
        ));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div>
            {screenWidth < 1024 ? renderCards() : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>CPF</th>
                            <th>Name</th>
                            <th>PDC</th>
                            <th>Vaccine Name</th>
                            <th>First dose</th>
                            <th>Second dose</th>
                            <th>Third dose</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.cpf}</td>
                                <td>{employee.full_name}</td>
                                <td>{employee.is_pcd ? "Yes" : "No"}</td>
                                <td>{employee.vaccines[0].name}</td>
                                <td>{employee.vaccines[0].first_dose_vaccine || 'N/A'}</td>
                                <td>{employee.vaccines[0].second_dose_vaccine || 'N/A'}</td>
                                <td>{employee.vaccines[0].third_dose_vaccine || 'N/A'}</td>
                                <td>
                                    <button 
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => handleDelete(employee)}
                                    >
                                        Delete
                                    </button>
                                    <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleEdit(employee)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <Form.Select onChange={handleItemsPerPageChange} value={itemsPerPage} style={{ width: '100px' }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </Form.Select>
                <Pagination>
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </div>
    );
};

export default EmployeeTable;
