import React, { useEffect, useState } from 'react';
import { Table, Spinner, Card, Pagination, Form } from 'react-bootstrap';

const VaccineTable = ({ filteredVaccines, isLoading }) => {
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

    if (filteredVaccines.length === 0) {
        return <p className='text-center'>No vaccines found.</p>;
    }

    const totalPages = Math.ceil(filteredVaccines.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentVaccines = filteredVaccines.slice(startIndex, startIndex + itemsPerPage);

    const renderCards = () => {
        return currentVaccines.map((vaccine, index) => (
            <Card key={index} className="mb-3">
                <Card.Body>
                    <Card.Title>{vaccine.name}</Card.Title>
                    <Card.Text>
                        <strong>ID:</strong> {vaccine.id}<br />
                        <strong>Producer Name:</strong> {vaccine.producer_name}
                    </Card.Text>
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
                <Table striped bordered hover className='w-100'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vaccine Name</th>
                            <th>Producer Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentVaccines.map((vaccine, index) => (
                            <tr key={index}>
                                <td>{vaccine.id}</td>
                                <td>{vaccine.name}</td>
                                <td>{vaccine.producer_name}</td>
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

export default VaccineTable;
