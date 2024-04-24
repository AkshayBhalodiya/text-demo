import Link from 'next/link';
import React from 'react';

const Table: React.FC = () => {
  // Array of numbers from 1 to 12
  const boxNumbers = Array.from(Array(12).keys());

  return (
    <div className="container-fluid p-0">
      <div className="row p-0 main-box">
        {boxNumbers.map((number, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-sm-12 p-0">
            <div className="b-box">
                <div className='tooltips'>
                    <p className='mb-0'>Tooltip {number + 1}</p>
                </div>
              <p className='mb-0 text-center inner-box'>Header {number + 1}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='row ml-50'>
        <Link className='btn btn-back w-25 mb-4' href="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default Table;
