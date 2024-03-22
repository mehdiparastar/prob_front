import React, { ReactElement, FC } from 'react';
import { Box, Typography } from '@mui/material';


const About: FC<any> = (): ReactElement => {

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { };
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 1
      }}
    >
      <Typography fontFamily={'iransansx'} variant="h3">
        اداره کل تنظیم مقررات و ارتباطات رادیویی منطقه آذر
      </Typography>
    </Box>
  );
};

export default About;
