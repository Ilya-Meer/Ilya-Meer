import React, { useEffect } from 'react';

const useBodyToggle = colours => {
  useEffect(() => {
    document.querySelector('body').style.backgroundColor =
      colours.pageBackground;
  }, [colours]);
};

export default useBodyToggle;
