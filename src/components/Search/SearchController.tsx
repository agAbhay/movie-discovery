import { CircularProgress, ClickAwayListener, Stack, Typography } from "@mui/material";
import clsx from "clsx";
import { useMemo, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useResponsive } from "@/utils/Responsive";
import SearchTextfield from "@/shared-components/inputs/TextField";
import { Close } from "@mui/icons-material";

const SearchController = () => {



    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [containerAnchorEl, setContainerAnchorEl] = useState<null | HTMLElement>(null);
    const [focusedElementIndex, setFocusedElementIndex] = useState<number | null>(null);
    const [showMoreTabIndex, setShowMoreTabIndex] = useState<number | undefined>(undefined);
    const [selectedSection, setSelectedSection] = useState<string>("");
    const [searchedKey, setSearchedKey] = useState<string>('');


    const { isMobile } = useResponsive();



    const searchInputRef = useRef<HTMLInputElement>(null);




    const closeSearchPopover = () => {
        setAnchorEl(null);
        setContainerAnchorEl(null);
        if (searchInputRef.current) {
            // searchInputRef.current.value = '';
            setFocusedElementIndex(null);
            searchInputRef.current?.blur();

        };
    }

    let isPopupOpen = useMemo(() => {
        return Boolean(anchorEl);;
    }, [anchorEl])



    const openSearchPopover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setContainerAnchorEl(event.currentTarget);
        setFocusedElementIndex(null);
        setShowMoreTabIndex(undefined);
        setSelectedSection('company');
    };

    const onChangeTextBoxHandler = (searchKey: string) => {
        setSearchedKey(searchKey);
    }

    const closeSearchMenu = () => {
        if (searchInputRef?.current) {
            searchInputRef.current.value = '';
            searchInputRef?.current?.blur();
        }
        closeSearchPopover();
    }


    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" className={''} >
            <div className={clsx(`md:!flex block flex-shrink md:relative md:!bottom-0 items-center justify-center`)}>

                <div className={clsx(`z-[370] transition-width md:flex ${isPopupOpen ? 'flex' : 'hidden'}`,
                    { 'w-full': ((isMobile)), 'w-[300px]': (!isPopupOpen), 'md:!w-[500px] w-full': (isPopupOpen) })}>

                    <ClickAwayListener
                        onClickAway={closeSearchPopover}
                        mouseEvent="onMouseDown"
                        touchEvent="onTouchStart"
                    >
                        <div
                            id='openSearchPopOverId'
                            onClick={(event) => openSearchPopover(event)}
                            className="w-full"
                        >

                            <SearchTextfield
                                className={`flex !mb-0 bg-white border-2  !border-blue-600`}
                                variant={"outlined"}
                                startIcon={<SearchIcon className={`text-blue-600 text-xs mr-1`} />}
                                endIcon=
                                {
                                    isPopupOpen ? <Close
                                        className={`text-gray-800 text-base ml-1 ${(isPopupOpen) ? 'hover:text-red-600 hover:cursor-pointer' : 'text-sm'}`}
                                        onClick={(e) => {
                                            closeSearchMenu();
                                            setSearchedKey('');
                                        }}
                                    /> : null
                                }

                                // onKeyDown={onTextFieldKeyDownHandler}
                                // searchInputRef={searchInputRef}
                                isPopupOpen={isPopupOpen}
                                closeSearchMenu={closeSearchMenu}
                                // selectedValue={(fromOpportunity || toOpportunity) ? (fromOpportunity?.title ?? toOpportunity?.title) : ''}
                                placeholder={"Search movies"}
                                inputPropsClassName={`w-full border-[0px] [&>fieldset]:!border-blue-600
                                    ${isPopupOpen ? 'bg-white z-[2560]' : ''} transition-width transition-slowest ease`}
                                searchCallBack={onChangeTextBoxHandler}
                                debounce={500}
                                isGlobalSearch={true}
                                // isSearchDropdown={isSearchDropdown}
                                searchedKey={searchedKey}
                            />

                        </div>
                    </ClickAwayListener>
                </div>

            </div>
        </Stack>
    )
}

export default SearchController