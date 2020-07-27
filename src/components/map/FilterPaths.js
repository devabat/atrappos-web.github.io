import React from 'react';
import {objectiveTypes, subjectiveTypes} from "../../lib/constants";
import FilterRadioSelection from "../ui/FilterSelection";

export const FilterPaths = (props) => {
    const {active, applyFilters, filterObjective, filterSubjective, category} = props;
    return (
      <div className={"filter-paths" + (!active ? " disabled" : "")}>
          <span className="path-actions--caption">According to the following combined choices:</span><br/>
          <label className="path-actions--label">Walkability evaluation</label>
          <FilterRadioSelection list={objectiveTypes}
                                type={'objective'}
                                applyFilters={applyFilters}
                                filterObjective={filterObjective}
                                filterSubjective={filterSubjective}
                                category={category}
          />
          <label className="path-actions--label">Landscape evaluation</label>
          <FilterRadioSelection list={subjectiveTypes}
                                type={'subjective'}
                                applyFilters={applyFilters}
                                filterObjective={filterObjective}
                                filterSubjective={filterSubjective}
                                category={category}
          />

      </div>
    );
};