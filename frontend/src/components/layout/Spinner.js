import React, { Fragment } from 'react';
import "../../sass/utils/_spinner.scss"
const Spinner = () => (
    <Fragment>
        <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    </Fragment>
);

export default Spinner;
