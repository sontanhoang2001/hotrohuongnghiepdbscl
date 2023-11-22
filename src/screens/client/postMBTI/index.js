import React, { Component } from 'react';
import mbtiApi from '../../../api/mbtiApi';

class PostMBTI extends Component {
  // Hàm để gửi yêu cầu POST
  async sendPOSTRequests() {
    // Lặp qua mảng các dữ liệu JSON bạn muốn gửi
    const dataToPost = [
      {
        question_group_id: 1,
        question: 'Khi điện thoại đổ chuông, bạn có:',
        answers: [
          {
            value: 'E',
            answer: 'Nhanh chóng đạt được nó trước',
          },
          {
            value: 'I',
            answer: 'Hy vọng người khác sẽ trả lời',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có nhiều hơn không',
        answers: [
          {
            value: 'S',
            answer: 'Quan sát hơn là hướng nội',
          },
          {
            value: 'N',
            answer: 'Nội tâm hơn là quan sát',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Có tệ hơn không',
        answers: [
          {
            value: 'S',
            answer: 'Đầu óc bạn như trên mây',
          },
          {
            value: 'N',
            answer: 'Đang ở trong lối mòn',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Với mọi người, bạn thường hơn',
        answers: [
          {
            value: 'T',
            answer: 'Cứng rắn hơn dịu dàng',
          },
          {
            value: 'F',
            answer: 'Dịu dàng hơn kiên quyết',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn có thoải mái hơn khi thực hiện',
        answers: [
          {
            value: 'T',
            answer: 'Phán xét quan trọng',
          },
          {
            value: 'F',
            answer: 'Đánh giá giá trị',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Sự bừa bộn ở nơi làm việc có phải là điều bạn không?',
        answers: [
          {
            value: 'J',
            answer: 'Dành thời gian để đứng thẳng',
          },
          {
            value: 'P',
            answer: 'Chịu đựng khá tốt',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Đó có phải là cách của bạn để',
        answers: [
          {
            value: 'J',
            answer: 'Quyết định nhanh chóng',
          },
          {
            value: 'P',
            answer: 'Chọn và chọn ở một mức độ nào đó',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Xếp hàng chờ đợi, bạn có thường xuyên không',
        answers: [
          {
            value: 'E',
            answer: 'Trò chuyện với người khác',
          },
          {
            value: 'I',
            answer: 'Gắn bó với công việc kinh doanh',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có nhiều hơn không',
        answers: [
          {
            value: 'S',
            answer: 'Hợp lý hơn lý tưởng',
          },
          {
            value: 'N',
            answer: 'Lý tưởng hơn là hợp lý',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có quan tâm nhiều hơn đến',
        answers: [
          {
            value: 'S',
            answer: 'Cái gì là thực tế',
          },
          {
            value: 'N',
            answer: 'Điều gì có thể',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Khi đã quyết định, bạn có nhiều khả năng sẽ bỏ qua',
        answers: [
          {
            value: 'T',
            answer: 'Dữ liệu',
          },
          {
            value: 'F',
            answer: 'Mong muốn',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Khi đánh giá người khác, bạn có xu hướng',
        answers: [
          {
            value: 'T',
            answer: 'Khách quan và khách quan',
          },
          {
            value: 'F',
            answer: 'Thân thiện và cá nhân',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có thích hợp đồng',
        answers: [
          {
            value: 'J',
            answer: 'Ký, đóng dấu và giao',
          },
          {
            value: 'P',
            answer: 'Giải quyết bằng cái bắt tay',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có hài lòng hơn khi có',
        answers: [
          {
            value: 'J',
            answer: 'Thành phẩm',
          },
          {
            value: 'P',
            answer: 'Công việc đang tiến hành',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Tại một bữa tiệc, bạn có',
        answers: [
          {
            value: 'E',
            answer: 'Tương tác với nhiều người, thậm chí cả người lạ',
          },
          {
            value: 'I',
            answer: 'Tương tác với một vài người bạn',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có xu hướng trở nên nhiều hơn',
        answers: [
          {
            value: 'S',
            answer: 'Thực tế hơn là suy đoán',
          },
          {
            value: 'N',
            answer: 'Suy đoán hơn thực tế',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có thích những nhà văn',
        answers: [
          {
            value: 'S',
            answer: 'Nói ý nghĩa của chúng',
          },
          {
            value: 'N',
            answer: 'Sử dụng ẩn dụ và biểu tượng',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Điều nào hấp dẫn bạn hơn:',
        answers: [
          {
            value: 'T',
            answer: 'Sự nhất quán trong suy nghĩ',
          },
          {
            value: 'F',
            answer: 'Mối quan hệ hài hòa',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Nếu bạn phải làm ai đó thất vọng thì bạn thường',
        answers: [
          {
            value: 'T',
            answer: 'Thẳng thắn, thẳng thắn',
          },
          {
            value: 'F',
            answer: 'Ấm áp và ân cần',
          },
        ],
      },

      {
        question_group_id: 4,
        question: 'Trong công việc bạn có muốn các hoạt động của mình',
        answers: [
          {
            value: 'J',
            answer: 'Theo lịch trình',
          },
          {
            value: 'P',
            answer: 'Đột xuất',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có thường thích',
        answers: [
          {
            value: 'J',
            answer: 'Tuyên bố cuối cùng, không thể thay đổi',
          },
          {
            value: 'P',
            answer: 'Tuyên bố dự kiến, sơ bộ',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Có tương tác với người lạ không',
        answers: [
          {
            value: 'E',
            answer: 'Tiếp thêm sinh lực cho bạn',
          },
          {
            value: 'I',
            answer: 'Đánh thuế khoản dự trữ của bạn',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'sự thật',
        answers: [
          {
            value: 'S',
            answer: 'Tự nói về mình',
          },
          {
            value: 'N',
            answer: 'Minh họa các nguyên tắc',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có thấy những người nhìn xa trông rộng và những nhà lý luận',
        answers: [
          {
            value: 'S',
            answer: 'Hơi khó chịu',
          },
          {
            value: 'N',
            answer: 'Khá hấp dẫn',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Trong một cuộc thảo luận sôi nổi, bạn có',
        answers: [
          {
            value: 'T',
            answer: 'Giữ vững khẩu súng của bạn',
          },
          {
            value: 'F',
            answer: 'Tìm điểm chung',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Có tốt hơn không?',
        answers: [
          {
            value: 'T',
            answer: 'Chỉ',
          },
          {
            value: 'F',
            answer: 'Nhân từ',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Tại nơi làm việc, bạn có tự nhiên hơn không?',
        answers: [
          {
            value: 'J',
            answer: 'Chỉ ra lỗi sai',
          },
          {
            value: 'P',
            answer: 'Cố gắng làm hài lòng người khác',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có thấy thoải mái hơn không?',
        answers: [
          {
            value: 'J',
            answer: 'Sau một quyết định',
          },
          {
            value: 'P',
            answer: 'Trước khi có quyết định',
          },
        ],
      },

      {
        question_group_id: 1,
        question: 'Bạn có xu hướng',
        answers: [
          {
            value: 'E',
            answer: 'Nói thẳng ra điều bạn đang nghĩ',
          },
          {
            value: 'I',
            answer: 'Luôn mở rộng đôi tai của bạn',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'lẽ thường là',
        answers: [
          {
            value: 'S',
            answer: 'Thường đáng tin cậy',
          },
          {
            value: 'N',
            answer: 'Thường xuyên nghi vấn',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Trẻ em thường không',
        answers: [
          {
            value: 'S',
            answer: 'Làm cho mình đủ hữu ích',
          },
          {
            value: 'N',
            answer: 'Vận dụng đủ trí tưởng tượng của mình',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Khi phụ trách người khác, bạn có xu hướng',
        answers: [
          {
            value: 'T',
            answer: 'Vững chắc và không uốn cong',
          },
          {
            value: 'F',
            answer: 'Tha thứ và khoan dung',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn có thường xuyên hơn không',
        answers: [
          {
            value: 'T',
            answer: 'Một người có cái đầu lạnh',
          },
          {
            value: 'F',
            answer: 'Một người có trái tim ấm áp',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có dễ bị',
        answers: [
          {
            value: 'J',
            answer: 'Đóng đinh mọi thứ xuống',
          },
          {
            value: 'P',
            answer: 'Khám phá các khả năng',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Trong hầu hết các tình huống, bạn nhiều hơn',
        answers: [
          {
            value: 'J',
            answer: 'Cố ý hơn là tự phát',
          },
          {
            value: 'P',
            answer: 'Tự phát hơn là cố ý',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn có nghĩ mình là',
        answers: [
          {
            value: 'E',
            answer: 'Một người hướng ngoại',
          },
          {
            value: 'I',
            answer: 'Cá nhân',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có thường xuyên hơn không',
        answers: [
          {
            value: 'S',
            answer: 'Một loại người thực tế',
          },
          {
            value: 'N',
            answer: 'Một loại người huyền ảo',
          },
        ],
      },

      {
        question_group_id: 2,
        question: 'Bạn có nói nhiều hơn trong',
        answers: [
          {
            value: 'S',
            answer: 'Cụ thể hơn là chung chung',
          },
          {
            value: 'N',
            answer: 'Tổng quát hơn là chi tiết',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Lời khen nào hay hơn:',
        answers: [
          {
            value: 'T',
            answer: '“Có một người logic”',
          },
          {
            value: 'F',
            answer: '“Có một người đa cảm”',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Điều gì quy định bạn nhiều hơn',
        answers: [
          {
            value: 'T',
            answer: 'Suy nghĩ của bạn',
          },
          {
            value: 'F',
            answer: 'Cảm xúc của bạn',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Khi kết thúc công việc, bạn có thích',
        answers: [
          {
            value: 'J',
            answer: 'Buộc lại tất cả các đầu lỏng lẻo',
          },
          {
            value: 'P',
            answer: 'Chuyển sang việc khác',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có thích làm việc không?',
        answers: [
          {
            value: 'J',
            answer: 'Đến thời hạn',
          },
          {
            value: 'P',
            answer: 'Bất cứ khi nào',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn có phải là người',
        answers: [
          {
            value: 'E',
            answer: 'Khá là nói nhiều',
          },
          {
            value: 'I',
            answer: 'Không bỏ lỡ nhiều',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có khuynh hướng chấp nhận những gì được nói',
        answers: [
          {
            value: 'S',
            answer: 'Theo nghĩa đen hơn',
          },
          {
            value: 'N',
            answer: 'Theo nghĩa bóng hơn',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có thường xuyên gặp hơn không?',
        answers: [
          {
            value: 'S',
            answer: 'Cái gì ở ngay trước mặt bạn',
          },
          {
            value: 'N',
            answer: 'Những gì chỉ có thể tưởng tượng được',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Có tệ hơn không?',
        answers: [
          {
            value: 'T',
            answer: 'Mềm mại',
          },
          {
            value: 'F',
            answer: 'Cứng rắn',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Đôi khi bạn gặp hoàn cảnh khó khăn',
        answers: [
          {
            value: 'T',
            answer: 'Quá thiếu thông cảm',
          },
          {
            value: 'F',
            answer: 'Quá thông cảm',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có xu hướng chọn',
        answers: [
          {
            value: 'J',
            answer: 'Khá cẩn thận',
          },
          {
            value: 'P',
            answer: 'Hơi bốc đồng',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có xu hướng muốn nhiều hơn',
        answers: [
          {
            value: 'J',
            answer: 'Vội vã hơn là nhàn nhã',
          },
          {
            value: 'P',
            answer: 'Nhàn nhã hơn là vội vã',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Tại nơi làm việc bạn có xu hướng',
        answers: [
          {
            value: 'E',
            answer: 'Hòa đồng với đồng nghiệp của bạn',
          },
          {
            value: 'I',
            answer: 'Giữ nhiều hơn cho riêng mình',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có dễ tin tưởng hơn không',
        answers: [
          {
            value: 'S',
            answer: 'Kinh nghiệm của bạn',
          },
          {
            value: 'N',
            answer: 'Quan niệm của bạn',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có xu hướng cảm thấy',
        answers: [
          {
            value: 'S',
            answer: 'Xuống trái đất',
          },
          {
            value: 'N',
            answer: 'Loại bỏ một phần',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn có nghĩ mình là một',
        answers: [
          {
            value: 'T',
            answer: 'Người cứng rắn',
          },
          {
            value: 'F',
            answer: 'Người có trái tim dịu dàng',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn có coi trọng bản thân mình hơn bạn không?',
        answers: [
          {
            value: 'T',
            answer: '(một sự hợp lí',
          },
          {
            value: 'F',
            answer: 'Cống hiến',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có thường muốn những thứ',
        answers: [
          {
            value: 'J',
            answer: 'Giải quyết và quyết định',
          },
          {
            value: 'P',
            answer: 'Vừa mới viết bút chì vào',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có nói rằng bạn hơn',
        answers: [
          {
            value: 'J',
            answer: 'Nghiêm túc và quyết tâm',
          },
          {
            value: 'P',
            answer: 'Dễ dàng',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn có coi mình là chính mình không?',
        answers: [
          {
            value: 'E',
            answer: 'Một người nói chuyện giỏi',
          },
          {
            value: 'I',
            answer: 'Một người biết lắng nghe',
          },
        ],
      },

      {
        question_group_id: 4,
        question: 'Bạn có xu hướng chọn',
        answers: [
          {
            value: 'J',
            answer: 'Khá cẩn thận',
          },
          {
            value: 'P',
            answer: 'Hơi bốc đồng',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có xu hướng muốn nhiều hơn',
        answers: [
          {
            value: 'J',
            answer: 'Vội vã hơn là nhàn nhã',
          },
          {
            value: 'P',
            answer: 'Nhàn nhã hơn là vội vã',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Tại nơi làm việc bạn có xu hướng',
        answers: [
          {
            value: 'E',
            answer: 'Hòa đồng với đồng nghiệp của bạn',
          },
          {
            value: 'I',
            answer: 'Giữ nhiều hơn cho riêng mình',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có dễ tin tưởng hơn không',
        answers: [
          {
            value: 'S',
            answer: 'Kinh nghiệm của bạn',
          },
          {
            value: 'N',
            answer: 'Quan niệm của bạn',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có xu hướng cảm thấy',
        answers: [
          {
            value: 'S',
            answer: 'Xuống trái đất',
          },
          {
            value: 'N',
            answer: 'Loại bỏ một phần',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn có nghĩ mình là một',
        answers: [
          {
            value: 'T',
            answer: 'Người cứng rắn',
          },
          {
            value: 'F',
            answer: 'Người có trái tim dịu dàng',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn có coi trọng bản thân mình hơn bạn không?',
        answers: [
          {
            value: 'T',
            answer: '(một sự hợp lí',
          },
          {
            value: 'F',
            answer: 'Cống hiến',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có thường muốn những thứ',
        answers: [
          {
            value: 'J',
            answer: 'Giải quyết và quyết định',
          },
          {
            value: 'P',
            answer: 'Vừa mới viết bút chì vào',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có nói rằng bạn hơn',
        answers: [
          {
            value: 'J',
            answer: 'Nghiêm túc và quyết tâm',
          },
          {
            value: 'P',
            answer: 'Dễ dàng',
          },
        ],
      },
      {
        question_group_id: 1,
        question: 'Bạn có coi mình là chính mình không?',
        answers: [
          {
            value: 'E',
            answer: 'Một người nói chuyện giỏi',
          },
          {
            value: 'I',
            answer: 'Một người biết lắng nghe',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có tự thưởng cho mình không',
        answers: [
          {
            value: 'S',
            answer: 'Bám chặt vào thực tế',
          },
          {
            value: 'N',
            answer: 'Trí tưởng tượng sống động',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Bạn có bị thu hút nhiều hơn vào',
        answers: [
          {
            value: 'S',
            answer: 'Nguyên tắc cơ bản',
          },
          {
            value: 'N',
            answer: 'Âm bội',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Có vẻ như lỗi lớn hơn:',
        answers: [
          {
            value: 'T',
            answer: 'Quá từ bi',
          },
          {
            value: 'F',
            answer: 'Quá vô tư',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn có bị ảnh hưởng nhiều hơn bởi',
        answers: [
          {
            value: 'T',
            answer: 'Bằng chứng thuyết phục',
          },
          {
            value: 'F',
            answer: 'Một lời kêu gọi cảm động',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có cảm thấy tốt hơn về',
        answers: [
          {
            value: 'J',
            answer: 'Sắp kết thúc',
          },
          {
            value: 'P',
            answer: 'Luôn để ngỏ các lựa chọn của bạn',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Tốt nhất là nên',
        answers: [
          {
            value: 'J',
            answer: 'Đảm bảo mọi thứ được sắp xếp',
          },
          {
            value: 'P',
            answer: 'Cứ để mọi việc diễn ra tự nhiên',
          },
        ],
      },

      {
        question_group_id: 1,
        question: 'Bạn có muốn trở thành',
        answers: [
          {
            value: 'E',
            answer: 'Dễ gần',
          },
          {
            value: 'I',
            answer: 'Hơi dè dặt',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Trong truyện bạn thích',
        answers: [
          {
            value: 'S',
            answer: 'Hành động và phiêu lưu',
          },
          {
            value: 'N',
            answer: 'Ảo tưởng và chủ nghĩa anh hùng',
          },
        ],
      },
      {
        question_group_id: 2,
        question: 'Có dễ dàng hơn cho bạn không?',
        answers: [
          {
            value: 'S',
            answer: 'Sử dụng người khác một cách có ích',
          },
          {
            value: 'N',
            answer: 'Xác định với người khác',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn mong muốn điều gì hơn cho bản thân:',
        answers: [
          {
            value: 'T',
            answer: 'Sức mạnh của ý chí',
          },
          {
            value: 'F',
            answer: 'Sức mạnh của cảm xúc',
          },
        ],
      },
      {
        question_group_id: 3,
        question: 'Bạn có thấy mình về cơ bản là',
        answers: [
          {
            value: 'T',
            answer: 'Da dày',
          },
          {
            value: 'F',
            answer: 'Da mỏng',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có xu hướng để ý',
        answers: [
          {
            value: 'J',
            answer: 'Sự hỗn loạn',
          },
          {
            value: 'P',
            answer: 'Cơ hội thay đổi',
          },
        ],
      },
      {
        question_group_id: 4,
        question: 'Bạn có nhiều hơn không',
        answers: [
          {
            value: 'J',
            answer: 'Thường lệ hơn là hay thay đổi',
          },
          {
            value: 'P',
            answer: 'Hay thay đổi hơn thường lệ',
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
