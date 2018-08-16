import axios from 'axios';
import { CREATE_USER, EDIT_USER, REMOVE_USER } from "./types";
import { FETCH_USER, FETCH_USERS, FETCH_USER_FIELDS } from "./types";
import { FETCH_LOCATIONS } from "./types";

export async function createUser(values, callback) {
    let request = null;
    let msg = null;
        
    try{
        request = await axios.post("http://localhost:3001/users/", values)
        msg = {"msg_success": request.data}
    }
    catch(err){
        msg = {"error": err.response.data}
    }

    return {
        type: CREATE_USER,
        payload: msg
    }
}

export async function editUser(id, values, callback) {
    let request = null;
    let msg = null;
    try{
        request = await axios.put(`http://localhost:3001/users/${id}`, values)
        console.log("request aqui vindo no editar q interessante: ", request.data);
        msg = request.data;
        //callback(msg.message);    
    }
    catch(err){
        msg = {"error": err.response.data}
    }

    return {
        type: EDIT_USER,
        payload: msg
    }

}

export const removeUser = (ids) => {

    console.log("aqui ids: ", ids);
    let request = null;
    if( ids instanceof Array && ids.length > 1) {
        request = axios.delete(`http://localhost:3001/users/`, {params: ids});
    }
    else{
        console.log("ué não é array como pode isso?")
        request = axios.delete(`http://localhost:3001/users/${ids}`);
    }


    return {
        type: REMOVE_USER,
        payload: request
    }
}



export const fetchUser = (id) => {

    const request = axios.get(`http://localhost:3001/users/${id}`);

    return {
        type: FETCH_USER,
        payload: request
    }
}

export const fetchUsers = () => {
    const request = axios.get("http://localhost:3001/users");
    console.log("------ vai chamar o fetchUsers -------")

    return {
        type: FETCH_USERS,
        payload: request
    }
}

export const fetchUserFields = () => {

    const request = axios.get("http://localhost:3001/users/fields");

    return {
        type: FETCH_USER_FIELDS,
        payload: request
    }
}

export const fetchLocations = () => {
    console.log("no estado: ");
    const request = axios.get("http://localhost:3001/locations");

    return {
        type: FETCH_LOCATIONS,
        payload: request
    }
}