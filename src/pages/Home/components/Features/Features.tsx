import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Item from '../../../../components/Item/Item';


export const Features: React.FC<Props> = (props) => {
  const theme = useTheme();

  return (
    <Grid
      container
      rowSpacing={1.5}
      columnSpacing={1}
      columns={24}
      textAlign={'center'}
    >
      <Grid
        xs={24}
        textAlign={'center'}
        justifyItems={'center'}
        justifyContent={'center'}
      >
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={theme.palette.text.primary}
          align={'center'}
        >
          2G Lock IDLE
        </Typography>
      </Grid>
      <Grid
        xs={24}
        textAlign={'center'}
        justifyItems={'center'}
        justifyContent={'center'}
      >
        <Item>
          map
        </Item>
      </Grid>
    </Grid>
  )
};
