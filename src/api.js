import axios from "axios";

function tokenHeader(token) {
  return { headers: { authorization: `Bearer ${token}` } };
}

export async function signup(data) {
  return await axios.put(`${process.env.SERVER_URL}/signup`, data);
}

export async function login(data) {
  return await axios.post(`${process.env.SERVER_URL}/signin`, data);
}

export async function addTrustee(data) {
  return await axios.post(
    `${process.env.SERVER_URL}/admin/add-syndic`,
    data,
    tokenHeader(data.token)
  );
}

export async function home(token) {
  return await axios.get(
    `${process.env.SERVER_URL}/admin/`,
    tokenHeader(token)
  );
}

export async function syndicHome(token) {
  return await axios.get(
    `${process.env.SERVER_URL}/syndic`,
    tokenHeader(token)
  );
}

export async function refreshUserInfo(token) {
  return await axios.get(`${process.env.SERVER_URL}/user/`, tokenHeader(token));
}

export async function residentHome(token) {
  return await axios.get(
    `${process.env.SERVER_URL}/resident/`,
    tokenHeader(token)
  );
}

export async function rent(data) {
  return await axios.post(
    `${process.env.SERVER_URL}/resident/request-app`,
    data,
    tokenHeader(data.token)
  );
}

export async function syndicRequest(token) {
  return await axios.get(
    `${process.env.SERVER_URL}/syndic/requests`,
    tokenHeader(token)
  );
}

export async function response(data) {
  return await axios.post(
    `${process.env.SERVER_URL}/syndic/interacte`,
    data,
    tokenHeader(data.token)
  );
}
