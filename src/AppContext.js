import React, { createContext } from 'react';

export const defaultContext = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlbnplbEBnbWFpbC5jb20iLCJleHAiOjE1NzE1MTI4MTksImlkIjoxNX0.UoWdDWg88RLrsCY-u9R6j4zEPI3B5OHvv0uMJb3vfAk'
};

const AppContext = createContext({ data: {}, setUserState: () => {} });

export default AppContext;
