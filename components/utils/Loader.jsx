import React from 'react';
import { Oval } from  'react-loader-spinner';


const Loader = () => {
  return (
    <>
        <div className='flex justify-center mt-60'>
            <Oval
                height={100}
                width={100}
                color="#ffff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#aaa"
                strokeWidth={2}
                strokeWidthSecondary={2}

            />
        </div>
        <div className='flex justify-center mt-4'>
            <h3 className='text-white font-semibold text-xl'>Loading questions...</h3>
        </div>
    </>
  )
}

export default Loader