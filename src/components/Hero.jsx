import React from 'react'

function Hero() {
    return (
        <>


            <div className='bg-[#6390df] px-5 pt-20'>



                <h1 className='mt-10 md:text-[30px] text-[30px] text-center font-semibold md:font-medium text-white'>
                    Healthcare jobs & opportunities
                </h1>

                <h1 className='md:mt-0 mt-2 mb-4 md:text-[17px] text-[15px] font-sans text-white text-center'>
                    curated job openings for Physicians, Nurses, Doctors ...
                </h1>

                <div className='border mt-10 bg-white rounded-tl-lg rounded-tr-lg p-10 md:w-[70%] w-[90%] mx-auto'>
                    <div className="flex flex-wrap sm:flex-nowrap">
                        <div className="w-full sm:w-1/2">
                            <input type="text" id="base-input" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-tl-lg rounded-bl-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500" placeholder='Search job titles, keywords, skills etc' />
                        </div>

                        <div className="w-full sm:w-1/4">
                            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="border w-full text-black bg-white hover:bg-white font-medium text-sm px-5 py-2.5 text-center inline-flex items-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800" type="button">
                                Location
                                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 light:bg-gray-700">
                                <ul className="py-2 text-sm text-gray-700 light:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>



                        <div className="w-full sm:w-1/5">
                            <button type="button" className="w-full focus:outline-none text-center text-white bg-[#dc832d] hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 font-medium md:rounded-tr-lg md:rounded-br-lg text-sm px-5 py-2.5 mr-2 mb-2 light:focus:ring-yellow-900">Search Jobs</button>
                        </div>


                    </div>

                </div>



            </div>




        </>
    )
}

export default Hero