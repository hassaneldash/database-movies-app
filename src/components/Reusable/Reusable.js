import axios from 'axios';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `${process.env.REACT_APP_AUTHORIZATION_KEY}`,
  },
};

export const fetchAndSetData = async (url, setDataFunction, array) => {
  try {
    const response = await axios.get(url, options);

    if (response.status !== 200) {
      throw new Error('Error fetching data for this page!');
    }

    const data = response.data;

    if (array) {
      setDataFunction(data[array]);
    } else {
      setDataFunction(data);
    }
  } catch (err) {
    console.error('Error fetching data:', err);
  }
};

export const fetchAndSetDataForPagination = async (
  url,
  setDataFunction,
  setTotalPages,
  navigateFunction
) => {
  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      navigateFunction('/pageNotFound');
      throw new Error('Error fetching data for this page!');
    }

    const data = response.data;

    if (data && data.results.length === 0) {
      navigateFunction('/pageNotFound');
    }

    setDataFunction(data.results);

    if (typeof setTotalPages === 'function') {
      setTotalPages(data.total_pages);
    }
  } catch (err) {
    console.error('Error fetching data:', err);
  }
};

export const dynamicDocTitle = (title) => {
  document.title = title;
  window.scrollTo(0, 0);
};

export const renderTrimmedText = (text, maxTextLength, isTextExpanded) => {
  const preferredText = text || 'Not Provided';

  if (isTextExpanded || preferredText.length <= maxTextLength) {
    return preferredText;
  } else {
    return preferredText.slice(0, maxTextLength);
  }
};

export const toggleExpandTrimmedText = (
  text,
  maxTextLength,
  isTextExpanded,
  toggleTextFunction
) => {
  if (text && text.length > maxTextLength) {
    return (
      <span
        className={`not_badge ${
          isTextExpanded ? 'text-danger' : 'text-primary'
        }`}
        onClick={toggleTextFunction}
        type="button"
      >
        {isTextExpanded ? '- Read less' : ' + Read more'}
      </span>
    );
  }
};
