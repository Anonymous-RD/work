import axios from 'axios';

const serverUrl = 'https://us-central1-styletrends-5dc20.cloudfunctions.net/surveys'

// Create an Axios instance
const apiClient = axios.create({
    baseURL: serverUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Utility to set the Authorization token
export function setAuthToken(token) {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
}

export async function fetchAllSurveys() {
    try {
        const response = await apiClient.get();
        return response.data;
    } catch (error) {
        console.error('Error fetching surveys:', error);
        return [];
    }
}

export async function fetchSurveyById(id) {
    try {
        const response = await apiClient.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching survey:', error);
        return [];
    }
}

export async function createSurvey(data) {
    try {
        const response = await apiClient.post('/', data);
        return response.data;
    } catch (error) {
        console.error('Error creating survey:', error);
        return null;
    }
}

export async function updateSurveyById(id, data) {
    try {
        const response = await apiClient.patch(`/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating survey:', error);
        return null;
    }
}

export async function deleteSurveyById(id) {
    try {
        const response = await apiClient.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting survey:', error);
        return null;
    }
}

export async function submitSurvey(data) {
    try {
        const response = await axios.post('http://localhost:5000/styletrends-5dc20/us-central1/surveys/submit', data); // API endpoint for submitting survey data
        return response.data;
    } catch (error) {
        console.error('Error submitting survey:', error);
        return null;
    }
}