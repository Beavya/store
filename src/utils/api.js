const API = process.env.VUE_APP_API;

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
      .then((result) => resolve(result.data))
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
      .then((result) => resolve(result.data.user_token))
      .catch((error) => {
        reject(error);
      });
  });
};

export const productsRequest = () => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => response.json())
      .then((result) => resolve(result.data))
      .catch((error) => {
        reject(error);
      });
  });
};

export const addToCartRequest = (productId, token) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/cart/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((result) => resolve(result.data))
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCartRequest = (token) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((result) => resolve(result.data))
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeFromCartRequest = (cartId, token) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/cart/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((result) => resolve(result.data))
      .catch((error) => {
        reject(error);
      });
  });
};