"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import _ from 'lodash';
import { useResponsive } from '@/utils/responsive';



const textFieldClassName = 'text-sm [&>label]:text-sm [&>span]:text-sm !mt-0';

interface ISearchTextfieldProps {
    placeholder?: string
    variant?: undefined | "standard" | "filled" | "outlined"
    inputPropsClassName?: string
    className?: string
    debounce: number
    searchCallBack(searchKey: string): void
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    isLoading?: boolean
    onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined
    onKeyDown?(e: React.KeyboardEvent<HTMLDivElement>): void
    searchInputRef?: React.RefObject<HTMLInputElement>
    isPopupOpen?: boolean
    closeSearchMenu?(): void | undefined
    dataTestId?: string
    searchedKey?: string
    autoFocus?: boolean
}

const SearchTextfield: React.FC<ISearchTextfieldProps> = (props) => {

    const { placeholder, searchedKey, variant = 'outlined', isPopupOpen = false, closeSearchMenu,
        inputPropsClassName, className, debounce, searchCallBack, startIcon, endIcon, isLoading, onKeyDown, onFocus, searchInputRef, dataTestId = 'search.global',
        autoFocus
    } = props;

    const { isMobile } = useResponsive();

    const [isShrink, setIsShrink] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useState<string | undefined>(searchedKey);

    const searchCallBackFn = (searchKey: string | undefined) => searchCallBack(searchKey ?? "")

    const debounceCallback = useCallback(_.debounce(searchCallBackFn, debounce), [])


    const searchItem = (searchKey: string) => {

        setSearchKey(searchKey);
        debounceCallback(searchKey);
    }

    useEffect(() => {
        setSearchKey(searchedKey ?? "");
    }, [searchedKey])


    // it sets the shrink state to true to handle the mui outlined textbox
    const onFocusSearchBoxHandler = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        onFocus?.(event)
        setIsShrink(true);
    }

    // it sets the shrink state to false to handle the mui outlined textbox
    const onBlurSearchBoxHandler = (event: any) => {
        if (event.target.value?.length === 0)
            setIsShrink(false);
    }

    const closeSearchPopover = () => {
        setSearchKey('');
        setIsShrink(false);
    }

    useEffect(() => {
        if (searchInputRef?.current && autoFocus) {
            searchInputRef.current.focus();
        }
    }, [searchInputRef, autoFocus]);

    return (
        <>
            <StyledTextField
                fullWidth
                autoComplete='off'
                autoFocus={autoFocus}
                size={(isMobile) ? 'medium' : 'small'}
                className={`${className} ${textFieldClassName} ${(isShrink) ? '[&>label]:pl-5 [&>label]:pr-3' : '[&>label]:pl-7'} `}
                margin="dense"
                id="outlined-basic"
                data-testid={dataTestId}
                key="search box"
                name='text'
                inputRef={searchInputRef}
                variant={variant}
                InputLabelProps={{ shrink: isShrink, className: `${(isMobile) ? '-top-[7px]' : ''}` }}
                placeholder={placeholder}
                value={searchKey}
                onKeyDown={e => {
                    onKeyDown?.(e);
                    e.stopPropagation();
                }}
                onChange={(e) => searchItem(e.target.value)}
                onFocus={onFocusSearchBoxHandler}
                onBlur={onBlurSearchBoxHandler}
                InputProps={{
                    autoComplete: 'off',
                    name: 'text',
                    startAdornment: startIcon,
                    endAdornment: isLoading ?

                        <InputAdornment position="end">
                            <CircularProgress size={20} data-testid="search.input.loader" />
                        </InputAdornment>
                        :
                        (searchKey ? <div className='contents'
                            onClick={(e) => {
                                closeSearchPopover();
                                e.stopPropagation();
                            }}>
                            {endIcon}
                        </div> : null),

                    className: `${inputPropsClassName}  [&>input]:px-1 [&>input]:pb-[6px] [&>input]:pt-1 text-[14px]`,
                }}
            />
            {
                closeSearchMenu &&
                <div
                    className={`fixed w-full h-full md:!top-0 top-[63px] left-0 bg-gray-900 transition-color duration-200 flex !ml-0 ${isPopupOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        closeSearchMenu();
                    }}
                />
            }
        </>
    )
}

export default SearchTextfield;


const StyledTextField = styled(TextField)({
    "& .MuiInputLabel-root": {
        fontSize: '14px'
    }
});
