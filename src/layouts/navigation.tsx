import NotFoundIcon from '@mui/icons-material/BrowserNotSupported';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';

type navPage = {
  title: string;
  key: string;
  pages: {
    title: string;
    href: string;
    icon?: JSX.Element;
  }[];
};

export const navigationPages: navPage[] = [
  {
    title: 'public pages',
    key: 'public-pages',
    pages: [
      { title: 'Home', href: '/', icon: <HomeIcon sx={{ pr: 0.5 }} /> },
      { title: 'About', href: '/about', icon: <InfoIcon sx={{ pr: 0.5 }} /> },
      { title: 'NotFound', href: '/notfound', icon: <NotFoundIcon sx={{ pr: 0.5 }} /> },
      { title: 'Maintenance', href: '/maintenance', icon: <EngineeringIcon sx={{ pr: 0.5 }} /> },
      { title: 'MS Details', href: '/msdetails', icon: <PhoneIphoneRoundedIcon sx={{ pr: 0.5 }} /> },
    ],
  },
];
