import React from 'react'

const FilterField = (props) => {
    return (
      <div>
      filter shown by: <input
      value={props.filter}
      onChange={props.handleFilterChange}/>
      </div>
    )
  }

  export default FilterField