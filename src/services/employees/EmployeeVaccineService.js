import Api from "../api/Api";

const EmployeeVaccineService = {
  create: async (data) => {
    const route = `api/employees/vaccine/relate/${data.new_employee_id}`;
    try {
      const response = await Api.put(route, data);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to relate vaccine to employee.' };
    }
  },

  getAll: async (employeeId) => {
    const route = `api/employees/vaccine/show/${employeeId}`;
    try {
      const response = await Api.get(route);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch employee vaccines.' };
    }
  },

  update: async (employeeId, vaccineId, data) => {
    const route = `api/employees/${employeeId}/vaccines/${vaccineId}`;
    try {
      const response = await Api.put(route, data);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to update vaccine relation.' };
    }
  },
};

export default EmployeeVaccineService;
