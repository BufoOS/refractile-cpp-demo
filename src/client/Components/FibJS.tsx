import React, { useState, useEffect } from 'react';
import { BenchmarkType, FibJSProps, FibResult } from '../../types';

const FibJS = (props: FibJSProps): JSX.Element => {
  const [fibFetched, setFibFetched] = useState<boolean>(false);
  const [fibCFetched, setFibCFetched] = useState<boolean>(false);
  const [fibGoFetched, setFibGoFetched] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [fibCIsLoading, setFibCIsLoading] = useState<boolean>(false);
  const [fibGoIsLoading, setFibGoIsLoading] = useState<boolean>(false);
  const [fibInput, setFibInput] = useState<number>(41);
  const [fibResult, setFibResult] = useState<number>(0);
  const [fibTime, setFibTime] = useState<number>(0);
  const [fibCTime, setFibCTime] = useState<number>(0);
  const [fibGoTime, setFibGoTime] = useState<number>(0);

  const handleClick = async (route: string) => {
    if (isNaN(fibInput)) return;
    if (route === 'fib-js'){
      setIsLoading(true);
      setFibFetched(false);
    } else if (route === 'fib-c') {
      setFibCIsLoading(true);
      setFibCFetched(false);
    } else if (route === 'fib-go') {
      setFibGoIsLoading(true);
      setFibGoFetched(false);
    }

    const start: number = Date.now();
    try {
      const response = await fetch(`/api/${route}/${fibInput}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFibResult(data.result);
        const timeTaken: number = Date.now() - start;
        if (route === 'fib-js') {
          setFibTime(timeTaken);
          setIsLoading(false);
          setFibFetched(true);
        } else if (route === 'fib-c') {
          setFibCTime(timeTaken);
          setFibCIsLoading(false);
          setFibCFetched(true);
        } else if (route === 'fib-go') {
          setFibGoTime(timeTaken);
          setFibGoIsLoading(false);
          setFibGoFetched(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex-col gap-3">
      <h3>
        Click the button to calculate a big Fibonacci sequence in JavaScript, C++, and Go
      </h3>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="50"
          value={fibInput}
          onChange={(e) => setFibInput(Number(e.target.value))}
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary" onClick={() => {
          handleClick('fib-c');
          handleClick('fib-js');
        }}>
          Run Fibonacci
        </button>
      </div>
      <br/>
      <h2><strong>JavaScript:</strong></h2>

      <div className="py-4">
        {isloading && (
          <>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2 bg-primary rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2.5 bg-primary rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}

        {fibFetched && (
          <>
            <p>{`The result of JS Fibonacci is: ${fibResult}`}</p>
            <p>The time it took is: <strong>{fibTime / 1000}</strong> seconds</p>
          </>
        )}
      </div>

      <h2><strong>C++:</strong></h2>

      <div className="py-4">
        {fibCIsLoading && (
          <>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2 bg-primary rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2.5 bg-primary rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}

        {fibCFetched && (
          <>
            <p>{`The result of C++ Fibonacci is: ${fibResult}`}</p>
            <p>The time it took is: <strong>{fibCTime / 1000}</strong> seconds</p>
          </>
        )}
      </div>

      <h2><strong>Go:</strong></h2>

      <div className="py-4">
        {fibGoIsLoading && (
          <>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2 bg-primary rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2.5 bg-primary rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}

        {fibGoFetched && (
          <>
            <p>{`The result of Go Fibonacci is: ${fibResult}`}</p>
            <p>The time it took is: <strong>{fibGoTime / 1000}</strong> seconds</p>
          </>
        )}
      </div>
      <h2><strong>Comparison:</strong></h2>

      <div className="py-4">
      {fibCIsLoading && isloading && fibGoIsLoading && (
          <>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2 bg-primary rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2.5 bg-primary rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}

        {fibCTime < fibTime && fibFetched && fibCFetched &&  (
          <>
            <p>Fibonacci in C++ is faster by <strong>{(100 - ((fibCTime / fibTime) * 100)).toFixed(2)}%</strong></p>
          </>
        )}
      </div>

      <div className="py-4">
      {isloading && (
          <>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2 bg-primary rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2.5 bg-primary rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}

        {fibTime < fibCTime && fibFetched && fibCFetched && (
          <>
            <p>Fibonacci in JS is faster than C++ by <strong>{(100 - ((fibTime / fibCTime) * 100)).toFixed(2)}%</strong></p>
          </>
        )}
      </div>

      <div className="py-4">
      {isloading && (
          <>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2 bg-primary rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2.5 bg-primary rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}

        {fibTime < fibGoTime && fibFetched && fibGoFetched && (
          <>
            <p>Fibonacci in JS is faster than Go by <strong>{(100 - ((fibTime / fibGoTime) * 100)).toFixed(2)}%</strong></p>
          </>
        )}
      </div>

      <div className="py-4">
      {isloading && (
          <>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2 bg-primary rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2.5 bg-primary rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}

        {fibTime > fibGoTime && fibFetched && fibGoFetched && (
          <>
            <p>Fibonacci in Go is faster by <strong>{(100 - ((fibGoTime / fibTime) * 100)).toFixed(2)}%</strong></p>
          </>
        )}
      </div>

    </div>


  );
};

export default FibJS;

