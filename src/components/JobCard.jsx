import React from 'react'

function JobCard() {
    return (
        <>

            <div className="bg-white border p-5 md:mx-auto mx-5 md:w-[80%] rounded-lg md:flex items-center mb-7 hover:drop-shadow-xl shadow-blue-200 transition duration-400">
                <div className='md:w-1/6 md:mr-10'>
                    <img src="https://hospitalcareers.com/files/pictures/emp_logo_2858.jpg" alt="" className='w-40 mb-4 md:mb-0' />
                </div>

                <div>
                    <h2 className='text-blue-900 font-medium md:text-[20px] text-sm'>
                        Front Office Admin Support - Oncology, Bangalore, India
                    </h2>

                    <div className="mt-1 flex items-center text-gray-700">
                        <div className="flex items-center w-1/2">
                            <img src="src/assets/job.svg" alt="Company Logo" className='h-4' />
                            <p className='ml-2 font-normal text-[12px] md:text-[15px]'>UCLA Health</p>
                        </div>
                        <div className="flex items-center w-1/2">
                            <img src="src/assets/location.svg" alt="Company Logo" className='h-4' />
                            <p className='ml-2 font-normal text-[12px] md:text-[15px]'>Bangalore, Karnataka, India</p>
                        </div>
                    </div>

                    <h2 className='text-gray-500 mt-4 text-[12px] md:text-[15px]'>
                        Description In this role, you will provide general and administrative support to the staff, physicians and patients of the Oncology Clinic. Schedule new consultations, coordinate and
                    </h2>
                </div>
            </div>
        </>
    )
}

export default JobCard