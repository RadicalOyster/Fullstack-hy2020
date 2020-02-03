import React from 'react'

const FilterField = (props) => {
    return (
      <div>
      Find countries: <input
      value={props.filter}
      onChange={props.handleFilterChange}/>
      </div>
    )
  }

  export default FilterField