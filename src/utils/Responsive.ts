import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState, useRef, EffectCallback } from 'react';

export const tabClasses = { root: "normal-case hover:text-primary-light", selected: "text-primary-light" }

export const useResponsive = () => {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return { isDesktop, isMobile: !isDesktop }
};

