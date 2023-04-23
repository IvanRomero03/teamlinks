import React from 'react';
import Layout from "y/components/layout/layout";
import {data} from "y/components/candidate/data/application_data.js";

const orders = () => {
  return (
    <>
      <Layout
              Items={[
                  { title: "Home", section: "candidate" },
                  { title: "My User", section: "candidate/user" },
                  { title: "Applications", section: "candidate/applications" },
                  { title: "Opportunities", section: "candidate/opportunities" },
              ]}
          >

        <div className='flex justify-between px-4 pt-4'>
          <h2>Applications</h2>
          <h2>Welcome Back, Clint</h2>
        </div>
        <div className='p-10 mt-20'>
          <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
            <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
              <span>Name</span>
              <span className='sm:text-left text-right'>Reviewed By:</span>
              <span className='hidden md:grid'>Applied</span>
              <span className='hidden sm:grid'>Status</span>
            </div>
            <ul>
              {data.map((application, id) => (
                <li
                  key={id}
                  className='bg-gray-100 hover:bg-gray-200 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'
                >
                  <div className='flex'>
                  <div className='bg-[#47d7ac] rounded-lg p-3'>
                      <img src={application.icon} alt="icon" className="h-6 w-6" />
                  </div>
                    <div className='pl-4'>
                      <p className='text-gray-800 text-sm'>{application.name}</p>
                    </div>
                  </div>
                  <p className='hidden md:flex'>Under Construction</p>
                  <p className='hidden md:flex'>{application.date}</p>
                  <p className='text-black sm:text-left text-right'>
                    <span
                      className={(application.status === 'Not Selected' ? 'p-1 rounded-lg bg-red-400 w-fit' : 
                      application.status === 'Selected' ? 'p-1 rounded-lg bg-green-400 w-fit' :
                      application.status === 'Under Consideration' ? 'p-1 rounded-lg bg-yellow-400 w-fit' : 'invisible h-0')}
                    >
                      {application.status}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default orders;