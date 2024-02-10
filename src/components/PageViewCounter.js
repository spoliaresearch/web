import React, { useState, useEffect } from 'react';

// Define fetchPageViewCount function
const fetchPageViewCount = async () => {
  const url = 'https://api.counter.plantree.me/pv/get';
  const params = new URLSearchParams({ namespace: 'spolialab', key: 'index' });

  try {
    const response = await fetch(`${url}?${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in GET request:", error);
    return null; // or handle the error as needed
  }
};

// Define your component
const PageViewCounter = () => {
  const [pageViewCount, setPageViewCount] = useState(null);

  useEffect(() => {
    const getPageViewCount = async () => {
      const data = await fetchPageViewCount();
      console.log(data)
      if (data) {
        setPageViewCount(data.data[0].value); // Assuming the response has a `count` property
      }
    };

    getPageViewCount();
  }, []);

  return (
    <div>
      {pageViewCount !== null ? (
        <p>{pageViewCount}th view</p>
      ) : (
        <p>Loading page views...</p>
      )}
    </div>
  );
};

export default PageViewCounter;
