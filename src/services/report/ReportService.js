import Api from "../api/Api";

const ReportService = {
    request: async () => {
        const route = "api/report/generate";
        try {
            const response = await Api.get(route);
            return { success: true, data: response };
        } catch (error) {
            return { success: false, message: error || 'Failed to generate report.' };
        }
    },

    getReport: async (id) => {
        const route = `api/report/status/${id}`;
        try {
            const response = await Api.get(route);
            return { success: true, data: response };
        } catch (error) {
            return { success: false, message: error || 'Failed to fetch report status.' };
        }
    }
}

export default ReportService;
