import React, { Component } from 'react';
import mbtiApi from '../../../api/mbtiApi';

class PostMBTI extends Component {
  // Hàm để gửi yêu cầu POST
  async sendPOSTRequests() {
    // Lặp qua mảng các dữ liệu JSON bạn muốn gửi
    const dataToPost = [
      {
        question_group_id: 3,
        question: 'Tại một buổi tiệc, bạn sẽ',
        answers: [
          {
            answer: 'Giao tiếp với nhiều người, kể cả người lạ',
            value: 'E',
          },
          {
            answer: 'Chỉ giao tiếp với với một số ít người mà bạn đã quen',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn thấy mình là người nghiêng về kiểu nào nhiều hơn?',
        answers: [
          {
            answer: 'Thực tế',
            value: 'S',
          },
          {
            answer: 'Sáng tạo',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn nghĩ tình huống nào tồi tể hơn?',
        answers: [
          {
            answer: 'Đầu óc của bạn cứ “bay bổng trên mây”',
            value: 'S',
          },
          {
            answer: 'Cuộc sống của bạn thật nhàm chán và không bao giờ thay đổi',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn sẽ bị ấn tượng hơn với',
        answers: [
          {
            answer: 'Các nguyên tắc',
            value: 'S',
          },
          {
            answer: 'Những cảm xúc',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Khi quyết định việc gì đó, bạn thường hay dựa vào:',
        answers: [
          {
            answer: 'Sự thuyết phục',
            value: 'T',
          },
          {
            answer: 'Sự đồng cảm',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn thích làm việc theo kiểu nào nhiều hơn?',
        answers: [
          {
            answer: 'Theo đúng thời hạn',
            value: 'T',
          },
          {
            answer: 'Tùy hứng',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có khuynh hướng đưa ra các lựa chọn',
        answers: [
          {
            answer: 'Rất cẩn thận',
            value: 'T',
          },
          {
            answer: 'Phần nào theo cảm nhận',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Điều nào khiến bạn thấy thích thú hơn?',
        answers: [
          {
            answer: 'Những điều thực tế',
            value: 'S',
          },
          {
            answer: 'Những ý tưởng khả thi',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Khi đánh giá hoặc phán xét người khác, bạn thường hay dựa vào điều gì?',
        answers: [
          {
            answer: 'Luật lệ và nguyên tắc',
            value: 'S',
          },
          {
            answer: 'Hoàn cảnh',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Khi tiếp cận, tiếp xúc người khác, bạn nghiêng về hướng nào hơn?',
        answers: [
          {
            answer: 'Tiếp cận theo hướng khách quan',
            value: 'T',
          },
          {
            answer: 'Tiếp cận theo hướng sử dụng trải nghiệm cá nhân',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Phong cách của bạn nghiêng về hướng nào hơn?',
        answers: [
          {
            answer: 'Đúng giờ, nghiêm túc',
            value: 'T',
          },
          {
            answer: 'Nhàn nhã, thoải mái',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn cảm thấy không thoải mái khi có những việc:',
        answers: [
          {
            answer: 'Chưa hoàn thiện',
            value: 'J',
          },
          {
            answer: 'Đã quá hoàn thiện',
            value: 'P',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Trong các mối quan hệ xã hội, bạn thường',
        answers: [
          {
            answer: 'Luôn nắm bắt kịp thời thông tin về các vấn đề của mọi người',
            value: 'E',
          },
          {
            answer: 'Thường biết thông tin sau những người khác',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Với các công việc thông thường, bạn nghiêng về cách:',
        answers: [
          {
            answer: 'Làm theo cách thông thường',
            value: 'E',
          },
          {
            answer: 'Làm theo cách của riêng mình',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Các nhà văn nên:',
        answers: [
          {
            answer: 'Viết những gì họ nghĩ và chân thật với những gì mình viết',
            value: 'S',
          },
          {
            answer: 'Diễn đạt sự việc bằng cách so sánh hay liên tưởng',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Điều gì lôi cuốn bạn hơn?',
        answers: [
          {
            answer: 'Tính nhất quán của tư duy, suy nghĩ',
            value: 'S',
          },
          {
            answer: 'Sự hòa hợp trong các mối quan hệ của con người',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn cảm thấy thoải mái hơn khi đưa ra:',
        answers: [
          {
            answer: 'Những đánh giá, nhận xét một cách logic',
            value: 'T',
          },
          {
            answer: 'Những đánh giá, nhận xét một cách có ý nghĩa',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn thích những điều:',
        answers: [
          {
            answer: 'Đã được sắp xếp, quyết định trước',
            value: 'T',
          },
          {
            answer: 'Chưa xác định, chưa được quyết định',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn tự thấy mình:',
        answers: [
          {
            answer: 'Nghiêm túc, quyết đoán',
            value: 'J',
          },
          {
            answer: 'Dễ gần, thoải mái',
            value: 'P',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Khi nói chuyện điện thoại, bạn:',
        answers: [
          {
            answer: 'Cứ gọi bình thường',
            value: 'E',
          },
          {
            answer: 'Chuẩn bị trước những điều sẽ nói',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Những sự kiện trong thực tế',
        answers: [
          {
            answer: 'Bản thân nó giải thích cho chính nó”',
            value: 'E',
          },
          {
            answer: 'Nó là bằng chứng giải thích cho các quy tắc, quy luật',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Những người có tầm nhìn xa/người lo xa:',
        answers: [
          {
            answer: 'Thường gây khó chịu cho người khác',
            value: 'S',
          },
          {
            answer: 'Khá thú vị',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn thường là người có:',
        answers: [
          {
            answer: 'Cái đầu lạnh',
            value: 'S',
          },
          {
            answer: 'Trái tim nóng',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Điều nào thì tồi tệ hơn?',
        answers: [
          {
            answer: 'Không công bằng',
            value: 'T',
          },
          {
            answer: 'Tàn nhẫn',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Các sự kiện nên xảy ra theo hướng:',
        answers: [
          {
            answer: 'Được lựa chọn và cân nhắc kỹ lưỡng',
            value: 'T',
          },
          {
            answer: 'Ngẫu nhiên và tự nhiên',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn cảm thấy thoải mái hơn khi',
        answers: [
          {
            answer: 'Đã mua một thứ gì đó',
            value: 'J',
          },
          {
            answer: 'Đang lựa chọn để mua',
            value: 'P',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Trong công ty, bạn là người:',
        answers: [
          {
            answer: 'Khởi xướng các câu chuyện',
            value: 'E',
          },
          {
            answer: 'Đợi người khác bắt chuyện với mình',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Đối với những quy ước, quy tắc thông thường trong xã hội, bạn :',
        answers: [
          {
            answer: 'Ít khi nghi ngờ những điều này',
            value: 'E',
          },
          {
            answer: 'Thường xem xét lại tính đúng đắn của những điều đó',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Trẻ em thường:',
        answers: [
          {
            answer: 'Chưa cố gắng đủ',
            value: 'S',
          },
          {
            answer: 'Chưa vui chơi đủ',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Khi đưa ra các quyết định, bạn sẽ thấy thoải mái hơn với:',
        answers: [
          {
            answer: 'Các tiêu chuẩn',
            value: 'S',
          },
          {
            answer: 'Cảm xúc, cảm nhận',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn nghiêng về tính cách nào hơn ?',
        answers: [
          {
            answer: 'Cứng rắn',
            value: 'T',
          },
          {
            answer: 'Nhẹ nhàng',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Theo bạn, khả năng nào đáng khâm phục hơn ?',
        answers: [
          {
            answer: 'Khả năng tổ chức và làm việc có phương pháp',
            value: 'T',
          },
          {
            answer: 'Khả năng thích ứng và xoay xở trước mọi tình huống',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn đề cao tố chất nào hơn?',
        answers: [
          {
            answer: 'Sự chắc chắn',
            value: 'J',
          },
          {
            answer: 'Sự cởi mở',
            value: 'P',
          },
        ],
      },
      {
        question_group_id: 3,
        question:
          'Khi tương tác với người khác ở các tình huống và vấn đề mới lạ, không thường gặp, bạn:',
        answers: [
          {
            answer: 'Thấy phấn chấn và hào hứng',
            value: 'E',
          },
          {
            answer: 'Cảm thấy mệt mỏi',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Thường thì bạn là:',
        answers: [
          {
            answer: 'Người thực tế',
            value: 'E',
          },
          {
            answer: 'Người có khả năng tưởng tượng phong phú',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn thường có xu hướng:',
        answers: [
          {
            answer: 'Xem người khác có thể làm được việc gì hữu ích',
            value: 'S',
          },
          {
            answer: 'Xem người khác sẽ nghĩ và cảm nhận như thế nào',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn cảm thấy thoải mái hơn khi:',
        answers: [
          {
            answer: 'Thảo luận một vân đề kĩ lưỡng, triệt để',
            value: 'S',
          },
          {
            answer: 'Đạt được thỏa thuận, sự nhất trí về vấn đề',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Cái đầu hay trái tim chi phối bạn nhiều hơn',
        answers: [
          {
            answer: 'Cái đầu',
            value: 'T',
          },
          {
            answer: 'Trái tim',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn cảm thấy thoải mái hơn khi làm các công việc theo dạng:',
        answers: [
          {
            answer: 'Được giao trọn gói, làm xong hết rồi bàn giao',
            value: 'T',
          },
          {
            answer: 'Công việc làm hàng ngày, theo lịch',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có xu hướng tìm kiếm những điều:',
        answers: [
          {
            answer: 'Theo trật tự, thứ tự',
            value: 'J',
          },
          {
            answer: 'Ngẫu nhiên',
            value: 'P',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn thích kiểu nào hơn?',
        answers: [
          {
            answer: 'Nhiều bạn bè ở mức độ xã giao',
            value: 'E',
          },
          {
            answer: 'Một vài người bạn thân',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn thường dựa vào:',
        answers: [
          {
            answer: 'Sự kiện, thông tin thực tế',
            value: 'E',
          },
          {
            answer: 'Nguyên lí, nguyên tắc',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn hứng thú với việc gì hơn?',
        answers: [
          {
            answer: 'Sản xuất và phân phối',
            value: 'S',
          },
          {
            answer: 'Thiết kế và nghiên cứu',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Lời khen nào giá trị hơn?',
        answers: [
          {
            answer: '“Đó là một người có suy nghĩ rất logic”',
            value: 'S',
          },
          {
            answer: '“Đó là một người rất tình cảm, tinh tế”',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn thích mình có tố chất nào hơn?',
        answers: [
          {
            answer: 'Kiên định, vững vàng',
            value: 'T',
          },
          {
            answer: 'Toàn tâm, cống hiến',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn thường thích điều nào hơn?',
        answers: [
          {
            answer: 'Một tuyên bố cuối cùng, không thay đổi',
            value: 'T',
          },
          {
            answer: 'Một tuyên bố dự kiến, ban đầu',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn thấy thoải mái hơn vào lúc:',
        answers: [
          {
            answer: 'Trước khi đưa ra quyết định',
            value: 'J',
          },
          {
            answer: 'Sau khi đưa ra quyết định',
            value: 'P',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn có thấy mình:',
        answers: [
          {
            answer: 'Dễ dàng bắt chuyện và kéo dài cuộc trò chuyện với người mới gặp',
            value: 'E',
          },
          {
            answer: 'Khó mà trò chuyện nhiều với những người mới quen',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn có xu hướng tin tưởng vào:',
        answers: [
          {
            answer: 'Kinh nghiệm của mình',
            value: 'E',
          },
          {
            answer: 'Linh cảm của mình',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn cho rằng mình thuộc tuýp người nào hơn?',
        answers: [
          {
            answer: 'Người thực tế',
            value: 'S',
          },
          {
            answer: 'Người khôn khéo',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Theo bạn ai là người đáng được khen ngợi hơn?',
        answers: [
          {
            answer: 'Một người giàu lý trí',
            value: 'S',
          },
          {
            answer: 'Một người giàu cảm xúc',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có xu hướng hành xử:',
        answers: [
          {
            answer: 'Công bằng, vô tư',
            value: 'T',
          },
          {
            answer: 'Thông cảm, đồng cảm',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn thích:',
        answers: [
          {
            answer: 'Đảm bảo rằng mọi việc được chuẩn bị, thu xếp sẵn sàng',
            value: 'T',
          },
          {
            answer: 'Để mọi việc diễn ra tự nhiên',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Trong các mối quan hệ thì mọi việc:',
        answers: [
          {
            answer: 'Có thể thảo luận để giải quyết được',
            value: 'J',
          },
          {
            answer: 'Diễn ra ngẫu nhiên và tùy theo điều kiện hoàn cảnh',
            value: 'P',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Khi chuông điện thoại reo, bạn sẽ:',
        answers: [
          {
            answer: 'Là người đầu tiên nhấc máy',
            value: 'E',
          },
          {
            answer: 'Hi vọng có người khác sẽ nhấc máy',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn đánh giá cao điều gì trong mình hơn:',
        answers: [
          {
            answer: 'Nhận thức tốt về các yếu tố thực tế',
            value: 'E',
          },
          {
            answer: 'Có trí tưởng tượng phong phú, rực rỡ',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn sẽ chú tâm hơn đến:',
        answers: [
          {
            answer: 'Các nguyên tắc, nguyên lý cơ bản',
            value: 'S',
          },
          {
            answer: 'Các ngụ ý, hàm ý, ẩn ý',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Điều gì có vẻ sẽ là một lỗi lớn hơn?',
        answers: [
          {
            answer: 'Quá nồng nhiệt, thiết tha',
            value: 'S',
          },
          {
            answer: 'Quá khách quan, thờ ơ',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Về cơ bản, bạn sẽ đánh giá mình là người thế nào?',
        answers: [
          {
            answer: 'Thiết thực, ít bị chi phối bởi tình cảm',
            value: 'T',
          },
          {
            answer: 'Từ tâm, đa cảm',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Tình huống nào sẽ lôi cuốn bạn hơn?',
        answers: [
          {
            answer: 'Tình huống rõ ràng, có kế hoạch',
            value: 'T',
          },
          {
            answer: 'Tình huống không xác định, không có kế hoạch',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn là người có xu hướng nào hơn?',
        answers: [
          {
            answer: 'Theo thói quen',
            value: 'J',
          },
          {
            answer: 'Hay thay đổi',
            value: 'P',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn có xu hướng nào hơn?',
        answers: [
          {
            answer: 'Là người dễ tiếp cận',
            value: 'E',
          },
          {
            answer: 'Ở mức độ nào đó là người kín đáo',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Khi viết, bạn thích:',
        answers: [
          {
            answer: 'Viết theo hướng văn chương hơn',
            value: 'E',
          },
          {
            answer: 'Viết theo số liệu, dữ liệu hơn',
            value: 'I',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Đối với bạn, điều gì khó thực hiện hơn?',
        answers: [
          {
            answer: 'Hiểu và chia sẻ với người khác',
            value: 'S',
          },
          {
            answer: 'Điều khiển người khác',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn mong ước mình sẽ có thêm nhiều điều gì?',
        answers: [
          {
            answer: 'Lí trí và khả năng nhận xét rõ ràng',
            value: 'S',
          },
          {
            answer: 'Tình thương, lòng trắc ẩn sâu sắc',
            value: 'N',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Điều gì sẽ là lỗi lớn hơn?',
        answers: [
          {
            answer: 'Hành động bừa bãi, không cân nhắc',
            value: 'T',
          },
          {
            answer: 'Hành động chỉ trích, phê phán',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn sẽ thích sự kiện nào hơn?',
        answers: [
          {
            answer: 'Sự kiện có lên kế hoạch trước',
            value: 'T',
          },
          {
            answer: 'Sự kiện không có kế hoạch trước',
            value: 'F',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn thường có hành động:',
        answers: [
          {
            answer: 'Cân nhắc thận trọng',
            value: 'J',
          },
          {
            answer: 'Tự nhiên, tự phát',
            value: 'P',
          },
        ],
      },
    ]; // Lưu trữ dữ liệu JSON của bạn ở đây

    // Lặp qua mảng và thực hiện yêu cầu POST cho từng mục
    for (let i = 0; i < dataToPost.length; i++) {
      try {
        const response = await mbtiApi.createQuestion(dataToPost[i]);

        // Xử lý kết quả tại đây nếu cần
        console.log(`Yêu cầu POST ${i + 1} đã thành công:`, response.data);
      } catch (error) {
        // Xử lý lỗi tại đây nếu cần
        console.error(`Lỗi khi gửi yêu cầu POST ${i + 1}:`, error);
      }
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.sendPOSTRequests}>Gửi POST Requests</button>
      </div>
    );
  }
}

export default PostMBTI;
