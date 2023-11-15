import React, { useState } from 'react';
import { HeadingTitle, Title } from '../../../globalStyles';
import { Button, Card, Input } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
const data = [
  {
    question:
      'Thưa thầy/cô cho em hỏi: học kì trước em đã học 1 môn tự chọn là “Lập trình hệ thống” (3 tín chỉ). Học kì này em không thấy môn đó trong danh sách các môn học tự chọn, mà theo tư vấn thì cần học đủ 12 tín chỉ tự chọn. Vậy học kì này em cần học 3 môn (9 tín chỉ) hay 4 môn (12 tín chỉ) nữa ạ? Em cảm ơn.',
    answer:
      'Chào em, môn tự chọn được triển khai giảng dạy thì có thể khác nhau theo năm. Môn Lập trình hệ thống năm nay không mở lớp KHÔNG CÓ NGHĨA nó không phải là môn lựa chọn nữa hay nó không nằm trong chương trình đào tạo nữa. Em đã học môn đó và đã pass thì tức là em đã tích lũy được 3 tín chỉ tự chọn. Em chú ý là hàng năm có khoảng 12-15 môn lựa chọn được triển khai giảng dạy trong khi trong chương trình đào tạo có hơn 30 môn lựa chọn khác nhau. Đó là lý do môn lựa chọn offer cho SV có thể khác nhau theo năm.',
  },
  {
    question:
      'Thưa thầy cô, sinh viên CLC có bắt buộc phải hoàn thành môn tiếng Anh trong năm 3 không ạ?',
    answer:
      'Trước khi xét tốt nghiệp em đạt chuẩn B2 là được. Chú ý đây là một thử thách không dễ nên nhiều bạn phải thi một vài lần mới đạt đấy. Nên em thi sớm được thì tốt hơn.',
  },
  {
    question:
      'Thưa thầy cô em thấy trên web trường có chương trình đào tạo java và android của Samsung cho sinh viên năm 2 trở đi và tính là 3 tín chỉ cho khóa đào tạo đó. Thầy cô cho em hỏi là chương trình đó có phải là thầy cô của khoa dạy không ạ. Và kỳ tới trường đã thực hiện chương trình đó chưa? Và nếu chúng em học thì có tính vào điểm trung bình tích lũy không ạ?',
    answer:
      'Hiện nay, chương trình đào tạo của Samsung bao gồm các khoá học về Java, Android và Tizen. Khi tổ chức được khoá học, các sinh viên sẽ nhận được thông báo để đăng ký qua email. Giảng viên của khoá học bao gồm cả thầy cô trong Khoa cũng như chuyên gia bên Samsung. Các khoá học này hiện nay chưa có quy chế quy đổi tương đương sang các môn học khác của chương trình đào tạo của Khoa, vì vậy sẽ không được tính vào ĐTBTL cho đến thời điểm này.',
  },
  {
    question:
      'Cho em hỏi là học nhiều hơn 4 môn tự chọn có được không ạ, và nếu học nhiều hơn 4 môn thì khi lấy điểm chỉ lấy 4 môn điểm cao nhất trong số các môn tự chọn mình học phải không ạ? Việc đăng ký các môn tự chọn có bắt buộc phải theo định hướng không, ví dụ em học môn <Các vấn đề hiện đại của CNPM> thì các môn tự chọn của em cũng bắt buộc phải liên quan đến CNPM hay là em học môn khác, kiểu như <Khai phá dữ liệu> cũng được ạ?',
    answer:
      'Về đăng ký môn học thì em có thể đăng ký nhiều hơn 4 môn nhưng đừng nhiều quá chiếm chỗ các bạn khác. Theo quy chế hiện tại thì sẽ lấy điểm của 4 môn đăng ký đầu tiên nếu điểm từ D trở lên. Vì vậy nếu học nhiều hơn 4 môn tự chọn thì nên ghi rõ là môn đó dùng để cải thiện cho môn học nào.Việc đăng ký môn học của khóa em không nhất thiết theo định hướng như em nói nhưng nên học nhóm môn liên quan với nhau.',
  },
  {
    question:
      'Cho e hỏi trượt môn tiên quyết thì có được đăng kí mấy môn sau cần tiên quyết không ạ?',
    answer:
      'Với một tiến trình học tập bình thường của đa số sinh viên thì môn tiên quyết bao giờ cũng được học trước. Tuy nhiên, nếu sinh viên bị trượt môn tiên quyết thì có thể rơi vào tình huống như em đặt ra. Thực tế là Phòng đào tạo chưa kiểm tra được việc sinh viên đã qua môn tiên quyết hay chưa vì thường thời gian kết thúc thi học kỳ (cả chính lẫn phụ) cho tới lúc đăng ký môn học của kỳ sau là quá ngắn (cỡ 2 tuần), chưa đủ để hoàn thiện điểm tất cả các môn học. Vậy cho nên thực tế thì sinh viên vẫn có thể đăng ký học môn phụ thuộc. Nhiều trường hợp sinh viên học song song môn phụ thuộc ở kỳ chính và môn tiên quyết ở lớp mở cho học trả nợ.',
  },
];
function Companion() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="container">
      <div>
        <SearchBar>
          <SearchBarContent>
            <Input
              // size="large"
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined style={{ paddingLeft: 10 }} />}
            />
            <Button
              type="primary"
              style={{
                marginLeft: 20,
                padding: ` 23px 11px`,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Tìm Kiếm
            </Button>
          </SearchBarContent>
        </SearchBar>
        <div>
          <Title>
            <HeadingTitle>các câu hỏi thường gặp</HeadingTitle>
            <div className="underline"></div>
          </Title>
          <div>
            {data.map((val, idx) => (
              <Card
                key={idx}
                style={{ marginTop: 20, boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px` }}
              >
                <h4>Câu hỏi: {val.question}</h4>
                <br />
                <p>
                  <b>Giải đáp:</b> {val.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
const SearchBar = styled.div`
  height: 300px;
  width: 100%;
  background: url('../images/istockphoto-1192265107-1024x1024.webp') no-repeat top;
`;
const SearchBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  height: 300px;
`;

export default Companion;
