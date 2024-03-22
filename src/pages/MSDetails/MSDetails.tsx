import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { FC, ReactElement, useEffect } from 'react';


interface PhoneInfo {
  imei: string;
  imsi: string;
  activeScenario: string;
  isGps: boolean;
  dmPortNumber: number;
  modelName: string;
  lockStatus: boolean;
}

interface PhoneListProps {
  inspectionId: string;
}

const MSDetails: FC<Props> = (Props): ReactElement => {
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { };
  }, []);


  return (
    <Grid
      container
      justifyContent={'center'}
      alignItems={'center'}
      width={1}
      height={1}
      pt={2}
      spacing={1}
    >
      {
        [
          {
            imei: "imei",
            imsi: "imsi",
            activeScenario: "idle",
            isGps: true,
            dmPortNumber: 1,
            modelName: "EC25-E",
            lockStatus: false,
          }
        ].map((phone, index) => (
          <Grid key={index}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" sx={{ bgcolor: theme.palette.primary.light }}>
                    {index + 1}
                  </Avatar>
                }
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title="Phone"
                subheader={new Date().toDateString()}
              />
              <CardContent sx={{py:0}}>
                <p>IMEI: {phone.imei}</p>
                <p>IMSI: {phone.imsi}</p>
                <p>Active Scenario: {phone.activeScenario}</p>
                <p>GPS Enabled: {phone.isGps ? 'Yes' : 'No'}</p>
                <p>DM Port Number: {phone.dmPortNumber}</p>
                <p>Model Name: {phone.modelName}</p>
                <p>Lock Status: {phone.lockStatus ? 'Locked' : 'Unlocked'}</p>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default MSDetails;


