import { Alert, Autocomplete, Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, Container, Grow, Paper, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { FC, ReactElement, useEffect, useState } from 'react';
import { IInspection, useFindMSDetailsMutation, useGetAllInspectionsQuery, useGetCurrentActiveInspectionQuery } from '../../redux/features/probApiSlice';
import { formatDistanceToNow } from 'date-fns';
import { logLocationType } from '../Home/components/Hero/Hero';



export interface IMSDetails {
  IMEI: string;
  IMSI: string;
  activeScenario: string;
  isGPS: boolean;
  dmPortNumber: number;
  modelName: string;
  revision: string;
  lockStatus: techType;
  simStatus: string;
  callability: boolean;
  updatedAt: Date;
  createdAt: Date;
}

interface PhoneListProps {
  inspectionId: string;
}

interface IInspectionFilter {
  inspectionId: number[]
}

export enum techType {
  gsm = 'GSM',
  wcdma = 'WCDMA',
  lte = 'LTE',
  alltech = 'ALLTECH'
}

const MSDetails: FC<Props> = (Props): ReactElement => {
  const theme = useTheme();
  const { data: allInspections = [] } = useGetAllInspectionsQuery()
  const { data: currentActiveInspectiony } = useGetCurrentActiveInspectionQuery()
  const [findMsDetails] = useFindMSDetailsMutation()
  const [msDetails, setMSDetails] = useState<IMSDetails[]>([])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { };
  }, []);

  const initialValues: IInspectionFilter = {
    inspectionId: []
  };


  return (
    <Container
      maxWidth="xl"
      sx={{
        px: 2,
        py: { xs: 1, sm: 2, md: 3 },
        position: 'relative',
        zIndex: 2,
      }}
    >
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
          currentActiveInspectiony &&
          <Grid xs={12}>
            <Alert severity="info">Active Inspection is: {currentActiveInspectiony.id} - {currentActiveInspectiony.type} - {currentActiveInspectiony.code}</Alert>
          </Grid>
        }
        <Grid xs={12}>
          <Autocomplete
            options={allInspections}
            getOptionLabel={(option: IInspection) => `${option.id} - ${option.type} - ${option.code}`}
            renderInput={(params) => <TextField {...params} label="Inspection (id - type - code)" />}
            onChange={async (event, value) => {
              if (value) {
                const res = await findMsDetails({ inspectionId: value.id }).unwrap()
                setMSDetails(res)
              }
            }}
          />

        </Grid>
        {
          msDetails.map((phone, index) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={index} >
              <Grow in={true} timeout={(index + 1) * 200}>
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
                    subheader={formatDistanceToNow(new Date(phone.updatedAt)) + " ago"}
                  />
                  <CardContent sx={{ py: 0 }}>
                    <p>IMEI: {phone.IMEI}</p>
                    <p>IMSI: {phone.IMSI}</p>
                    <p>Scenario: {phone.activeScenario}</p>
                    <p>GPS Enabled: {phone.isGPS ? 'Yes' : 'No'}</p>
                    <p>DM Port: {phone.dmPortNumber}</p>
                    <p>Model Name: {phone.modelName}</p>
                    <p>Revision: {phone.revision.replace(phone.modelName, "")}</p>
                    <p>Lock Status: {phone.lockStatus}</p>
                    <p>Sim Status: {phone.simStatus}</p>
                    <p>Callability: {phone.callability ? 'Yes' : 'No'}</p>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
      </Grid>
    </Container >
  );
};

export default MSDetails;


