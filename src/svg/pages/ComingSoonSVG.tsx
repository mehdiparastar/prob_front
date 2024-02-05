import { SvgIconProps } from '@mui/material';
import { ReactComponent as COMINGSOONSVG } from './comingSoon.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';


export const ComingSoonSVG: React.FC<SvgIconProps> = (props) => {
  
  const theme = useTheme();
  return (
    <COMINGSOONSVG
      className={css`
        #mainprimary {
          fill: ${theme.palette.primary.main};
        }

        #darkprimary path {
          fill: ${theme.palette.primary.dark};
        }

        #mainsecondary path {
          fill: ${theme.palette.secondary.main};
        }
      `}
      {...props}
    />
  );
};
