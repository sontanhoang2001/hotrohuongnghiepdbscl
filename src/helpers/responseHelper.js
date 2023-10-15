const sendResponse = (res, status, data, message = null) => {
  if (message == null) {
    switch (status) {
      case 200:
        message = "OK";
        break;
      case 201:
        message = "Initialization successful";
        break;
      case 400:
        message = "Syntax error or invalid data from the client";
        break;
      case 401:
        message = "Access denied due to lack of permission";
        break;
      case 403:
        message = "Forbidden";
        break;
      case 404:
        message = "Not found";
        break;
      case 500:
        message = "Server error";
        break;
      default:
    }
  }
  const response = {
    status,
    data,
  };

  if (message) {
    response.message = message;
  }

  res.status(status).json(response);
};

module.exports = {
  sendResponse,
};
