import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { Box, Button, ButtonGroup, FormControl, FormHelperText, Grow, InputLabel, LinearProgress, MenuItem, Paper, Stack, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { useInitPortsMutation, useStoppingDTMutation } from '../../../../redux/features/probApiSlice';
import { dtCurrentStatusENUM, useGetDTCurrentStatusQuery, usePortsInitingStatusQuery } from '../../../../redux/features/probSocketApiSlice';

enum submitTypeENUM {
  init = "INIT",
  start = "START",
  pause = "PAUSE",
  resume = "RESUME",
  stop = "STOP",
}

export enum logLocationType {
  road = 'Road',
  village = 'Village',
  city = 'City',
  test = 'Test'
}

interface IFormikValues {
  logLocation: logLocationType,
  expertId: number,
  code: string
}

const Phones: React.FC<Props> = (props) => {
  const theme = useTheme();
  const { data: socketData } = usePortsInitingStatusQuery()

  return (
    <Paper elevation={4} sx={{ mb: 4, background: 'transparent', border: `0.5px solid ${theme.palette.divider}` }}>
      {!!socketData?.find(item => item.progress > 0) &&
        <Grid
          container
          rowSpacing={1}
          columnSpacing={0.5}
          columns={24}
          textAlign={'center'}
        >
          {
            socketData?.map((item, index) => (
              <Grow key={index} in={true} timeout={1000}>
                <Grid
                  xs={3}
                  textAlign={'center'}
                  justifyItems={'center'}
                  justifyContent={'center'}
                >
                  <Box
                    sx={{
                      width: `${item.progress}%`,
                      margin: 'auto',
                      overflow: 'hidden',
                      transition: 'width 0.5s ease-in-out, margin 0.5s ease-in-out', // Adjust the transition properties as needed
                      transformOrigin: 'center', // To make the transformation originate from the center
                      transform: 'scaleX(1)', // Initial scale, you can adjust this as needed
                      pt: 1
                    }}
                  >
                    <PhoneIphoneIcon
                      sx={{
                        width: 45,
                        height: 45,
                        transition: 'all .2s ease-in-out',
                        '&:hover': {
                          transform: `translateY(-${theme.spacing(0.5)})`,
                        },
                      }}
                      color={item.progress === 100 ? "success" : "error"}
                    />
                  </Box>
                </Grid>
              </Grow>))
          }
        </Grid>
      }
    </Paper>
  )
}



export const Hero: React.FC<Props> = (props) => {
  const theme = useTheme();
  // eslint-disable-next-line 
  const isMd = useMediaQuery(theme.breakpoints.up('md'), { defaultMatches: true });

  const { enqueueSnackbar } = useSnackbar()

  const { data: currentDTStatus } = useGetDTCurrentStatusQuery()
  const [probPortsIniting] = useInitPortsMutation()
  const [stoppingDT] = useStoppingDTMutation()

  const loading = !!(currentDTStatus &&
    (currentDTStatus.status === dtCurrentStatusENUM.findingLoc ||
      currentDTStatus.status === dtCurrentStatusENUM.initing ||
      currentDTStatus.status === dtCurrentStatusENUM.starting ||
      currentDTStatus.status === dtCurrentStatusENUM.stopping))

  const validationSchema = yup.object/*<Shape<ICreateChatRoomFormDto>>*/({
    logLocation: yup
      .string()
      .required('required')
      .oneOf(Object.values(logLocationType), 'Invalid value.'),
    expertId: yup
      .number()
      .required('required'),
    code: yup
      .string()
      .required('required')
      .min(5, 'Min Len is 5'),
  });

  const formik = useFormik<IFormikValues>({
    initialValues: {
      logLocation: logLocationType.test,
      expertId: 1,
      code: ""
    },
    validationSchema
    ,
    onSubmit: async (values, formikHelpers) => {
      try {
        console.log(formikHelpers.validateField("logLocation"))
      }

      catch (err: any) {
        enqueueSnackbar(`${err?.status || "An Error has occured."}`, { variant: 'error' })
      }
    },

  })


  const handleSubmit = async (values: IFormikValues, formikHelpers: any, submitType: string) => {
    try {
      if (!!!(await formik.validateForm())) {
        if (submitType === submitTypeENUM.init) {
          const { msg } = await probPortsIniting({ type: values.logLocation, expertId: values.expertId, code: values.code }).unwrap()
          enqueueSnackbar(`${msg}`, { variant: 'success' })
        }
        if (submitType === submitTypeENUM.start) {

        }
        if (submitType === submitTypeENUM.pause) {

        }
        if (submitType === submitTypeENUM.resume) {

        }
        if (submitType === submitTypeENUM.stop) {
          const { msg } = await stoppingDT().unwrap()
          enqueueSnackbar(`${msg}`, { variant: 'success' })
        }
      }
    }
    catch (err: any) {
      enqueueSnackbar(`${err?.status || "An Error has occured."}`, { variant: 'error' })
    }
  }



  return (
    <Stack direction={'column'}>
      <TextField variant='filled' sx={{ mb: 2 }} label="Current Status:" value={currentDTStatus?.status || "There is no connection."} />
      <Phones />
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          rowSpacing={1.5}
          columnSpacing={1}
          columns={24}
          textAlign={'center'}
        >
          <Grid
            xs={16}
            textAlign={'center'}
            justifyItems={'center'}
            justifyContent={'center'}
          >
            <FormControl required fullWidth error={formik.touched.expertId && Boolean(formik.errors.expertId)}>
              <InputLabel id="expert-label">Expert</InputLabel>
              <Select
                inputProps={{ readOnly: !!!(currentDTStatus?.status === dtCurrentStatusENUM.idle || currentDTStatus?.status === dtCurrentStatusENUM.stopped) }}
                size='small'
                labelId="expert-label"
                name="expertId"
                value={formik.values.expertId}
                label="Expert"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value={1}>{"Mehdi Parastar"}</MenuItem>
                <MenuItem value={2}>{"Ali BesharatDoost"}</MenuItem>
                <MenuItem value={3}>{"Farshad Harif Kargaran"}</MenuItem>
                <MenuItem value={4}>{"Nima Fazeli"}</MenuItem>
              </Select>
              <FormHelperText>{formik.touched.expertId && formik.errors.expertId}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid
            xs={8}
            textAlign={'center'}
            justifyItems={'center'}
            justifyContent={'center'}
          >
            <FormControl required fullWidth error={formik.touched.logLocation && Boolean(formik.errors.logLocation)}>
              <InputLabel id="log-location-type-label">Type</InputLabel>
              <Select
                inputProps={{ readOnly: !!!(currentDTStatus?.status === dtCurrentStatusENUM.idle || currentDTStatus?.status === dtCurrentStatusENUM.stopped) }}
                size="small"
                labelId="log-location-type-label"
                name='logLocation'
                value={formik.values.logLocation}
                label="Type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value={logLocationType.city}>{logLocationType.city}</MenuItem>
                <MenuItem value={logLocationType.road}>{logLocationType.road}</MenuItem>
                <MenuItem value={logLocationType.village}>{logLocationType.village}</MenuItem>
                <MenuItem value={logLocationType.test}>{logLocationType.test}</MenuItem>
              </Select>
              <FormHelperText>{formik.touched.logLocation && formik.errors.logLocation}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid
            xs={16}
            textAlign={'center'}
            justifyItems={'center'}
            justifyContent={'center'}
          >
            <TextField
              size="small"
              name="code"
              label="Code"
              value={formik.values.code}
              placeholder='Enter Code'
              fullWidth
              onChange={formik.handleChange}
              inputProps={{ readOnly: !!!(currentDTStatus?.status === dtCurrentStatusENUM.idle || currentDTStatus?.status === dtCurrentStatusENUM.stopped) }}
              required
              onBlur={formik.handleBlur}
              error={
                formik.touched.code && Boolean(formik.errors.code)
              }
              helperText={formik.touched.code && formik.errors.code}
            />
          </Grid>

          <Grid
            xs={8}
            textAlign={'center'}
            justifyItems={'center'}
            justifyContent={'center'}
          >
            <Box sx={{ position: 'relative', display: 'inline-block', p: 0, m: 0, width: 1, height: 1 }}>
              <ButtonGroup fullWidth sx={{ height: '100%' }}>
                {
                  !currentDTStatus &&
                  <Button disabled={loading} variant="outlined" color="secondary" fullWidth sx={{ height: '100%' }}>
                    <strong>{"WAIT..."}</strong>
                  </Button>
                }
                {
                  (currentDTStatus?.status === dtCurrentStatusENUM.idle || currentDTStatus?.status === dtCurrentStatusENUM.stopped) &&
                  <Button disabled={loading} variant="outlined" color="secondary" fullWidth sx={{ height: '100%' }} type='submit' onClick={(e) => handleSubmit(formik.values, formik, submitTypeENUM.init)}>
                    <strong>{submitTypeENUM.init}</strong>
                  </Button>
                }
                {
                  (currentDTStatus?.status === dtCurrentStatusENUM.inited) &&
                  <Button disabled={loading} variant="outlined" color="secondary" fullWidth sx={{ height: '100%' }} type='submit' onClick={(e) => handleSubmit(formik.values, formik, submitTypeENUM.start)}>
                    <strong>{submitTypeENUM.start}</strong>
                  </Button>
                }
                {
                  (currentDTStatus?.status === dtCurrentStatusENUM.inited) &&
                  <Button disabled={loading} variant="outlined" color="secondary" fullWidth sx={{ height: '100%' }} type='submit' onClick={(e) => handleSubmit(formik.values, formik, submitTypeENUM.stop)}>
                    <strong>{submitTypeENUM.stop}</strong>
                  </Button>
                }
                {
                  (currentDTStatus?.status === dtCurrentStatusENUM.started) &&
                  <Button disabled={loading} variant="outlined" color="secondary" fullWidth sx={{ height: '100%' }} type='submit' onClick={(e) => handleSubmit(formik.values, formik, submitTypeENUM.pause)}>
                    <strong>{submitTypeENUM.pause}</strong>
                  </Button>
                }
                {
                  (currentDTStatus?.status === dtCurrentStatusENUM.started) &&
                  <Button disabled={loading} variant="outlined" color="secondary" fullWidth sx={{ height: '100%' }} type='submit' onClick={(e) => handleSubmit(formik.values, formik, submitTypeENUM.stop)}>
                    <strong>{submitTypeENUM.stop}</strong>
                  </Button>
                }
                {
                  (currentDTStatus?.status === dtCurrentStatusENUM.paused) &&
                  <Button disabled={loading} variant="outlined" color="secondary" fullWidth sx={{ height: '100%' }} type='submit' onClick={(e) => handleSubmit(formik.values, formik, submitTypeENUM.resume)}>
                    <strong>{submitTypeENUM.resume}</strong>
                  </Button>
                }
                {
                  (currentDTStatus?.status === dtCurrentStatusENUM.paused) &&
                  <Button disabled={loading} variant="outlined" color="secondary" fullWidth sx={{ height: '100%' }} type='submit' onClick={(e) => handleSubmit(formik.values, formik, submitTypeENUM.stop)}>
                    <strong>{submitTypeENUM.stop}</strong>
                  </Button>
                }
              </ButtonGroup>
              {loading && <LinearProgress sx={{ position: 'absolute', top: 0, width: 1, borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} />}
              {loading && <LinearProgress variant='query' sx={{ position: 'absolute', bottom: 0, width: 1, borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} />}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
};

