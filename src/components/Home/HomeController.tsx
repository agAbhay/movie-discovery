import React, { useEffect, useState } from 'react'
import HeaderController from '../Header/HeaderController';
import MoviesController from '../Movies/MoviesController';

const HomeController: React.FC = () => {



    return (
        <div>
            <HeaderController
            />

            <MoviesController/>

        </div>
    )
}

export default HomeController