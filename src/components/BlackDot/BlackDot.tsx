import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';



export const BlackDot: React.FC<Props> = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 12,
        height: 12,
        position: 'absolute',
        top: 0,
        left: 0,
        background: theme.palette.common.black,
        border: `2px solid ${theme.palette.grey[500]}`,
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  )
}