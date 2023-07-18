import React from 'react';
import { Box, Typography } from '@mui/material';

interface LoginStatusProps {
  isLoggedIn: boolean;
}

const LoginStatus: React.FC<LoginStatusProps> = ({ isLoggedIn }) => {
  return (
    <Box mt={2}>
      <Typography variant="h6" color={isLoggedIn ? 'primary' : 'secondary'}>
        {isLoggedIn ? 'You are logged in.' : 'You are logged out.'}
      </Typography>
    </Box>
  );
};

export default LoginStatus;

//6Ld0gConAAAAAMet4QAOCm24MC0skRR8VpihtpkL