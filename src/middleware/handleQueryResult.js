// Middleware để xử lý kết quả của truy vấn và phản hồi
function handleQueryResult(req, res, next) {
  return function (err, rows, code, message) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Lỗi nội bộ" });
    } else {
      // Tùy chỉnh phản hồi dựa trên tài liệu cụ thể
      const responseData = {
        success: true,
        data: rows,
        message: message,
      };
      res.json(responseData);
    }
  };
}

module.exports = handleQueryResult;
