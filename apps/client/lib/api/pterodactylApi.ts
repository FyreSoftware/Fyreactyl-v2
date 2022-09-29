import baseUrl from '../baseUrl';

export const getSettings = async () => {
  try {
    const response = await fetch(`${baseUrl}/settings`, {
      method: 'GET',
    }).then((res) => res.json());
    if (response.status === 401) {
      throw new Error('Unauthorised');
    }
    return response;
  } catch (err) {
    return err;
  }
};
export const getAllEggs = async () => {
  try {
    const response = await fetch(`${baseUrl}/pterodactyl/eggs`, {
      method: 'GET',
    }).then((res) => res.json());
    if (response.status === 401) {
      throw new Error('Unauthorised');
    }
    return response;
  } catch (err) {
    return err;
  }
};
export const getAllNodes = async () => {
  try {
    const response = await fetch(`${baseUrl}/pterodactyl/nodes`, {
      method: 'GET',
    }).then((res) => res.json());
    if (response.status === 401) {
      throw new Error('Unauthorised');
    }
    return response;
  } catch (err) {
    return err;
  }
};
export const addEgg = async (id: string, nest: string, name: string) => {
  try {
    const response = await fetch(`${baseUrl}/settings/eggs`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id, nest, name,
      }),
    }).then((res) => res.json());
    if (response.status === 401) {
      throw new Error('Unauthorised');
    }
    return response;
  } catch (err) {
    return err;
  }
};
export const updateName = async (name: string) => {
  try {
    const response = await fetch(`${baseUrl}/settings/name`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    }).then((res) => res.json());
    if (response.status === 401) {
      throw new Error('Unauthorised');
    }
    return response;
  } catch (err) {
    return err;
  }
};
export const getDBEggs = async () => {
  try {
    const response = await fetch(`${baseUrl}/settings`, {
      method: 'GET',
    }).then((res) => res.json());
    if (response.status === 401) {
      throw new Error('Unauthorised');
    }
    return response.eggs;
  } catch (err) {
    return err;
  }
};
export const removeEgg = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/settings/eggs`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    }).then((res) => res.json());
    if (response.status === 401) {
      throw new Error('Unauthorised');
    }
    return response;
  } catch (err) {
    return err;
  }
};
export const addNode = async (id: string, name: string) => {
  try {
    const response = await fetch(`${baseUrl}/settings/nodes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id, name,
      }),
    }).then((res) => res.json());
    if (response.status === 401) {
      throw new Error('Unauthorised');
    }
    return response;
  } catch (err) {
    return err;
  }
};
export const removeNode = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/settings/nodes`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    }).then((res) => res.json());
    if (response.status === 401) {
      throw new Error('Unauthorised');
    }
    return response;
  } catch (err) {
    return err;
  }
};
