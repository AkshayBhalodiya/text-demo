import React from 'react';
import styles from '../styles/center-div.module.scss';
import Link from 'next/link';

const CenterDiv: React.FC = () => {
  return (
    <>  <div className="containers">
      <div className="centeredText">
        Center This
        <Link href="/" className='btn btn-back w-100 d-block'>Back to Home</Link>
      </div>
    </div>
    </>
  );
}

export default CenterDiv;
