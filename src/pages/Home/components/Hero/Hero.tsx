import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Button, CircularProgress, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Item from '../../../../components/Item/Item';
import { usePortsInitingStatusQuery } from '../../../../redux/features/probSocketApiSlice';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Fab from '@mui/material/Fab';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';


export enum logLocationType {
  road = 'road',
  village = 'village',
  city = 'city',
  test = 'test'
}

export const Hero: React.FC<Props> = (props) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const { data: socketData } = usePortsInitingStatusQuery()

  const [logLocation, setLogLocation] = useState<logLocationType>();
  const [expert, setExpert] = useState<string>();
  const [code, setCode] = useState<string>();


  const handleChangeLogLoc = (event: SelectChangeEvent) => {
    setLogLocation(event.target.value as logLocationType);
  };

  const handleChangeExpert = (event: SelectChangeEvent) => {
    setExpert(event.target.value as string);
  };

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={0.5}
      columns={24}
      textAlign={'center'}
    >
      {
        socketData?.map((item, index) => (
          <Grid
            xs={3}
            textAlign={'center'}
            justifyItems={'center'}
            justifyContent={'center'}
            key={index}
          >
            <Stack
              direction={'column'}
              spacing={0.5}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <PhoneIphoneIcon sx={{ width: 50, height: 50 }} color={item.progress === 100 ? "success" : "error"} />
              {item.progress !== 100 && <CircularProgress variant='determinate' value={item.progress} size={25} />}
            </Stack>
          </Grid>))
      }

      <Grid
        xs={16}
        textAlign={'center'}
        justifyItems={'center'}
        justifyContent={'center'}
      >
        <FormControl fullWidth>
          <InputLabel id="user-label">Expert</InputLabel>
          <Select
            labelId="user-label"
            id="user"
            value={expert}
            label="Expert"
            onChange={handleChangeExpert}
          >
            <MenuItem value={"1"}>{"Mehdi Parastar"}</MenuItem>
            <MenuItem value={"2"}>{"Ali BesharatDoust"}</MenuItem>
            <MenuItem value={"3"}>{"Farshad Harif Kargaran"}</MenuItem>
            <MenuItem value={"4"}>{"Nima Fazeli"}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid
        xs={8}
        textAlign={'center'}
        justifyItems={'center'}
        justifyContent={'center'}
      >
        <FormControl fullWidth>
          <InputLabel id="log-location-type-label">Type</InputLabel>
          <Select
            labelId="log-location-type-label"
            id="log-location-type"
            value={logLocation}
            label="Type"
            onChange={handleChangeLogLoc}
          >
            <MenuItem value={logLocationType.city}>{logLocationType.city}</MenuItem>
            <MenuItem value={logLocationType.road}>{logLocationType.road}</MenuItem>
            <MenuItem value={logLocationType.village}>{logLocationType.village}</MenuItem>
            <MenuItem value={logLocationType.test}>{logLocationType.test}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid
        xs={16}
        textAlign={'center'}
        justifyItems={'center'}
        justifyContent={'center'}
      >
        <TextField
          id="outlined-controlled"
          label="Code"
          value={code}
          placeholder='Enter Code'
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCode(event.target.value);
          }}
        />
      </Grid>

      <Grid
        xs={8}
        textAlign={'center'}
        justifyItems={'center'}
        justifyContent={'center'}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ height: '100%' }}
        >
          INIT
        </Button>
      </Grid>

    </Grid>
  );
};

