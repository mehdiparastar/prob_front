import Grid from '@mui/material/Unstable_Grid2';
import LMap from '../../../../components/OfflineMap/LMap';



export const Features: React.FC<Props> = (props) => {

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
        <LMap />
      </Grid>
    </Grid>
  )
};








