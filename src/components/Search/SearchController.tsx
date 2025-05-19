import { CircularProgress, ClickAwayListener, Stack, Typography } from "@mui/material";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useResponsive } from "@/utils/responsive";
import SearchTextfield from "@/shared-components/inputs/TextField";
import { Close } from "@mui/icons-material";
import SearchMovie from "./SearchMovie";
import * as  tmdbService from '@/services/tmdb/tmdb-services';
import { IMovie } from "@/interfaces/IMovie";
import { IArtist } from "@/interfaces/IArtist";



const SearchController = () => {



    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchedKey, setSearchedKey] = useState<string>('');
    const [searchedMovies, setSearchedMovies] = useState<IMovie[]>([] as IMovie[]);
    const [searchedMoviesByPerson, setSearchedMoviesByPerson] = useState<IArtist[]>([] as IArtist[]);

    const [isSearching, setIsSearching] = useState<boolean>(false);

    const { isMobile } = useResponsive();



    const searchInputRef = useRef<HTMLInputElement>(null);


    const closeSearchPopover = () => {
        setAnchorEl(null);
        if (searchInputRef.current) {
            searchInputRef.current?.blur();

        };
    }

    let isPopupOpen = useMemo(() => {
        return Boolean(anchorEl);;
    }, [anchorEl])



    const openSearchPopover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onChangeTextBoxHandler = (searchKey: string) => {
        setSearchedKey(searchKey);

    }

    useEffect(() => {
        getSearchedData();
    }, [searchedKey])


    const getSearchedData = async () => {
        setIsSearching(true);
        const data = await tmdbService.searchMovieByActorOrTitle(searchedKey.split(" "));

        const searchedMovies = data.data?.results?.filter((item: IMovie | IArtist) => item.media_type === 'movie');
        const searchedMoviesByPerson = data.data?.results?.filter((item: IMovie | IArtist) => item.media_type === 'person');

        setSearchedMovies(searchedMovies);
        setSearchedMoviesByPerson(searchedMoviesByPerson);
        setIsSearching(false);
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
                    { 'w-full': ((isMobile)), 'w-[300px]': (!isPopupOpen), 'md:!w-[830px] w-full': (isPopupOpen) })}>

                    <ClickAwayListener
                        onClickAway={closeSearchPopover}
                        mouseEvent="onMouseDown"
                        touchEvent="onTouchStart"
                    >
                        <div
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

                                isPopupOpen={isPopupOpen}
                                closeSearchMenu={closeSearchMenu}
                                placeholder={"Search movies"}
                                inputPropsClassName={`w-full border-[0px] [&>fieldset]:!border-blue-600
                                    ${isPopupOpen ? 'bg-white z-[2560]' : ''} transition-width transition-slowest ease`}
                                searchCallBack={onChangeTextBoxHandler}
                                debounce={500}
                                searchedKey={searchedKey}
                            />

                            <div className={`md:w-[830px] w-full ${(isMobile) ? 'absolute' : 'fixed'} mt-1 z-[2560] `}>
                                {
                                    (searchedKey && isPopupOpen) &&
                                    <SearchMovie
                                        closeSearchMenu={closeSearchMenu}
                                        closeSearchPopover={closeSearchPopover}
                                        isLoading={isSearching}
                                        searchedMovies={searchedMovies}
                                        searchedMoviesByPerson={searchedMoviesByPerson}
                                        searchInputRef={searchInputRef}
                                        setSearchedKey={setSearchedKey}

                                    />
                                }
                            </div>

                        </div>

                    </ClickAwayListener>
                </div>

            </div>
        </Stack>
    )
}

export default SearchController