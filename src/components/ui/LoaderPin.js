import React from 'react';



export const LoaderPin = () => {
    return (
        <div className="loader-pin__wrapper">
               <div className="loader-pin">
                   <div className='pin'></div>
                   <div className='pulse'></div>
               </div>
            <h6>
                Loading paths...
            </h6>
        </div>
    );
};

