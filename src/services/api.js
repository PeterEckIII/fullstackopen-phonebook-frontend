import axios from 'axios';

const baseUrl = 'http://localhost:3001/people'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data);
}

const create = personObj => {
    const request = axios.post(`${baseUrl}`, personObj);
    return request.then(res => res.data);
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(res => res.data);
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`, id);
    return request.then(res => res.data);
}

export default { getAll, create, update, remove }
