import React, {useState} from 'react'
import { useFetch } from '../hooks/useFetch'
import Jobfilter from './Jobfilter'

export default function Joblist() {
    const {data} = useFetch('/data.json')
    const [filters, setFilters] = useState([])
    const [filterActive, setFilterActive] = useState(false)

    const addFilter = (newFilter) => {
        if(filters.indexOf(newFilter) === -1) {
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

        if(filteredArray.length == 0) {
            setFilterActive(false)
        } 
       
    }

    // console.log(filters);

  return (
    <div>
        <ul className='joblist'>
            <li className={filterActive ? 'card pl-4' : 'hidden'}><Jobfilter removeFilter={removeFilter} filters={filters} /><button onClick={clearFilter} className='ml-auto px-8 text-primary hover:underline hover:font-bold'>clear</button></li>
            {data && data.map((job) => {
                return <li key={job.id} className='card'>
                <span className={job.featured ? 'bg-primary absolute sm:w-1 w-2 rounded-l-lg h-full top-0 left-0' : 'hidden'}></span>
                <div className='absolute -top-7 left-4 sm:static sm:ml-6'><img className='sm:h-20 sm:w-20 w-14 ' src={job.logo} alt="photosnap" /></div>
                <div className='ml-5 pt-5'>
                    <div className='flex gap-3 text-sm'>
                        <h3 className='text-primary font-bold'>{job.company}</h3>
                        <p className={job.new ? 'bg-primary text-white rounded-xl px-2 font-bold' : 'hidden'}>NEW!</p>
                        <p className={job.featured ? 'bg-black text-white rounded-xl px-2 font-bold' : 'hidden'}>FEATURED</p>
                    </div>
                    <h2 className='font-bold sm:text-lg sm:mt-1 mt-2 hover:text-primary cursor-pointer'>{job.position}</h2>
                    <div className='flex gap-4 opacity-50 sm:text-xs text-sm font-bold sm:mt-1 sm:mb-4 mt-2'>
                        <p>{job.postedAt}</p>
                        <img className='w-2 h-2 my-auto opacity-50' src="./dot.svg" alt="" />
                        <p>{job.contract}</p>
                        <img className='w-2 h-2 my-auto opacity-50' src="./dot.svg" alt="" />
                        <p>{job.location}</p>
                    </div>
                </div>
                <span className='sm:hidden block w-9/10 h-0.5 mt-5 opacity-50 bg-slate-600'></span>
                <div className='sm:flex flex-row gap-2 sm:ml-auto sm:px-8 py-4'>
                    <p onClick={() => addFilter(`${job.role}`)} className='info'>{job.role}</p>
                    <p onClick={() => addFilter(`${job.level}`)} className='info'>{job.level}</p>
                    {job.languages.map((l) => {
                        return <p onClick={() => addFilter(JSON.stringify(l))} key={l} className='info' >{l}</p>
                    })}
                    {job.tools.map((t) => {
                        return <p onClick={() => addFilter(JSON.stringify(t))} key={t} className='info' >{t}</p>
                    })}
                    
                </div>
            </li>
            })}

            {/* hardcoded to get a template */}
            {/* <li className='sm:flex sm:p-0 p-4 bg-white rounded w-11/12 drop-shadow-md my-10 sm:my-5 mx-auto items-center relative'>
                <span className='bg-primary absolute sm:w-1 w-2 rounded-l-lg h-full top-0 left-0'></span>
                <div className='absolute -top-7 left-4 sm:static sm:ml-6'><img className='sm:h-20 sm:w-20 w-14 ' src="./images/photosnap.svg" alt="photosnap" /></div>
                <div className='ml-5 pt-5'>
                    <div className='flex gap-3 text-sm'>
                        <h3 className='text-primary font-bold'>Photosnap</h3>
                        <p className='bg-primary text-white rounded-xl px-2 font-bold'>NEW!</p>
                        <p className='bg-black text-white rounded-xl px-2 font-bold'>FEATURED</p>
                    </div>
                    <h2 className='font-bold sm:text-lg sm:mt-1 mt-2 '>Senior Frontend developer</h2>
                    <div className='flex gap-8 opacity-50 sm:text-xs text-sm font-bold sm:mt-1 sm:mb-4 mt-2'>
                        <p>1d ago</p>
                        <p>Full Time</p>
                        <p>USA only</p>
                    </div>
                </div>
                <span className='sm:hidden block w-9/10 h-0.5 mt-5 opacity-50 bg-slate-600'></span>
                <div className='sm:flex flex-row gap-2 sm:ml-auto sm:px-8 py-4'>
                    <p className='info'>Frontend</p>
                    <p className='info'>Senior</p>
                    <p className='info'>HTML</p>
                    <p className='info'>CSS</p>
                    <p className='info'>Javascript</p>
                </div>
            </li> */}
        </ul>
    </div>
  )
}
