const Question = require('../models').Question;
const Answer = require('../models').Answer;
const QuestionGroup = require('../models').QuestionGroup;
const MBTI = require('../models').MBTI;
const TestHistory = require('../models').TestHistory;
const MajorMBTI = require('../models').MajorMBTI;
const Organization = require('../models').Organization;

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
  getAll: async (page, size, search, deleted) => {
    try {
      const where = {};
      if (search) {
        where.question = { [Op.like]: `%${search}%` };
      }

      if (deleted) {
        where.deletedAt = { [Op.not]: null };
      }

      // Tính offset
      const offset = (page - 1) * size;

      const { count } = await Question.findAndCountAll({
        where,
        paranoid: false,
        offset,
        limit: size,
      });

      const { rows } = await Question.findAndCountAll({
        where,
        paranoid: false,
        offset,
        limit: size,
        attributes: ['id', 'question', 'deletedAt'],
        include: [
          {
            model: Answer,
            as: 'Answers',
            attributes: ['answer', 'value'],
            paranoid: false,
          },
          {
            model: QuestionGroup,
            as: 'QuestionGroup',
            attributes: ['id', 'name', 'value'],
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
        attributes: ['id', 'question', 'deletedAt'],
        paranoid: false,
        include: [
          {
            model: Answer,
            as: 'Answers',
            attributes: ['id', 'answer', 'value'],
            paranoid: false,
          },
          {
            model: QuestionGroup,
            as: 'QuestionGroup',
            attributes: ['id', 'name', 'value'],
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

  restoreQuestion: async (questionId) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Destroy question
      const numberOfAffectedRows1 = await Question.restore({
        where: { id: questionId },
      });

      // Kiểm tra số lượng dòng bị ảnh hưởng bởi câu lệnh update cho câu hỏi
      if (numberOfAffectedRows1 === 0) {
        await transaction.rollback();
        return false; // Trả về false nếu không có câu hỏi nào được cập nhật
      }

      // Destroy answers
      const numberOfAffectedRows2 = await Answer.restore({
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

  getAllQuestionGroup: async () => {
    try {
      const listQuestionGroup = await QuestionGroup.findAll({
        attributes: ['id', 'name', 'value', 'description', 'image'],
      });

      return listQuestionGroup;
    } catch (error) {
      throw error;
    }
  },

  getQuestionGroupById: async (question_group_id) => {
    try {
      const questionGroup = await QuestionGroup.findByPk(question_group_id, {
        attributes: ['id', 'name', 'value', 'description', 'image'],
      });

      return questionGroup;
    } catch (error) {
      throw error;
    }
  },

  newDoTestMBTI: async (page, size) => {
    try {
      const questionGroupIdValues = [1, 2, 3, 4];
      // const rowsPerGroup = 27;

      const question = await Question.findAll({
        // limit: rowsPerGroup,
        attributes: ['question'],
        include: [
          {
            model: Answer,
            as: 'Answers',
            attributes: ['answer', 'value'],
          },
        ],
        // where: {
        //   questionGroupId: {
        //     [Op.in]: questionGroupIdValues,
        //   },
        // },
        // group: 'questionGroupId',
        // having: sequelize.literal(`COUNT(*) <= ${rowsPerGroup}`)
      });

      // console.log('question', question);
      return question;
    } catch (error) {
      throw error;
    }
  },

  getAllPersonalityGroups: async () => {
    try {
      const mbti = await MBTI.findAll({
        attributes: ['id', 'name', 'label', 'description', 'image'],
      });

      return mbti;
    } catch (error) {
      throw error;
    }
  },

  // Do test MBTI
  createTestHistory: async (userId, mbtiId) => {
    try {
      // Tạo mới câu hỏi
      const testHistoryPayload = { userId, mbtiId };
      const testHistory = await TestHistory.create(testHistoryPayload);

      return testHistory;
    } catch (error) {
      throw error; // Sau đó ném lỗi để xử lý ở phần gọi hàm
    }
  },
  getAllTestHistory: async (userId, page, size) => {
    try {
      // Tính offset
      const offset = (page - 1) * size;

      const { count, rows } = await TestHistory.findAndCountAll({
        where: { userId },
        offset,
        limit: size,
        attributes: ['id', 'createdAt'],
        include: [
          {
            model: MBTI,
            attributes: ['id', 'name', 'description'],
            include: [
              {
                model: MajorMBTI,
                attributes: ['id', 'majorName', 'link'],
                include: [
                  {
                    model: Organization,
                    attributes: ['id', 'name'],
                  },
                ],
              },
            ],
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
  getTestHistoryById: async (userId, testHistoryId) => {
    try {
      const testHistory = await TestHistory.findByPk(testHistoryId, {
        where: { userId },
        attributes: ['id', 'createdAt'],
        include: [
          {
            model: MBTI,
            attributes: ['id', 'name', 'description'],
            include: [
              {
                model: MajorMBTI,
                attributes: ['id', 'majorName', 'link'],
                include: [
                  {
                    model: Organization,
                    attributes: ['id', 'name'],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (testHistory instanceof TestHistory) {
        return testHistory.get();
      }

      return testHistory;
    } catch (error) {
      throw error;
    }
  },

  getMajorMBTIById: async (mbtiId) => {
    try {
      const major_mbti = await MBTI.findByPk(mbtiId, {
        attributes: ['id', 'name', 'description', 'image'],
        include: [
          {
            model: MajorMBTI,
            attributes: ['id', 'majorName', 'link'],
            include: [
              {
                model: Organization,
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      });

      if (major_mbti instanceof MBTI) {
        return major_mbti.get();
      }

      return major_mbti;
    } catch (error) {
      throw error;
    }
  },
};
