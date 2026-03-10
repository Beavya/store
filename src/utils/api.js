const API = 'http://lifestealer86.ru/api-shop';


export const loginRequest = (user) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => resolve(result.data.user_token))
      .catch((error) => {
        reject(error);
      });
  });
};

export const logoutRequest = (token) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/logout`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data && result.data.message === 'logout') {
          resolve(result.data);
        } else {
          reject(result);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const signupRequest = (userData) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data && result.data.user_token) {
          resolve(result.data.user_token);
        } else {
          reject(result);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};