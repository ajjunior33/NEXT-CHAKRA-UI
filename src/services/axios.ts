import axios from 'axios';

export function getApplicationClient(){
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjQ2Njk4MzQsImV4cCI6MTY2NzI2MTgzNCwic3ViIjoiMiJ9.9jaCEBXL8wiL2d825SjQsjZTzsERgpUgoi1KsQWBUxA";
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers:{
      Authorization: `Bearer ${token}`
    }
  });
  return api
}