import React from 'react';

export const LoaderChart = () => {
    return (
        <div className="loader-chart__wrapper">
               <div className="loader-chart">
                   <div className="loading">
                       <div className="loading-1"></div>
                       <div className="loading-2"></div>
                       <div className="loading-3"></div>
                       <div className="loading-4"></div>
                   </div>
               </div>
            <h6>
                Loading charts...
            </h6>
        </div>
    );
};

