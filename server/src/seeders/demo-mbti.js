'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'MBTI',
      [
        {
          name: 'ENFJ',
          description: 'Được biết đến với tên gọi người chỉ dạy, ENFJ là những người có sức ảnh hưởng lớn. Họ thường rất lôi cuốn và có tài hùng biện. ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ENFP',
          description: 'Người thuộc nhóm tính cách ENFP hay còn gọi là người dẫn dắt/truyền cảm hứng. Họ thường rất tò mò và luôn tìm hiểu mọi sự vật hiện tượng ở đến gốc rễ, chiều sâu nhất. ', 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ENTJ',
          description: 'Những nhà điều hành – ENTJ rất lý trí và nhạy bén. Họ rất giỏi trong vai trò lãnh đạo. Họ tin rằng nếu quyết tâm thì mọi thứ đều có thể.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ENTP',
          description: 'Người mang tính cách ENTP có tầm nhìn xa trông rộng. Họ có lợi thế trong học thuật và chính trị do có đầu óc nhanh nhạy và sáng tạo. Trong bất cứ lĩnh vực nào, những người này cũng dễ dàng thành công vì họ luôn sẵn sàng đối mặt với thử thách.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ESFJ',
          description: 'Đây là nhóm tính cách bao gồm những người giàu lòng vị tha, luôn quan tâm đến người khác, và hy sinh vì lẽ phải. Người mang tính cách ESFJ rất tận tuy, giỏi làm việc nhóm, và cũng khá truyền thống.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ESFP',
          description: 'Những người này thường là trung tâm của sự chú ý. Họ luôn toả ra nguồn năng lượng vui vẻ và nồng nhiệt. Các ESFP cũng rất sáng tạo và tò mò với mọi thử nghiệm mới mẻ.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ESTJ',
          description: 'Đây là nhóm người cực kỳ nguyên tắc, truyền thống, và thích sự ổn định. ESTJ luôn cần gắn kết với một điều gì đó, ví dụ như gia đình, một cộng đồng hoặc tổ chức.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ESTP',
          description: 'ESTP là nhóm người rất thẳng thắn. Họ luôn tập trung vào các vấn đề hiện tại và nỗ lực hết mình làm những gì họ thích.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {  
          name: 'INFJ',
          description: 'Người có nhóm tính cách INFJ có xu hướng giúp đỡ người khác và luôn đứng lên vì lẽ phải. Họ sẵn sàng đấu tranh vì những gì họ cho là đúng đắn, một mực tin vào lý tưởng của mình.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'INFP',
          description: 'Người thuộc nhóm tính cách INFP có vẻ dè dặt và bình tĩnh. Tuy nhiên, bên trong họ là ngọn lửa đam mê cháy bỏng. Họ cũng là những người sống tình cảm và có lòng trắc ẩn.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'INTJ', 
          description: 'Nhóm tính cách INTJ được gọi là những nhà khoa học. Họ thường rất thông minh và đôi khi vô cùng khó hiểu. Những người này cũng rất tự tin với sự hiểu biết và kiến thức rộng lớn của mình.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'INTP',
          description: 'Những người coa tính cách INTP thường có tư duy vượt bậc. Đối với họ, mọi vấn đề đều có thể được đem ra phân tích và có cách giải quyết.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ISFJ',
          description: 'Đây là nhóm tính cách nuôi dưỡng. ISFJ giàu lòng vị tha và luôn hướng đến các hoạt động chăm sóc cộng đồng.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ISFP',
          description: 'Nhóm tính cách ISFP được mệnh danh là người nghệ sĩ. Đây là nhóm tính cách khó đoán nhất trong số các tính cách hướng nội. Họ cũng vô cùng sáng tạo, có thiên hướng nghệ thuật và tò mò với thế giới xung quanh.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ISTJ',
          description: 'ISTJ là nhóm tính cách phổ biến nhất. Nhóm người mang tính cách này có tinh thần trách nhiệm cao. Họ cũng có khả năng ghi nhớ lâu dài .',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ISTP',
          description: 'Những người có tính cách ISTP thường khá thụ động. Họ hay khiến người khác phải bất ngờ về mình. Bên cạnh đó, họ cũng suy nghĩ theo chiều hướng rất hợp lý và logic.',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User_Detail', null, {});
  },
};
