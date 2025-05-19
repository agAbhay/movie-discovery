import React, { useMemo } from 'react'
import { Button, CircularProgress, Stack, Typography } from "@mui/material";

interface IMuiButton {
    label?: string
    onClick?: (() => void)  | undefined
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    iconClassName?: string
    buttonStyle?: string
    isOutlineButton?: boolean
    key?: string
    dataTestId?: string
    disabled?: boolean
    isProcessing?: boolean
}

export const muiButtonStyle = "font-bold !text-[11px] w-full shadow-none hover:!shadow-none  !bg-blue-600 hover:!bg-blue-900"

const MuiButton: React.FC<IMuiButton> = (props) => {

    const { label, iconClassName, buttonStyle, isOutlineButton = false, key, dataTestId, isProcessing = false } = props;

    const labelStyle = useMemo(() => {
        return `${(!isOutlineButton ? 'bg-blue-600' : '!text-blue-600')}`
    }, [isOutlineButton])


    return (
        <Button
            {...props}
            data-testid={dataTestId}
            type="submit"
            key={key}
            variant={isOutlineButton ? 'outlined' : "contained"}
            className={`text-white ${labelStyle} leading-loose ${muiButtonStyle} ${iconClassName} ${buttonStyle}`}

        >
            {
                isProcessing ?
                    <Stack direction="row" spacing={1} className='flex items-center gap-1'>
                        <CircularProgress size={16} />
                        <Typography className='text-gray-500 text-[11px]'>{label}</Typography>
                    </Stack>
                    : label
            }

        </Button>
    )
}

export default MuiButton