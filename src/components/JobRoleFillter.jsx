import { TextField } from '@mui/material';
import React from 'react';

const JobRoleFillter = ({ onChange, filters }) => {
  const handleJobRoleChange = (e) => {
    onChange({ ...filters, role: e.target.value });
  };

  return (
    <>
      <TextField
        label='Job Role'
        color='secondary'
        focused
        onChange={handleJobRoleChange}
      />
    </>
  );
};

export default JobRoleFillter;

