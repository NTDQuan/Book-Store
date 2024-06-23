export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'))

    if(user && user.token) {
        return { Authorization: 'Bearer ' + user.token }
    } else {
        return {}
    }
}

export function authCustomerHeader() {
  const user = JSON.parse(localStorage.getItem('customer'))
  if(user && user.token) {
    return { Authorization: 'Bearer ' + user.token }
} else {
    return {}
}
}

export const registerUser = async (input) => {
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export const registerStaff = async (input) => {
    try {
      const response = await fetch('http://localhost:8080/auth/admin/staff-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };