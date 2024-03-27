import { Checkbox, Container, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grow } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { FC, ReactElement, useEffect, useState } from 'react';
import { Hero } from './components/Hero/Hero';
import MCIGSMLockIdleLMap from '../../components/MSMap/MCIGSMLockIdleLMap';
import MTNGSMLockIdleLMap from '../../components/MSMap/MTNGSMLockIdleLMap';
import MCIWCDMALockIdleLMap from '../../components/MSMap/MCIWCDMALockIdleLMap';
import MTNWCDMALockIdleLMap from '../../components/MSMap/MTNWCDMALockIdleLMap';
import MCILTELockIdleLMap from '../../components/MSMap/MCILTELockIdleLMap';
import MTNLTELockIdleLMap from '../../components/MSMap/MTNLTELockIdleLMap';
import MCIGSMLockLongCallLMap from '../../components/MSMap/MCIGSMLockLongCallLMap';
import MTNGSMLockLongCallLMap from '../../components/MSMap/MTNGSMLockLongCallLMap';
import MCIWCDMALockLongCallLMap from '../../components/MSMap/MCIWCDMALockLongCallLMap';
import MTNWCDMALockLongCallLMap from '../../components/MSMap/MTNWCDMALockLongCallLMap';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCookies } from "react-cookie";

interface IselectedMS {
  _2GLockIdle: boolean,
  _3GLockIdle: boolean,
  _4GLockIdle: boolean,
  _2GLockLongCall: boolean,
  _3GLockLongCall: boolean,
  ftpDownload: boolean
}

const Home: FC<Props> = (Props): ReactElement => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });
  const [cookies, setCookie] = useCookies<string, { 'selectedMCIMS': IselectedMS, 'selectedMTNMS': IselectedMS }>(['selectedMCIMS', 'selectedMTNMS']);


  const [mciSelectedMS, setMciSelectedMS] = useState<IselectedMS>(cookies['selectedMCIMS'] || {
    _2GLockIdle: false,
    _3GLockIdle: false,
    _4GLockIdle: false,
    _2GLockLongCall: false,
    _3GLockLongCall: false,
    ftpDownload: false
  })
  const [mtnSelectedMS, setMtnSelectedMS] = useState<IselectedMS>(cookies['selectedMTNMS'] || {
    _2GLockIdle: false,
    _3GLockIdle: false,
    _4GLockIdle: false,
    _2GLockLongCall: false,
    _3GLockLongCall: false,
    ftpDownload: false
  })

  const activeMapList = [...Object.entries(mciSelectedMS).filter(item => item.includes(true)).flat(Infinity).filter(item => item !== true).map(item => item + "_mci"), ...Object.entries(mtnSelectedMS).filter(item => item.includes(true)).flat(Infinity).filter(item => item !== true).map(item => item + "_mtn")]

  const handleMCIMSSelectedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      // ...mciSelectedMS,
      _2GLockIdle: false,
      _3GLockIdle: false,
      _4GLockIdle: false,
      _2GLockLongCall: false,
      _3GLockLongCall: false,
      ftpDownload: false,
      [event.target.name]: event.target.checked,
    }
    setCookie('selectedMCIMS', newState)
    setMciSelectedMS(newState);
  };

  const handleMTNMSSelectedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      // ...mtnSelectedMS,
      _2GLockIdle: false,
      _3GLockIdle: false,
      _4GLockIdle: false,
      _2GLockLongCall: false,
      _3GLockLongCall: false,
      ftpDownload: false,
      [event.target.name]: event.target.checked,
    }
    setCookie('selectedMTNMS', newState)
    setMtnSelectedMS(newState);
  };

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
    >
      <Grid
        xs={12}
        bgcolor={theme.palette.alternate.main}
        position="relative"
      >
        <Container
          maxWidth="xl"
          sx={{
            px: 2,
            py: { xs: 4, sm: 6, md: 8 },
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Hero />
        </Container>
      </Grid>
      <Grid xs={12}>
        <Container
          maxWidth="lg"
          sx={{
            px: 2,
            py: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <FormControl sx={{ width: 1 }} component="fieldset" variant='outlined'>
            <FormLabel sx={{ pb: 1 }} component="legend">Select the desired MS(s) to display:</FormLabel>
            <Grid container columnSpacing={4}>
              <Grid xs={6}>
                <FormGroup aria-label="position">
                  <FormControlLabel
                    value="mci2GLockIdle"
                    control={<Checkbox checked={mciSelectedMS._2GLockIdle} onChange={handleMCIMSSelectedChange} name='_2GLockIdle' icon={<PhoneIphoneIcon />} checkedIcon={<PhoneIphoneIcon color='secondary' />} />}
                    label={<small>2G Lock Idle</small>}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={mciSelectedMS._3GLockIdle} onChange={handleMCIMSSelectedChange} name='_3GLockIdle' icon={<PhoneIphoneIcon />} checkedIcon={<PhoneIphoneIcon color='secondary' />} />}
                    label={<small>3G Lock Idle</small>}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={mciSelectedMS._4GLockIdle} onChange={handleMCIMSSelectedChange} name='_4GLockIdle' icon={<PhoneIphoneIcon />} checkedIcon={<PhoneIphoneIcon color='secondary' />} />}
                    label={<small>4G Lock Idle</small>}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={mciSelectedMS._2GLockLongCall} onChange={handleMCIMSSelectedChange} name='_2GLockLongCall' icon={<PhoneIphoneIcon />} checkedIcon={<PhoneIphoneIcon color='secondary' />} />}
                    label={<small>2G Lock LongCall</small>}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={mciSelectedMS._3GLockLongCall} onChange={handleMCIMSSelectedChange} name='_3GLockLongCall' icon={<PhoneIphoneIcon />} checkedIcon={<PhoneIphoneIcon color='secondary' />} />}
                    label={<small>3G Lock LongCall</small>}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={mciSelectedMS.ftpDownload} name='ftpDownload' icon={<PhoneIphoneIcon />} checkedIcon={<PhoneIphoneIcon color='secondary' />} />}
                    label={<small>FTP Download</small>}
                    labelPlacement="end"
                  />
                  <Divider />
                  <FormHelperText>MCI</FormHelperText>
                </FormGroup>
              </Grid>
              <Grid xs={6} >
                <FormGroup aria-label="position">
                  <FormControlLabel
                    value="top"
                    control={<Checkbox checked={mtnSelectedMS._2GLockIdle} onChange={handleMTNMSSelectedChange} name='_2GLockIdle' icon={<PhoneIphoneIcon />} checkedIcon={<PhoneIphoneIcon color='secondary' />} />}
                    label={<small>2G Lock Idle</small>}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={mtnSelectedMS._3GLockIdle} onChange={handleMTNMSSelectedChange} name='_3GLockIdle' icon={<PhoneIphoneIcon />} checkedIcon={<PhoneIphoneIcon color='secondary' />} />}
                    label={<small>3G Lock Idle</small>}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={mtnSelectedMS._4GLockIdle} onChange={handleMTNMSSelectedChange} name='_4GLockIdle' icon={<PhoneIphoneIcon />} checkedIcon={<PhoneIphoneIcon color='secondary' />} />}
                    label={<small>4G Lock Idle</small>}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={mtnSelectedMS._2GLockLongCall} onChange={handleMTNMSSelectedChange} name='_2GLockLongCall' icon={<PhoneIphoneIcon />} checkedIcon={<PhoneIphoneIcon color='secondary' />} />}
                    label={<small>2G Lock LongCall</small>}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={mtnSelectedMS._3GLockLongCall} onChange={handleMTNMSSelectedChange} name='_3GLockLongCall' icon={<PhoneIphoneIcon />} checkedIcon={<PhoneIphoneIcon color='secondary' />} />}
                    label={<small>3G Lock LongCall</small>}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={mtnSelectedMS.ftpDownload} name='ftpDownload' icon={<PhoneIphoneIcon />} checkedIcon={<PhoneIphoneIcon color='secondary' />} />}
                    label={<small>FTP Download</small>}
                    labelPlacement="end"
                  />
                  <Divider />
                  <FormHelperText>MTN</FormHelperText>
                </FormGroup>
              </Grid>
            </Grid>
          </FormControl>
        </Container>
      </Grid>
      {
        activeMapList.map((key, index) => {

          if (key === "_2GLockIdle_mci") {
            return (
              <Grow key={index} in={true} timeout={1000}>
                <Grid
                  xs={12}
                  sm={(activeMapList.length % 2 !== 0 && index === activeMapList.length - 1) ? 12 : 6}
                  bgcolor={isSm ? (((index % 4 === 0) || (index % 4 === 1)) ? theme.palette.alternate.main : undefined) : (index % 2 === 0 ? theme.palette.alternate.main : undefined)}
                >
                  <Container
                    maxWidth="lg"
                    sx={{
                      px: 2,
                      py: { xs: 4, sm: 6, md: 8 },
                    }}
                  >
                    <MCIGSMLockIdleLMap />
                  </Container>
                </Grid>
              </Grow>
            )
          }

          if (key === "_3GLockIdle_mci") {
            return (
              <Grow key={index} in={true} timeout={1000}>
                <Grid
                  xs={12}
                  sm={(activeMapList.length % 2 !== 0 && index === activeMapList.length - 1) ? 12 : 6}
                  bgcolor={isSm ? (((index % 4 === 0) || (index % 4 === 1)) ? theme.palette.alternate.main : undefined) : (index % 2 === 0 ? theme.palette.alternate.main : undefined)}
                >
                  <Container
                    maxWidth="lg"
                    sx={{
                      px: 2,
                      py: { xs: 4, sm: 6, md: 8 },
                    }}
                  >
                    <MCIWCDMALockIdleLMap />
                  </Container>
                </Grid>
              </Grow>
            )
          }

          if (key === "_4GLockIdle_mci") {
            return (
              <Grow key={index} in={true} timeout={1000}>
                <Grid
                  xs={12}
                  sm={(activeMapList.length % 2 !== 0 && index === activeMapList.length - 1) ? 12 : 6}
                  bgcolor={isSm ? (((index % 4 === 0) || (index % 4 === 1)) ? theme.palette.alternate.main : undefined) : (index % 2 === 0 ? theme.palette.alternate.main : undefined)}
                >
                  <Container
                    maxWidth="lg"
                    sx={{
                      px: 2,
                      py: { xs: 4, sm: 6, md: 8 },
                    }}
                  >
                    <MCILTELockIdleLMap />
                  </Container>
                </Grid>
              </Grow>
            )
          }

          if (key === "_2GLockLongCall_mci") {
            return (
              <Grow key={index} in={true} timeout={1000}>
                <Grid
                  xs={12}
                  sm={(activeMapList.length % 2 !== 0 && index === activeMapList.length - 1) ? 12 : 6}
                  bgcolor={isSm ? (((index % 4 === 0) || (index % 4 === 1)) ? theme.palette.alternate.main : undefined) : (index % 2 === 0 ? theme.palette.alternate.main : undefined)}
                >
                  <Container
                    maxWidth="lg"
                    sx={{
                      px: 2,
                      py: { xs: 4, sm: 6, md: 8 },
                    }}
                  >
                    <MCIGSMLockLongCallLMap />
                  </Container>
                </Grid>
              </Grow>
            )
          }

          if (key === "_3GLockLongCall_mci") {
            return (
              <Grow key={index} in={true} timeout={1000}>
                <Grid
                  xs={12}
                  sm={(activeMapList.length % 2 !== 0 && index === activeMapList.length - 1) ? 12 : 6}
                  bgcolor={isSm ? (((index % 4 === 0) || (index % 4 === 1)) ? theme.palette.alternate.main : undefined) : (index % 2 === 0 ? theme.palette.alternate.main : undefined)}
                >
                  <Container
                    maxWidth="lg"
                    sx={{
                      px: 2,
                      py: { xs: 4, sm: 6, md: 8 },
                    }}
                  >
                    <MCIWCDMALockLongCallLMap />
                  </Container>
                </Grid>
              </Grow>
            )
          }

          if (key === "_2GLockIdle_mtn") {
            return (
              <Grow key={index} in={true} timeout={1000}>
                <Grid
                  xs={12}
                  sm={(activeMapList.length % 2 !== 0 && index === activeMapList.length - 1) ? 12 : 6}
                  bgcolor={isSm ? (((index % 4 === 0) || (index % 4 === 1)) ? theme.palette.alternate.main : undefined) : (index % 2 === 0 ? theme.palette.alternate.main : undefined)}
                >
                  <Container
                    maxWidth="lg"
                    sx={{
                      px: 2,
                      py: { xs: 4, sm: 6, md: 8 },
                    }}
                  >
                    <MTNGSMLockIdleLMap />
                  </Container>
                </Grid>
              </Grow>
            )
          }

          if (key === "_3GLockIdle_mtn") {
            return (
              <Grow key={index} in={true} timeout={1000}>
                <Grid
                  xs={12}
                  sm={(activeMapList.length % 2 !== 0 && index === activeMapList.length - 1) ? 12 : 6}
                  bgcolor={isSm ? (((index % 4 === 0) || (index % 4 === 1)) ? theme.palette.alternate.main : undefined) : (index % 2 === 0 ? theme.palette.alternate.main : undefined)}
                >
                  <Container
                    maxWidth="lg"
                    sx={{
                      px: 2,
                      py: { xs: 4, sm: 6, md: 8 },
                    }}
                  >
                    <MTNWCDMALockIdleLMap />
                  </Container>
                </Grid>
              </Grow>
            )
          }

          if (key === "_4GLockIdle_mtn") {
            return (
              <Grow key={index} in={true} timeout={1000}>
                <Grid
                  xs={12}
                  sm={(activeMapList.length % 2 !== 0 && index === activeMapList.length - 1) ? 12 : 6}
                  bgcolor={isSm ? (((index % 4 === 0) || (index % 4 === 1)) ? theme.palette.alternate.main : undefined) : (index % 2 === 0 ? theme.palette.alternate.main : undefined)}
                >
                  <Container
                    maxWidth="lg"
                    sx={{
                      px: 2,
                      py: { xs: 4, sm: 6, md: 8 },
                    }}
                  >
                    <MTNLTELockIdleLMap />
                  </Container>
                </Grid>
              </Grow>
            )
          }

          if (key === "_2GLockLongCall_mtn") {
            return (
              <Grow key={index} in={true} timeout={1000}>
                <Grid
                  xs={12}
                  sm={(activeMapList.length % 2 !== 0 && index === activeMapList.length - 1) ? 12 : 6}
                  bgcolor={isSm ? (((index % 4 === 0) || (index % 4 === 1)) ? theme.palette.alternate.main : undefined) : (index % 2 === 0 ? theme.palette.alternate.main : undefined)}
                >
                  <Container
                    maxWidth="lg"
                    sx={{
                      px: 2,
                      py: { xs: 4, sm: 6, md: 8 },
                    }}
                  >
                    <MTNGSMLockLongCallLMap />
                  </Container>
                </Grid>
              </Grow>
            )
          }

          if (key === "_3GLockLongCall_mtn") {
            return (
              <Grow key={index} in={true} timeout={1000}>
                <Grid
                  xs={12}
                  sm={(activeMapList.length % 2 !== 0 && index === activeMapList.length - 1) ? 12 : 6}
                  bgcolor={isSm ? (((index % 4 === 0) || (index % 4 === 1)) ? theme.palette.alternate.main : undefined) : (index % 2 === 0 ? theme.palette.alternate.main : undefined)}
                >
                  <Container
                    maxWidth="lg"
                    sx={{
                      px: 2,
                      py: { xs: 4, sm: 6, md: 8 },
                    }}
                  >
                    <MTNWCDMALockLongCallLMap />
                  </Container>
                </Grid>
              </Grow>
            )
          }

          return null;

        })
          .filter(item => item !== null)
      }

      <Grid
        xs={12}
        bgcolor={theme.palette.alternate.main}
        minHeight={20}
      >

      </Grid>

    </Grid>
  );
};

export default Home;
