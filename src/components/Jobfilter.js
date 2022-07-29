import React from "react";

export default function ProjectFilter({ filters, removeFilter }) {
    

    const handleClick = (newFilter) => {
        removeFilter(newFilter)
        //console.log(filters);
    }



  return (
    <div className='project-filter'>
        <nav>
            {filters.map((f) => (
                <div key={f}
                    className='filter'
                >
                    {f} 
                    <img onClick={() => handleClick(f)} className=" bg-primary inline-flex hover:bg-black cursor-pointer ml-auto" src="/close-white.svg" />
                </div>
                
            ))}
        </nav>
    </div>
  )
}