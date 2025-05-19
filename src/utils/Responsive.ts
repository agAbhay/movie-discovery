import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export const useResponsive = () => {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return { isDesktop, isMobile: !isDesktop }
};

