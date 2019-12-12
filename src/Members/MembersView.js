import React, { useState, useCallback, useEffect, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';

import AppContext from '../AppContext';
import icons from './iconsHelper';
import { getAllMembers } from '../apiRequests';

const useStyles = makeStyles({
  table: {
    marginTop: 10
  },
  buttonBase: {
    '&:hover': {
      background: 'rgba(0,0,0,0.1)'
    },
    padding: 5,
    borderRadius: 5
  }
});

const MembersView = ({ members }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.table}>
      <MaterialTable
        columns={[
          {
            title: 'Name',
            field: 'name',
            render: row => (
              <Typography>
                {row.name +
                  (row.preferredName ? ` (${row.preferredName})` : '')}
              </Typography>
            )
          },
          {
            title: 'Group',
            field: 'group.groupName',
            render: row => (
              <ButtonBase className={classes.buttonBase}>
                <Link to={`groups/${row.groupId}`}>
                  <Typography variant='subtitle2' color='primary'>
                    {row.group.groupName}
                  </Typography>
                </Link>
              </ButtonBase>
            )
          },
          {
            title: 'Total Absences',
            field: 'numAbsent',
            filtering: false,
            render: row => (
              <Typography
                variant='caption'
                color={row.numAbsent ? 'error' : 'initial'}
              >
                {row.numAbsent}
              </Typography>
            )
          }
        ]}
        data={members}
        icons={icons}
        options={{ pageSize: 10, showTitle: false, filtering: true }}
      />
    </div>
  );
};

const MembersViewWithData = ({}) => {
  const context = useContext(AppContext);
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState([]);

  const refreshGroup = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllMembers(context.data.token);
      setLoading(false);
      setMembersData(res);
    } catch (err) {
      setLoading(false);
      console.error(err.response);
      setError([err.response].join('. '));
    }
  }, [context.data.token]);

  useEffect(() => {
    refreshGroup();
    setLoaded(true);
  }, [refreshGroup]);

  return !loading ? (
    <MembersView members={membersData} />
  ) : (
    <CircularProgress />
  );
};

export default MembersViewWithData;
