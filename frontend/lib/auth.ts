import {jwtDecode} from 'jwt-decode';
// import { useRouter } from 'next/navigation';

type TMethod = "GET" | "POST" | "PUT" | "DELETE"

export const fetchProtectedData = async (url:string,method:TMethod, body:object | null=null ) => {
    const token = window.localStorage.getItem('token');
  
    if (!token) {
      console.log('User is not authenticated');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api${url}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          'Authorization': token,  // Include the token here
        },
        body: body ? JSON.stringify(body):body
      });
  
      // const data = await response.json();
      
      return response
      // if (response.ok) {
      //   console.log('Protected data fetched successfully', data);
      // } else {
      //   console.log('Failed to fetch protected data', data.message);
      // }
    } catch (error) {
      
      console.error('Error fetching protected data:', error);
    }
  };
  


export const isAuthenticated = () => {
  const token = window.localStorage.getItem('token');
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;  // Convert to seconds
    return decodedToken.exp? decodedToken.exp > currentTime : true;  // Check if token is expired
  } catch (error) {
    return false;
  }
};

export const logout = () => {
    return window.localStorage.removeItem('token')
}