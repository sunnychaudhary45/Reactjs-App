import axios from 'axios';

const getService =(url,data)=>{
    try{
        return axios.get(url);
    }
    catch(ex){
        console.log('http service',ex)
    }   
}

const postService =(url,data,header)=>{
    try{

        return axios.post(url, data,header);
    }
    catch(ex){
        console.log('http service',ex)
    }   
}

const putService =(url,data,header)=>{
    try{
        return axios.put(url, data,header);
    }
    catch(ex){
        console.log('http service',ex)
    }   
}

const deleteService =(url,data,header)=>{
    try{
        return axios.delete(url, data,header);
    }
    catch(ex){
        console.log('http service',ex)
    }   
}

export {postService, getService, putService, deleteService};