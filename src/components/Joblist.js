import React, {useEffect, useState} from 'react'
import { useFetch } from '../hooks/useFetch'
import Jobcard from './Jobcard'
import Jobfilter from './Jobfilter'

export default function Joblist() {
    const {data, isPending} = useFetch('/data.json')
    const [jobs, setJobs] = useState([])
    const [filters, setFilters] = useState([])
    const [filterActive, setFilterActive] = useState(false)
    const [filteredJobs, setFilteredJobs] = useState([])


    const jobsData = data && data.map((job) => {
        let {id, company, role, level, languages, tools, logo, featured, position, postedAt, contract, location } = job;
        let newJob = job.new;
        let roleAndLevel = [];
        roleAndLevel.push(job.role);
        roleAndLevel.push(job.level);
        let filters = [];
        filters.push(...roleAndLevel, ...job.languages, ...job.tools);
        return {id, company, newJob, role, level, languages, tools, logo, featured, position, postedAt, contract, location, filters};
    })

    useEffect(() => {
         localStorage.setItem('jobs', JSON.stringify(jobsData))
         let Json = JSON.parse(localStorage.getItem('jobs'))
         setJobs(Json)
    }, [data])
    
   

    useEffect(() => {
        let filtered = jobs.filter((job) => filters.every((e) => job.filters.includes(e)));
        setFilteredJobs(filtered)
    },[filters])
    //console.log(filteredJobs);
    
   
    
    const addFilter = (newFilter) => {
        if(newFilter && !filters.includes(newFilter)) {
            setFilters(prevFilters => [...prevFilters, newFilter])
        }
        setFilterActive(true)
        
    }
    const clearFilter = () => {
        setFilters([])
        setFilterActive(false)
    }
    const removeFilter = (filter) => {
        let filteredArray = filters.filter(e => {
            return e !== filter
        })
        setFilters(filteredArray);
        //console.log(filters);
        if(filteredArray.length == 0) {
            setFilterActive(false)
        }
      
    }
    
   

  return (
    <div>
        <ul className='joblist'>
            <li className={filterActive ? 'card pl-4 hover:scale-100' : 'hidden'}><Jobfilter removeFilter={removeFilter} filters={filters} /><button onClick={clearFilter} className='ml-auto px-8 text-primary hover:underline hover:font-bold'>clear</button></li>
            {isPending && <p className='w-screen h-screen text-center text-lg mt-52 font-bold'>Loading...</p>}
            {data && <Jobcard data={filterActive ? filteredJobs : data } addFilter={addFilter} filters={filters} />}

        </ul>
    </div>
  )
}
