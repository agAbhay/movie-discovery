import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import MuiButton from './Button';
import { IButton } from '@/interfaces/IButtons';



interface IButtonsGroup {
    buttons: IButton[]
}

const ButtonsGroup: React.FC<IButtonsGroup> = (props) => {

    const [selectedButtonId, setSelectedButtonId] = React.useState<string>('');


    const { buttons } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': { m: 1 },
            }}
        >
            <ButtonGroup size="large" variant="outlined" aria-label="Large button group">
                {buttons.map((btn, index) => (
                    <MuiButton
                        key={`${btn.label} group button`}
                        onClick={() => {
                            btn?.onClick?.(btn.genreIds);
                            setSelectedButtonId(btn.label)
                        }}
                        label={btn.label}
                        buttonStyle={`whitespace-nowrap  ${selectedButtonId === btn.label ? "!bg-blue-900" : ''} `}

                    />
                ))}
            </ButtonGroup>
        </Box>
    );
}

export default ButtonsGroup
