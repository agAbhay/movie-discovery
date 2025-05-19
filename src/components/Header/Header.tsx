import { Box, CircularProgress, ClickAwayListener, Stack, Typography } from "@mui/material";
import clsx from "clsx";
import { useMemo, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import SearchTextfield from "@/shared-components/inputs/TextField";
import SearchController from "../Search/SearchController";

interface IHeader {

}
const Header: React.FC<IHeader> = (props) => {

    const { } = props;


    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" className={'bg-gray-100 border-b-1 border-gray-300 w-full mb-8'} paddingX={2} paddingY={1}>
            <Stack direction="column" justifyContent="space-between" alignItems="baseline" >
                <Typography className="!font-bold !text-3xl text-blue-900">Movie Discovery</Typography>
                <Typography className="!text-sm text-blue-600">What Should I Watch Tonight</Typography>
            </Stack>

            <Stack className="flex items-center p-0 flex-grow justify-center">
                <SearchController />
            </Stack>

            <Box className="min-w-[200px]" /> 
        </Stack >
    )

}

export default Header;