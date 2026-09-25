import axios from 'axios';
import type { User } from '../types/types';

export async function loadUserData(token: string | undefined): Promise<User | undefined> {
  try {
    const userId = await getUserId(token);
    const userData = await getUserData(token, userId);

    return userData;
  } catch (error) {
    console.error('An error occurred when loading user data: ', error);
  }
}

async function getUserId(token: string | undefined) {
  const res = await axios({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/auth',
    headers: {
      ['Authorization']: `Bearer ${token}`,
      ['Content-Type']: 'application/json',
    },
  });

  return res.data.id;
}

async function getUserData(token: string | undefined, id: number) {
  if (id != null) {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8080/api/v1/users/${id}`,
      headers: {
        ['Authorization']: `Bearer ${token}`,
        ['Content-Type']: 'application/json',
      },
    });

    return res.data;
  }

  return null;
}
