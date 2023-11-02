'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Question_Group',
      [
        { name: 'Sensing (Giác quan) / iNtuition (Trực giác)', value: 'SN', description: "Trong các nhóm trắc nghiệm MBTI test. Cặp xu hướng Sensing (Giác quan) / iNtuition (Trực giác) chính là xu hướng đối lập nhau về cách mà con người tiếp nhận sự việc hiện tượng xung quanh họ. Thế giới được hiểu và nhận thức thông qua các giác quan cụ thể, ví dụ như màu sắc, hình ảnh thì sẽ thông qua mắt để nhận biết, mùi vị, âm thanh sẽ nhờ tai để cảm nhận, phân tích. Ngoài ra, 5 cơ quan sẽ cùng liên tục sắp xếp, phân loại các sự kiện thực tế đang diễn ra một cách đồng thời để cung cấp ngược lại những thông tin từng diễn ra trong quá khứ. Nếu tìm hiểu nhận thức thế giới thông qua trực giác, não bộ chính là đơn vị phải có trách nhiệm tìm hiểu, diễn dịch, phân tích, lí giải những mô hình thông tin để thu thậ các luồng dữ liệu, trước và sau đó đồng thời sắp xếp các mô hình, liên hệ chúng lại với nhau. Não bộ phải làm việc hết sức, suy đoán và phán đoán tương lai.", image: "https://mbti.vn/img/sensing-intuition.jpg" },
        { name: 'Thinking (Lý trí) / Feeling (Cảm xúc)', value: 'TF', description: "Ở nhóm trắc nghiệm MBTI test. Thinking (Lý trí) / Feeling (Cảm xúc) là hai xu hướng đối lập về cách mà con người lựa chọn đáp án, câu trả lời cho từng vấn đề cụ thể. Trong não bộ của chúng ta, phần lí trí là phần được đánh giá cao nhất, nó có vai trò tìm hiểu các thông tin liên quan dựa trên các bộ phân tiêu chí đúng sai, trái hay phải. Sau đó, suy luận một cách logic mới trực tiếp cho đáp án cụ thể nhất, có căn cứ nhất, có khoa học nhất. Phần cảm xúc của não bộ sẽ xem xét sự việc trên tổng thế các vấn đề cảm tính, yêu hay ghét, hận hay thu đồng thời các yếu tố đó có sự tác động qua lại lẫn nhau, không có một sự rạch ròi, đó là bản chất của vấn đề cảm xúc do não quyết định.", image: "https://mbti.vn/img/thinking-feeling.jpg" },
        { name: 'Extraversion (Hướng ngoại) / Introversion (Hướng nội)', value: 'EI', description: "Extraversion (Hướng ngoại) / Introversion (Hướng nội) hai xu hướng đối lập thể hiện những xu hướng ứng xử của một người với thế giới quan bên ngoài và với chính họ. Hướng nội là hướng vào nội tâm, gồm cả ý nghĩ, tư tưởng, trí tưởng tượng. Hướng ngoại là hướng về thế giới bên ngoài gồm những hoạt động, con người, đồ vật.", image : "https://mbti.vn/img/extraversion-introversion.jpg" },
        { name: 'Judging (Nguyên tắc) / Perceiving (Linh hoạt)', value: 'JP', description: "Nhóm cuối của trắc nghiệm MBTI test. Là cách thức con người lựa chọn để tác động với thế giới bên ngoài của họ. Với dạng thức này, não bộ của người có cách thức hành động này sẽ làm việc trên các nguyên tắc , có kế hoạch và để đạt được một kế hoạch và có sự chuẩn bị thì tất cả sẽ được tiếp cận một cách rõ ràng, tự nhiên và đôi lúc con người chấp nhận sự thay đổi để có được sự phù hợp với hoàn cảnh, kế hoạch đã được vạch ra trước đó!", image : "https://mbti.vn/img/judging-perceiving.jpg" },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Question_Group', null, {});
  },
};