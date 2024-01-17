import axios from 'axios';

class ListsApi {
    constructor() {
        this._apiUrl = 'http://localhost:8000/api/lists';
    }

    getLists(){
        return axios.get(this._apiUrl);
    }

    createList(data) {
        return axios.post(this._apiUrl, data);
    }

    updateList(id, data) {
        return axios.post(`${this._apiUrl}/${id}`, data);
    }

    deleteList (id) {
        const title = localStorage.getItem('title') ? localStorage.getItem('title') : '';
        return axios.delete(`${this._apiUrl}/${id}`, {
            data: {
                title,
            }
        })
    }
};

export default new ListsApi();