import axios from 'axios';

const serverUrl = 'https://us-central1-styletrends-5dc20.cloudfunctions.net/cmsFunction'

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

// Fetch blogs (GET request without token)
export async function fetchThemes() {
    try {
        const response = await apiClient.get('/themes');
        return response.data;
    } catch (error) {
        console.error('Error fetching themes:', error);
        return [];
    }
}

export async function fetchBlogs() {
    try {
        const response = await apiClient.get('/blogs');
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
}

export async function fetchBlogById(blogId) {
    try {
        const response = await apiClient.get(`/blogs/${blogId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching blog:', error);
        return [];
    }
}

// Create a blog (POST request with token)
export async function createBlog(blogData) {
    try {
        const response = await apiClient.post('/blogs', blogData);
        return response.data;
    } catch (error) {
        console.error('Error creating blog:', error);
        return null;
    }
}

// Update a blog (PUT request with token)
export async function updateBlog(blogId, blogData) {
    try {
        const response = await apiClient.put(`/blogs/${blogId}`, blogData);
        return response.data;
    } catch (error) {
        console.error('Error updating blog:', error);
        return null;
    }
}

// Delete a blog (DELETE request with token)
export async function deleteBlog(blogId) {
    try {
        const response = await apiClient.delete(`/blogs/${blogId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting blog:', error);
        return null;
    }
}

export async function fetchBestPractices() {
    try {
        const response = await apiClient.get('/best-practices');
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
}
export async function fetchBestPracticesById(id) {
    try {
        const response = await apiClient.get(`/best-practices/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching best-practices:', error);
        return [];
    }
}

export async function createBestPractice(blogData) {
    try {
        const response = await apiClient.post('/best-practices', blogData);
        return response.data;
    } catch (error) {
        console.error('Error creating BestPractice:', error);
        return null;
    }
}

export async function updateBestPractice(id, data) {
    try {
        const response = await apiClient.put(`/best-practices/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating BestPractice:', error);
        return null;
    }
}

// Delete a blog (DELETE request with token)
export async function deleteBestPractice(id) {
    try {
        const response = await apiClient.delete(`/best-practices/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting BestPractice:', error);
        return null;
    }
}


export async function fetchNewsLetters() {
    try {
        const response = await apiClient.get('/news-letter');
        return response.data;
    } catch (error) {
        console.error('Error fetching NewsLetters:', error);
        return [];
    }
}

export async function fetchNewsLettersById(id) {
    try {
        const response = await apiClient.get(`/news-letter/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching NewsLetters:', error);
        return [];
    }
}

export async function createNewsLetter(data) {
    try {
        const response = await apiClient.post('/news-letter', data);
        return response.data;
    } catch (error) {
        console.error('Error creating news-letter', error);
        return null;
    }
}

export async function updateNewsLetters(id, data) {
    try {
        const response = await apiClient.put(`/news-letter/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating news-letter:', error);
        return null;
    }
}

export async function deleteNewsLetters(id) {
    try {
        const response = await apiClient.delete(`/news-letter/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting news-letter', error);
        return null;
    }
}

export async function fetchEventsAndCompaigns() {
    try {
        const response = await apiClient.get('/event-compaign');
        return response.data;
    } catch (error) {
        console.error('Error fetching EventsAndCompaigns:', error);
        return [];
    }
}

export async function fetchEventsAndCompaignsById(id) {
    try {
        const response = await apiClient.get(`/event-compaign/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching EventsAndCompaigns:', error);
        return [];
    }
}

export async function createEventsAndCompaign(data) {
    try {
        const response = await apiClient.post('/event-compaign', data);
        return response.data;
    } catch (error) {
        console.error('Error creating event-compaign', error);
        return null;
    }
}

export async function updateEventsAndCompaign(id, data) {
    try {
        const response = await apiClient.put(`/event-compaign/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating event-compaign:', error);
        return null;
    }
}

export async function deleteEventsAndCompaign(id) {
    try {
        const response = await apiClient.delete(`/event-compaign/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting event-compaign', error);
        return null;
    }
}

export async function fetchStories() {
    try {
        const response = await apiClient.get('/stories');
        return response.data;
    } catch (error) {
        console.error('Error fetching stories:', error);
        return [];
    }
}

export async function fetchStoriesById(id) {
    try {
        const response = await apiClient.get(`/stories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching stories:', error);
        return [];
    }
}

export async function createStory(storyData) {
    try {
        const response = await apiClient.post('/stories', storyData);
        return response.data;
    } catch (error) {
        console.error('Error creating stories:', error);
        return null;
    }
}

export async function updateStory(id, data) {
    try {
        const response = await apiClient.put(`/stories/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating Story:', error);
        return null;
    }
}

export async function deleteStory(id) {
    try {
        const response = await apiClient.delete(`/stories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Story:', error);
        return null;
    }
}