import Api from "../api/Api";

const EmployeesService = {
  create: async (data) => {
    const route = "api/employees/create";
    try {
      const response = await Api.post(route, data);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error || 'Failed to create employee.' };
    }
  },

  update: async (data) => {
    const routeEmp = `api/employees/update/${data.id}`;
    try {
      const response = await Api.put(routeEmp, data);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error || 'Failed to update employee.' };
    }
  },

  getAll: async () => {
    const route = "api/employees/show";
    try {
      const response = await Api.get(route);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error || 'Failed to fetch employees.' };
    }
  },

  delete: async (id) => {
    const route = `api/employees/delete/${id}`;
    try {
      await Api.delete(route);
      return { success: true, message: 'Employee deleted successfully.' };
    } catch (error) {
      return { success: false, message: error || 'Failed to delete employee.' };
    }
  }
};

export default EmployeesService;
