const Question = require('../models').Question;
const Answer = require('../models').Answer;
const QuestionGroup = require('../models').QuestionGroup;

const sequelize = require('../database/connection_database');
const { Op } = require('sequelize');

module.exports = {
  createNew: async (payload) => {
    let transaction;
    try {
      const answers = [...payload.answers];

      transaction = await sequelize.transaction();
      // Tạo mới câu hỏi
      const questionPayload = { question: payload.question, questionGroupId: payload.question_group_id };
      const question = await Question.create(questionPayload, { transaction });
      const questionId = question?.dataValues.id;

      // Duyệt qua mảng answers
      answers.forEach((answer) => {
        // Gán questionId cho mỗi đối tượng
        answer.questionId = questionId;
      });

      // Tạo đáp án cho câu hỏi
      await Answer.bulkCreate(answers, {
        transaction,
      });
      await transaction.commit();
      return question;
    } catch (error) {
      if (transaction) {
        await transaction.rollback(); // Rollback transaction nếu có lỗi
      }
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },
  getAll: async (page, size, search) => {
    try {
      const where = {};
      if (search) {
        where.question = { [Op.like]: `%${search}%` };
      }

      // Tính offset
      const offset = (page - 1) * size;

      const { count } = await Question.findAndCountAll({
        where,
        offset,
        limit: size,
      });

      const { rows } = await Question.findAndCountAll({
        where,
        offset,
        limit: size,
        attributes: ['id', 'question'],
        include: [
          {
            model: Answer,
            as: 'Answers',
            attributes: ['answer', 'value'],
          },
        ],
      });

      // Chuẩn bị dữ liệu phân trang
      const pagination = {
        total: count,
        page,
        size,
        data: rows,
      };

      return pagination;
    } catch (error) {
      throw error;
    }
  },
  getMBTIQuestionById: async (questionId) => {
    try {
      const question = await Question.findByPk(questionId, {
        attributes: ['id', 'question'],
        include: [
          {
            model: Answer,
            as: 'Answers',
            attributes: ['id', 'answer', 'value'],
          },
        ],
      });

      if (question instanceof Question) {
        return question.get();
      }

      return question;
    } catch (error) {
      throw error;
    }
  },
  updateQuestion: async (questionId, payload) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Update question
      const [numberOfAffectedRows] = await Question.update(
        { question: payload.question },
        {
          where: { id: questionId },
          transaction,
        },
      );

      // Kiểm tra số lượng dòng bị ảnh hưởng bởi câu lệnh update cho câu hỏi
      if (numberOfAffectedRows === 0) {
        await transaction.rollback();
        return false; // Trả về false nếu không có câu hỏi nào được cập nhật
      }

      // Update answers
      for (const answer of payload.answers) {
        const [numberOfAffectedRows] = await Answer.update(answer, {
          where: { id: answer.id },
          transaction,
        });

        if (numberOfAffectedRows === 0) {
          await transaction.rollback();
          return false; // Trả về false nếu có lỗi khi cập nhật một trong các câu trả lời
        }
      }

      await transaction.commit();
      return true; // Trả về true nếu tất cả cập nhật thành công
    } catch (error) {
      if (transaction) {
        await transaction.rollback(); // Rollback transaction nếu có lỗi
      }
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },

  deleteQuestion: async (questionId) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Destroy question
      const numberOfAffectedRows1 = await Question.destroy({
        where: { id: questionId },
      });

      // Kiểm tra số lượng dòng bị ảnh hưởng bởi câu lệnh update cho câu hỏi
      if (numberOfAffectedRows1 === 0) {
        await transaction.rollback();
        return false; // Trả về false nếu không có câu hỏi nào được cập nhật
      }

      // Destroy answers
      const numberOfAffectedRows2 = await Answer.destroy({
        where: { questionId: questionId },
      });

      if (numberOfAffectedRows2 === 0) {
        await transaction.rollback();
        return false; // Trả về false nếu có lỗi khi cập nhật một trong các câu trả lời
      }
      transaction.commit();
      return true;
    } catch (error) {
      if (transaction) {
        await transaction.rollback(); // Rollback transaction nếu có lỗi
      }
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },
  newDoTestMBTI: async (page, size) => {
    try {
      const questionGroupIdValues = [1, 2, 3, 4];
      const rowsPerGroup = 27;

      const question = await Question.findAll({
        limit: rowsPerGroup,
        attributes: ['question'],
        include: [
          {
            model: Answer,
            as: 'Answers',
            attributes: ['answer', 'value'],
          },
        ],
        where: {
          questionGroupId: {
            [Op.in]: questionGroupIdValues,
          },
        },
        // group: 'questionGroupId',
        // having: sequelize.literal(`COUNT(*) <= ${rowsPerGroup}`)
      });

      console.log('question', question);
      return question;
    } catch (error) {
      throw error;
    }
  },
};
