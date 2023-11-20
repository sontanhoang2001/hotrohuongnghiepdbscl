const sendApiResponse = (res, status, data, message) => {
  const response = {
    status,
    data,
  };

  if (message) {
    response.message = message;
  }

  res.status(status).json(response);
};

// ====================================  GIẢI THÍCH CÁC MÃ LỖI  ===============================================
// 200 OK: Yêu cầu đã thành công và trả về dữ liệu.
// 201 Created: Tài nguyên đã được tạo thành công và thông tin về tài nguyên mới được trả về.
// 204 No Content: Yêu cầu đã được xử lý thành công, nhưng không có dữ liệu phản hồi được gửi lại.
// 400 Bad Request: Yêu cầu không hợp lệ hoặc không tuân thủ cú pháp./ cập nhật thất bại
// 401 Unauthorized: Truy cập bị từ chối do thiếu quyền hoặc cần xác thực.
// 403 Forbidden: Có quyền truy cập, nhưng bị từ chối.
// 404 Not Found: Tài nguyên không tồn tại trên máy chủ.
// 405 Method Not Allowed: Phương thức HTTP không được chấp nhận bởi tài nguyên.
// 409 Conflict: Xung đột, yêu cầu không thể hoàn thành do xung đột với trạng thái hiện tại của tài nguyên.
// 500 Internal Server Error: Lỗi máy chủ, không thể xử lý yêu cầu.
// =============================================================================================================

const sendResponse = {
  // 200 OK
  SUCCESS: (res, data, message = "OK") => sendApiResponse(res, 200, data, message),
  // 201 Created
  CREATED: (res, data, message = "Initialization successful") => sendApiResponse(res, 201, data, message),
  // 204 No Content
  NO_CONTENT: (res, data, message = "No content") => sendApiResponse(res, 204, data, message),
  // 400 Bad Request
  BAD_REQUEST: (res, data, message = "Syntax error or invalid data from the client") => sendApiResponse(res, 400, data, message),
  // 401 Unauthorized
  UNAUTHORIZED: (res, data, message = "Access denied due to lack of permission") => sendApiResponse(res, 401, data, message),
  // 403 Forbidden
  FORBIDDEN: (res, data, message = "Forbidden") => sendApiResponse(res, 403, data, message),
  // 404 Not Found
  NOT_FOUND: (res, data, message = "Not found") => sendApiResponse(res, 404, data, message),
  // 405 Method Not Allowed
  METHOD_NOT_ALLOWED: (res, data, message = "Method not allowed") => sendApiResponse(res, 405, data, message),
  // 409 Conflict:
  CONFLICT: (res, data, message = "Conflict") => sendApiResponse(res, 409, data, message),
  // 500 Internal Server Error
  SERVER_ERROR: (res, data, message = "Internal server error") => sendApiResponse(res, 500, data, message),
};

module.exports = {
  sendResponse,
};
