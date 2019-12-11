import React, { createContext } from 'react';

export const defaultContext = {
  email: 'lowewenzel@gmail.com',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxvd2V3ZW56ZWxAZ21haWwuY29tIiwiZXhwIjoxNTc2MjYxNzA5LCJpZCI6MX0.ugiasi8uelgjGRWVKARasQR2rXkCyMoLwybSQTSzgfA'
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxvd2V3ZW56ZWxAZ21haWwuY29tIiwiZXhwIjoxNTc1ODI1MjA2LCJpZCI6MX0.bjYSLeTS_m_WZb43f8Odlv1HVCFJhrHMov_YxrhkvgE'
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlbnplbEBnbWFpbC5jb20iLCJleHAiOjE1NzE1MTI4MTksImlkIjoxNX0.UoWdDWg88RLrsCY-u9R6j4zEPI3B5OHvv0uMJb3vfAk'
};

const AppContext = createContext({ data: {}, setUserState: () => { } });

export default AppContext;
