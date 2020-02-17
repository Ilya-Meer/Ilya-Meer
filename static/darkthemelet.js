(function() {
  const darkColour = '#121212';
  const lightColour = '#e0e0e0';

  function changeTextColour() {
    const elTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'span'];
    const textEls = elTypes.map(type => document.querySelectorAll(type));

    function applyStyle(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].style) {
          arr[i].style.color = lightColour;
        }
      }
    }

    for (let i = 0; i < textEls.length; i++) {
      if (textEls[i] && textEls[i].length) {
        applyStyle(textEls[i]);
      }
    }
  }

  function changeBackgroundColour() {
    const backgroundEls = [
      document.body,
      ...document.querySelectorAll('body *'),
    ];

    for (let i = 0; i < backgroundEls.length; i++) {
      const node = backgroundEls[i];
      if (
        node.style &&
        node.clientWidth &&
        node.clientWidth >= window.innerWidth * 0.85
      ) {
        node.style.background = darkColour;
      }
    }
  }

  function init() {
    changeTextColour();
    changeBackgroundColour();
  }

  init();
})();