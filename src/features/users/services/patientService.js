import axiosConfig from '../../../core/axiosConfig';
const resourcePath = "/patients"

export async function fetchAllPatients() {
    const response = await axiosConfig.get(`${resourcePath}`);
    return response.data;
}

export async function deletePatient(id) {
    const response = await axiosConfig.delete(`${resourcePath}/${id}`);
    return response.data;    
}
export async function createPatient(patient) {
    const response = await axiosConfig.post(`${resourcePath}`, patient);
    return response.data;
}