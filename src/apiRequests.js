import axios from 'axios';

// const API_URL = 'https://attendance-go.herokuapp.com/api';
const API_URL = 'http://localhost:1444/api';

export const getGroups = async token => {
  const res = await axios.get(`${API_URL}/groups?token=${token}`);

  return res && res.data;
};

export const postSignup = async ({ email, password }) => {
  const res = await axios.post(`${API_URL}/signup`, {
    email,
    password
  });

  return res.data.token;
};

export const postLogin = async ({ email, password }) => {
  const res = await axios.post(`${API_URL}/login`, {
    email,
    password
  });

  return res.data.token;
};

export const postGroup = async ({ groupName, memberName }, token) => {
  const res = await axios.post(`${API_URL}/groups?token=${token}`, {
    groupName,
    memberName
  });

  return res.data;
};

export const getGroup = async (groupId, token) => {
  const res = await axios.get(`${API_URL}/group/${groupId}?token=${token}`);

  return res.data;
};

export const getAttendance = async (groupId, date, token) => {
  const res = await axios.get(
    `${API_URL}/group/${groupId}/${date}?token=${token}`
  );

  return res.data;
};

export const putAttendance = async (groupId, date, memberId, status, token) => {
  const res = await axios.put(
    `${API_URL}/group/${groupId}/${date}/${memberId}?v=${status}&token=${token}`
  );

  return res.data;
};

export const putBulk = async (groupId, date, members, status, token) => {
  const res = await axios.put(
    `${API_URL}/group/bulk/${groupId}/${date}?token=${token}`,
    {
      members,
      value: status,
    }
  );

  return res.data;
}

export const postMember = async (
  { name, preferredName = '' },
  groupId,
  token
) => {
  await axios.post(`${API_URL}/group/${groupId}/members?token=${token}`, {
    name,
    preferredName
  });

  return true;
};
