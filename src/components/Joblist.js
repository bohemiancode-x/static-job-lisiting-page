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
        let {id, company, logo, featured, position, postedAt, contract, location } = job;
        let newJob = job.new;
        let roleAndLevel = [];
        roleAndLevel.push(job.role);
        roleAndLevel.push(job.level);
        let filters = [];
        filters.push(...roleAndLevel, ...job.languages, ...job.tools);
        return {id, company, logo, featured, position, postedAt, contract, location, newJob, filters};
    })

    useEffect(() => {
         localStorage.setItem('jobs', JSON.stringify(jobsData))
    }, [data])
    
    //console.log(JSON.parse(localStorage.getItem('jobs')));
    
    const getJobsByFilter = (filters) => {
        let Json = JSON.parse(localStorage.getItem('jobs'))
        setJobs(Json)
        let filteredJobs = jobs.filter((job) => filters.every((e) => job.filters.includes(e)));
        return filteredJobs
    }
   
    
    const addFilter = (newFilter) => {
        if(newFilter && !filters.includes(newFilter)) {
            setFilters(prevFilters => [...prevFilters, newFilter])
        }
        setFilterActive(true)
        //console.log(filters);
        setFilteredJobs(getJobsByFilter(filters))
        
       
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
        setFilteredJobs(getJobsByFilter(filters))
        if(filteredArray.length == 0) {
            setFilterActive(false)
        }  
       
    }
    
   

  return (
    <div>
        <ul className='joblist'>
            <li className={filterActive ? 'card pl-4' : 'hidden'}><Jobfilter removeFilter={removeFilter} filters={filters} /><button onClick={clearFilter} className='ml-auto px-8 text-primary hover:underline hover:font-bold'>clear</button></li>
            {data && <Jobcard data={filterActive ? data : data } addFilter={addFilter} filters={filters} />}

        </ul>
    </div>
  )
}
