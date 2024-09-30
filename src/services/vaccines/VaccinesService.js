import Api from "../api/Api";

const VaccinesService = {
  create: async (data) => {
    const route = "api/vaccines/create";
    try {
      const response = await Api.post(route, data);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error || 'Failed to create vaccine.' };
    }
  },

  getAll: async () => {
    const route = "api/vaccines/show";
    try {
      const response = await Api.get(route);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error || 'Failed to fetch vaccines.' };
    }
  },
};

export default VaccinesService;
