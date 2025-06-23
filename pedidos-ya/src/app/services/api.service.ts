import { Injectable } from '@angular/core';
import axios from 'axios';
import { config } from '../config/env';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  async getData(): Promise<
    Array<{ name: string; description: string; image: string }>
  > {
     return (await axios.get(config.urls.getFood)).data
  }

  
  async login(data:{email:string,password:string}){
    try{
      const response = await axios.post('http://localhost:3001/login',data)
      const token = response.data.access_token
      localStorage.setItem('access_token', token);
    }catch (error){
      console.log('Error backend login:', error);
      throw new Error('Credenciales inválidas o error en el servidor');
    }
    
  }


  async register(data:{email:string,password:string}){
    try{
      const response = await axios.post('http://localhost:3001/register', data)
      return response.data;
    }catch(error){
      throw new Error('Error en el registro');
    }
  }
}
