import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, Card, Col, Empty, Row, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ContainerStyled,
  HeadingTitle,
  MarginTopContent,
  Title,
  size,
} from '../../../globalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getGetAllpersonality, selectMbtiQuestions } from '../../../redux/mbtiSlice';
import ImageCard from '../../../components/card/imageCard';

function MBTI() {
  const navigate = useNavigate();
  // gọi redux
  const dispatch = useDispatch();
  const { personality, pending } = useSelector((state) => state.mbti);

  useEffect(() => {
    dispatch(getGetAllpersonality());
  }, []);
  // console.log(personality);
  return (
    <ContainerStyled>
      <MarginTopContent>
        <Introduce>
          <Title>
            <HeadingTitle>trách nghiệm tính cách mbti</HeadingTitle>
            <div className="underline"></div>
          </Title>

          <div className="intro-content">
            <div className="content">
              <div className="exp-image">
                <img src="./images/mbti-banner.webp" alt="mbti" />
              </div>
              <div className="paragraph">
                <p>
                  <span>Trắc nghiệm tính cách MBTI (Myers-Briggs Type Indicator)</span> là một
                  phương pháp sử dụng hàng loạt các câu hỏi trắc nghiệm để phân tích tính cách con
                  người. Kết quả trắc nghiệm MBTI chỉ ra cách con người nhận thức thế giới xung
                  quanh và ra quyết định cho mọi vấn đề trong cuộc sống. Hiện nay MBTI được sử dụng
                  phổ biến như một phương pháp phân loại tính cách khá chính xác. Trong công việc,
                  MBTI giúp chúng ta có thêm thông tin để lựa chọn nghề nghiệp chính xác hơn, với
                  nhà tuyển dụng cũng có thể sử dụng MBTI để đánh giá mức độ phù hợp về tính cách
                  của ứng viên với công việc cũng như môi trường làm việc của doanh nghiệp.
                </p>
                <div className="mbti-btn">
                  <Button
                    type="primary"
                    danger
                    size="large"
                    onClick={() => {
                      navigate('/mbti-test');
                      window.scrollTo(0, 0);
                    }}
                  >
                    Đi tìm tính cách của bạn
                  </Button>
                </div>
              </div>

              <div className="mbti-description">
                <h3>trắc nghiệm MBTI là gì?</h3>
                <p>
                  MBTI (Myers-Briggs Type Indication) - trắc nghiệm tính cách Myers-Briggs Type là
                  một phương pháp sử dụng hàng loạt các câu hỏi trắc nghiệm để phân tích tính cách
                  con người. Phương pháp này có nền tảng từ lý thuyết phân loại của Carl Gustav Jung
                  - Bác sĩ người Thụy Điển - cha đẻ của “Tâm lý học phân tích” và được Katharine
                  Cook Briggs cùng con gái của bà, Isabel Briggs Myers phát triển hoàn thiện trong
                  chiến tranh thế giới thứ hai. MBTI thực sự trở nên nổi tiếng và phổ biến khi được
                  giới thiệu ở hai cuốn “Please understand me” I và II của David Keirsey từ những
                  năm 50 của thế kỉ 20 và được người Nhật đưa vào ứng dụng thực tiễn từ năm 1962.
                  MBTI dùng một chuỗi các câu hỏi trắc nghiệm liên quan đến các vấn đề cơ bản trong
                  cuộc sống với các đáp án để lựa chọn.Tổng kết bài trắc nghiệm sẽ cho ra kết quả để
                  đánh giá bạn là người có tính cách như thế nào thông qua phương pháp phân loại. Sự
                  phân loại này dựa trên 4 nhóm tính cách cơ bản, mỗi nhóm là một cặp lưỡng phân của
                  8 yếu tố chức năng, nhận thức:
                </p>
                <ul style={{ marginTop: '20px', paddingLeft: '50px' }}>
                  <li>Xu hướng Tự nhiên: Hướng ngoại (Extroversion) - Hướng nội (Introversion)</li>
                  <li>
                    Tìm hiểu và Nhận thức Thế giới: Giác quan (Sensing) - Trực giác (INtution)
                  </li>
                  <li>Quyết định và chọn lựa: Lý trí (Thinking) - Tình cảm (Feeling)</li>
                  <li>Cách thức và Hành động: Nguyên tắc (Judgment) - Linh hoạt (Perception)</li>
                </ul>
                <p style={{ marginTop: '20px' }}>
                  Mỗi yếu tố của 4 nhóm trên kết hợp với nhau tạo thành 16 nhóm tính cách MBTI. Nó
                  là một trong những bài trắc nghiệm tính cách phổ biến nhất thế giới với hơn 2
                  triệu người mới sử dụng mỗi năm và đặc biệt được ứng dụng trong các hoạt động
                  tuyển dụng, đánh giá nhân sự, giáo dục, hướng nghiệp… Làm trắc nghiệm MBTI ở TRUNG
                  TÂM HƯỚNG NGHIỆP ngoài việc được phân loại tính cách theo 16 nhóm của phương pháp
                  Myers-Briggs thì các dữ liệu thông tin sẽ được tổng hợp để đưa ra xu hướng nghề
                  nghiệp phù hợp nhất với bạn.
                </p>
              </div>

              <div className="mbti-note">
                <h3>Lưu ý trước khi làm trắc nghiệm MBTI</h3>
                <p style={{ padding: '20px' }}>
                  MBTI là một trắc nghiệm tâm lý nên để thực hiện nó một cách chính xác nhất bạn nên
                  hiểu rõ:
                </p>

                <ul style={{ marginTop: '20px', paddingLeft: '50px' }}>
                  <li>
                    Kết quả của một trắc nghiệm tâm lý phụ thuộc rất nhiều vào tâm trạng của bạn.
                    Tốt nhất hãy thực hiện nó trong một trạng thái tâm lý bình ổn nhất. Nếu bạn đang
                    quá vui, buồn, phấn khích, bực bội hay đang trong quá trình thay đổi nhận thức
                    thì sẽ không đảm bảo được độ chính xác.
                  </li>
                  <li>
                    Trung thực khi trả lời câu hỏi, phân biệt giữa lý tưởng và thực tế. Kết quả của
                    trắc nghiệm hoàn toàn là câu chuyện cá nhân của bạn, đừng để yếu tố bên ngoài
                    tác động đến câu trả lời.
                  </li>
                  <li>
                    Chúng ta trưởng thành và thay đổi từng ngày, kết quả trắc nghiệm tất nhiên có
                    thể từ đó mà thay đổi tùy theo nhận thức và thế giới quan của mỗi người. Tốt
                    nhất hãy làm bài kiểm tra nhiều lần và điều độ để có cái nhìn tổng quát và chính
                    xác nhất.
                  </li>
                </ul>

                <p style={{ padding: '20px' }}>
                  Kết quả của bài trắc nghiệm MBTI sau đây cung cấp thông tin để bạn có lựa chọn
                  nghề nghiệp thích hợp dựa trên các nhóm tính cách. Mọi dữ liệu đưa ra đều mang
                  tính chất tham khảo, quyết định luôn ở trong tay chúng ta. TRUNG TÂM HƯỚNG NGHIỆP
                  sẽ luôn đồng hành cùng bạn trong mọi lựa chọn nghề nghiệp. Với một hành trang vững
                  vàng thì tin tưởng rằng mọi kế hoạch đều sẽ thành công!
                </p>
              </div>
            </div>
          </div>
          <MBTIDetailStyled>
            <h3>16 loại hình tính cách MBTI</h3>
            {/* <Row gutter={[16, 16]}>
              {personality &&
                personality?.map((val, idx) => (
                  <Col key={idx} xs={14} sm={24} md={12} lg={12}>
                    <Card className="personality-card">
                      <div className="personality-img">
                        <img src={val.image} alt="tính cách MBTI" />
                      </div>
                      <p className="personality-name">{val.name}</p>
                      <p className="personality-description">{val.description}</p>
                    </Card>
                  </Col>
                ))}
            </Row> */}
            <Spin spinning={pending}>
              {personality ? (
                <Row gutter={[24, 34]}>
                  {personality?.map((val, idx) => (
                    <Col key={idx} xs={24} sm={24} md={12} lg={12}>
                      <ImageCard
                        src={`${val?.image}`}
                        title={val?.name}
                        titleColor={`var(--primary-color)`}
                        personality={true}
                        description={val.description}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Row align={'middle'} justify={'center'}>
                  <Empty description={<h3>Không có dữ liệu</h3>} />
                </Row>
              )}
            </Spin>
          </MBTIDetailStyled>
        </Introduce>
      </MarginTopContent>
    </ContainerStyled>
  );
}
const Introduce = styled.div`
  .title {
    h2 {
      text-transform: uppercase;
      border-left: 10px solid var(--primary-color);
      margin-bottom: 10px;
      padding-left: 10px;
      font-size: 3rem;
      font-weight: 800;
    }
    .underline {
      border-bottom: 4px solid var(--primary-color);
    }
  }
  .intro-content {
    font-size: 1.2rem;
    /* text-align: justify;
    display: flex; */
    .exp-image {
      display: flex;
      justify-content: center;
    }
    .content {
      margin-bottom: 20px;
      .paragraph,
      .mbti-note,
      .mbti-description {
        margin-top: 40px;
        margin-left: auto;
        margin-right: auto;
        padding: 3%;
        text-align: justify;
        width: 80%;
        border: 2px solid #c4c4cc;
        border-radius: 20px;
        color: var(--text-color);
        h3 {
          text-transform: capitalize;
        }
        span {
          font-weight: 600;
          font-size: 14pt;
        }
        p {
          font-size: 14pt;
        }
        .mbti-btn {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          button {
            font-size: 1.2rem;
            font-weight: 600;
            display: flex;
            align-items: center;
          }
        }
      }
      .mbti-description {
        background-color: #374151;
        color: var(--text-secondary-color);
        h3 {
          color: var(--text-secondary-color);
          text-transform: capitalize;
          margin-bottom: 20px;
        }
      }
      .mbti-note {
        h3 {
          color: var(--secondary-color);
        }
      }
    }
  }
`;
const MBTIDetailStyled = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  h3 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-top: 30px;
    margin-bottom: 30px;
    padding-left: 20px;
    border-left: 10px solid var(--primary-color);
    text-transform: uppercase;
  }
  .personality-card {
    height: 100%;
    .personality-name {
      text-align: center;
      font-weight: 800;
      font-size: 20pt;
      color: var(--primary-color);
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .personality-description {
      text-align: justify;
      font-size: 14pt;
    }
  }
  /*  */
`;

export default MBTI;
