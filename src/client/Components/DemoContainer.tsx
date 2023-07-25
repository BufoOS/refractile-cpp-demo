import React from 'react';
import FibJS from './FibJS';
import { useState, useEffect } from 'react';

const DemoContainer = (props: any): JSX.Element => {
  return (
    <div className="container mx-auto py-20 overflow-auto">
      <FibJS></FibJS>
    </div>
  );
};

export default DemoContainer;
