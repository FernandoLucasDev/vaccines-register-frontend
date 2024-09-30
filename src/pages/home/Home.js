import React, { useEffect, useState } from 'react';
import Menu from '../../components/menu/Menu';
import SearchInput from '../../components/search/SearchInput';
import EmployeeTable from '../../components/employee/EmployeeTable';
import EmployeesService from '../../services/employees/EmployeesService';
import DeleteModal from '../../components/modals/DeleteModal';
import EditModal from '../../components/modals/EditModal';
import EmployeeRegister from '../../components/employee/EmployeeRegister';
import { Col, Row, Spinner } from 'react-bootstrap';
import VaccinesService from '../../services/vaccines/VaccinesService';
import VaccinesSearchInput from '../../components/search/VaccinesSearchInput';
import VaccineTable from '../../components/vaccine/VaccineTable';
import VaccineRegister from '../../components/vaccine/VaccineRegister';
import './home.css'; 
import AuthService from '../../services/auth/AuthService';
import ReportService from '../../services/report/ReportService';
import EmployeeVaccineService from '../../services/employees/EmployeeVaccineService';
import MessageModal from '../../components/modals/MessageModal';

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [vaccines, setVaccines] = useState([]);
    const [show, setShow] = useState('dashboard');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingReport, setIsLoadingReport] = useState(false);
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermVaccine, setSearchTermVaccine] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [showMessageModalText, setShowMessageModalText] = useState('');
    const [title, setTitle] = useState('Employee Dashboard');

    const fetchEmployees = async () => {
        setIsLoading(true);
        try {
            const res = await EmployeesService.getAll();
            setEmployees(res.data);
        } catch (error) {
            console.error('Failed to fetch employees', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchVaccines = async () => {
        setIsLoading(true);
        try {
            const vac = await VaccinesService.getAll();
            setVaccines(vac.data);
        } catch (error) {
            console.error('Failed to fetch vaccines', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveEmployee = async (employeeData) => {
        try {
            setIsLoadingCreate(true);
            const create = await EmployeesService.create(employeeData);
            if (create?.data?.id) {
                employeeData.new_employee_id = create.data.id;
                const updateVaccines = await EmployeeVaccineService.create(employeeData);
                setEmployees([...employees, create.data]);
                setTitle('Employee Dashboard');
                setShow('dashboard');
                fetchEmployees();
            } else if(create?.message?.error) {
                setShowMessageModalText(create.message.error);
                setShowMessageModal(true);
            }
            setIsLoadingCreate(false);
        } catch (error) {
            console.error('Failed to save employee', error);
            setIsLoadingCreate(false);
        }
    };

    const handleSaveVaccine = async (vaccineData) => {
        try {
            setIsLoadingCreate(true);
            const create = await VaccinesService.create(vaccineData);
            if (create.data.id) {
                setVaccines([...vaccines, create.data]);
                setTitle('Vaccines Dashboard');
                setShow('vaccinesDashboard');
            }
            setIsLoadingCreate(false);
        } catch (error) {
            console.error('Failed to save vaccine', error);
            setIsLoadingCreate(false);
        }
    };

    const handleDeleteEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await EmployeesService.delete(selectedEmployee.id);
            setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
            setShowDeleteModal(false);
            fetchEmployees();
        } catch (error) {
            console.error('Failed to delete employee', error);
        }
    };

    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowEditModal(true);
    };

    const handleSaveEditEmployee = async (updatedEmployee) => {
        delete updatedEmployee.cpf;
        try {
            setShowMessageModal(true);
            setShowMessageModalText("Updating employee!");
            const update = await EmployeesService.update(updatedEmployee);
            if (update.data.id) {
                const updateVaccines = await EmployeeVaccineService.update(update.data.id, updatedEmployee.vaccine_id, updatedEmployee);
                if(updateVaccines?.success) {
                    setShowMessageModal(true);
                    setShowMessageModalText("Employee updated!");
                    setEmployees(employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
                } else {
                    setShowMessageModal(true);
                    setShowMessageModalText("Something went wrong!");
                }
                fetchEmployees();
            }
        } catch (error) {
            console.error('Failed to update employee', error);
        } finally {
            setShowEditModal(false);
        }
    };

    const handleSearchEmployees = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleSearchVaccines = (e) => {
        setSearchTermVaccine(e.target.value.toLowerCase());
    };

    const handleRequestReport = async () => {
        try {
            setIsLoadingReport(true);

            const response = await ReportService.request();
            
            if (response.data.report_id) {
                const startTime = Date.now();
                const maxWaitTime = 2 * 60 * 1000;
    
                const checkReportStatus = async () => {
                    const currentTime = Date.now();
                    if (currentTime - startTime > maxWaitTime) {
                        clearInterval(intervalId);
                        alert('Report generation took too long. Please try again later.');
                        return;
                    }
    
                    try {
                        const report = await ReportService.getReport(response.data.report_id);
                        if (report && report.data.file_path) {
                            const filePath = report.data.file_path.replace(/\\/g, '').replace(/\//g, '/');
                            const downloadUrl = `${process.env.REACT_APP_API_BASE_URL}${filePath}`
                            window.location.href = downloadUrl;
                            clearInterval(intervalId);
                        }
                        setIsLoadingReport(false);
                    } catch (error) {
                        console.error('Error fetching report status:', error);
                        clearInterval(intervalId);
                        setIsLoadingReport(false);
                    }
                };
                
                const intervalId = setInterval(checkReportStatus, 5000);
            }
        } catch (error) {
            console.error('Error requesting report:', error);
        }
    };
    

    const handleLogout = () => {
        AuthService.logout();
    };

    const changeScreen = (screen) => {
        setShow(screen);
        switch (screen) {
            case 'dashboard':
                setTitle('Employee Dashboard');
                break;
            case 'registerEmployee':
                setTitle('Register Employee');
                break;
            case 'vaccinesDashboard':
                setTitle('Vaccines Dashboard');
                break;
            case 'registerVaccine':
                setTitle('Register Vaccine');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (show === 'vaccinesDashboard') {
            fetchVaccines();
        }
    }, [show]);

    const filteredEmployees = employees.filter((employee) =>
        employee.full_name.toLowerCase().includes(searchTerm) ||
        employee.cpf.toLowerCase().includes(searchTerm) ||
        employee.vaccine_name.toLowerCase().includes(searchTerm)
    );

    const filteredVaccines = vaccines.filter((vaccine) =>
        vaccine.name.toLowerCase().includes(searchTermVaccine) ||
        vaccine.producer_name.toLowerCase().includes(searchTermVaccine)
    );

    return (
        <div>
            <Menu changeScreen={changeScreen} report={handleRequestReport} logout={handleLogout} isLoading={isLoadingReport} />
            <div>
                <p className='fs-3 fw-bold text-center'>{title}</p>
                <div>
                    {isLoading ? (
                        <Spinner animation="grow" variant="info" className='position-relative top-50 start-50 translate-middle mt-5' />
                    ) : (
                        <Row className="w-100">
                        <Col className="d-flex flex-column align-items-center">
                            {show === 'dashboard' && (
                                <>
                                    {employees.length > 0 && (
                                    <SearchInput searchTerm={searchTerm} handleSearch={handleSearchEmployees} />
                                    )}
                                    <EmployeeTable filteredEmployees={filteredEmployees} handleDelete={handleDeleteEmployee} handleEdit={handleEditEmployee} />
                                </>
                            )}
                            {show === 'registerEmployee' && (
                                <EmployeeRegister onSave={handleSaveEmployee} onCancel={() => setShow('dashboard')} isLoading={isLoadingCreate} />
                            )}
                            {show === 'vaccinesDashboard' && (
                                <>
                                    <VaccinesSearchInput searchTerm={searchTermVaccine} handleSearch={handleSearchVaccines} />
                                    <VaccineTable filteredVaccines={filteredVaccines} />
                                </>
                            )}
                            {show === 'registerVaccine' && (
                                <VaccineRegister onSave={handleSaveVaccine} onCancel={() => setShow('vaccinesDashboard')} isLoading={isLoadingCreate} />
                            )}
                        </Col>
                    </Row>
                    )}
                </div>

                <DeleteModal
                    show={showDeleteModal}
                    handleClose={() => setShowDeleteModal(false)}
                    handleConfirm={handleConfirmDelete}
                />

                <EditModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    handleSave={handleSaveEditEmployee}
                    employee={selectedEmployee}
                />

                <MessageModal 
                    show={showMessageModal}
                    message={showMessageModalText}
                    handleClose={() => setShowMessageModal(false)}
                />
            </div>
        </div>
    );
};

export default Home;
