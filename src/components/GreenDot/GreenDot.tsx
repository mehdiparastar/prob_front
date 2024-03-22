import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';



export const GreenDot: React.FC<Props> = (props) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: 12,
                height: 12,
                position: 'absolute',
                top: 0,
                left: 0,
                background: theme.palette.success.light,
                border: `2px solid ${theme.palette.success.dark}`,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        />
    )
}