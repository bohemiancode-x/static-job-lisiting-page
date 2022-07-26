import React from 'react'

export default function Jobcard({ data, addFilter }) {
    
    const handleClick = (newFilter) => {
        addFilter(newFilter)
    }

  return (
    <div>
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
                    <p onClick={() => handleClick(`${job.role}`)} className='info'>{job.role}</p>
                    <p onClick={() => handleClick(`${job.level}`)} className='info'>{job.level}</p>
                    {job.languages.map((l) => {
                        return <p onClick={() => handleClick(l.toString())} key={l} className='info' >{l}</p>
                    })}
                    {job.tools.map((t) => {
                        return <p onClick={() => handleClick(t.toString())} key={t} className='info' >{t}</p>
                    })}
                    
                </div>
            </li>
            })}
    </div>
  )
}
