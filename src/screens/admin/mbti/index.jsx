import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Typography,
  Pagination,
  List,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  notification,
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  CaretRightOutlined,
  MinusCircleOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
  UndoOutlined,
} from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import {
  addNewMbti,
  deleteMbti,
  getMbtiQuestion,
  getMbtiQuestionGroup,
  restoreMbti,
  setParams,
  updateMbti,
} from '../../../redux/mbtiSlice';
import React from 'react';
import TextArea from 'antd/es/input/TextArea';
import mbtiApi from '../../../api/mbtiApi';
import Search from 'antd/es/input/Search';

const { Title } = Typography;

function Mbti() {
  //form
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const formRef = React.useRef(null);
  const handleSubmitForm = (values) => {
    formRef.current
      .validateFields()
      .then((values) => {
        if (!isEditing) {
          //create
          dispatch(addNewMbti(values));
        } else {
          //update
          dispatch(updateMbti(values)).then(() => {
            dispatch(getMbtiQuestion());
            setIsOpenModal(false);
          });
        }
      })
      .catch((errorInfo) => {
        console.log('Form validation failed:', errorInfo);
      });
  };

  //editing
  const [isEditing, setIsEditing] = useState(false);
  const [processId, setProcessId] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handelCreate = () => {
    formRef.current?.resetFields();
    setIsEditing(false);
    setIsOpenModal(true);
  };
  const handleEdit = (id) => {
    setProcessId(id);
    mbtiApi
      .getQuestionById(id)
      .then((res) => {
        setIsEditing(true);
        setIsOpenModal(true);
        // const question = res.data.data;
        // formRef.current?.resetFields();
        // formRef.current?.setFieldsValue({
        //   ...question,
        //   answers: question.Answers,
        //   question_group_id: question.QuestionGroup.id,
        // });
        setTimeout(() => {
          const question = res.data.data;
          formRef.current?.resetFields();
          formRef.current?.setFieldsValue({
            ...question,
            answers: question.Answers,
            question_group_id: question.QuestionGroup.id,
          });
        }, 200);
        setProcessId(0);
      })
      .catch((error) => {
        console.log(error);
        setProcessId(0);
      });
  };
  //hàm bắt event delete
  const handleDelete = (id) => {
    dispatch(deleteMbti(id)).then(() => {
      dispatch(getMbtiQuestion());
    });
  };
  //hàm bắt event delete
  const handleRestore = (id) => {
    dispatch(restoreMbti(id)).then(() => {
      dispatch(getMbtiQuestion());
    });
  };
  //định dạng cột hiển thị
  const columns = useMemo(
    () => [
      {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        width: 50,
      },
      {
        title: 'Câu hỏi',
        dataIndex: 'question',
        key: 'question',
        width: 300,
        render: (_, record) => (
          <div className="author-info">
            <Title level={5}>{record.question}</Title>
          </div>
        ),
      },
      {
        title: 'Đáp án',
        dataIndex: 'answers',
        key: 'answers',
        render: (_, mbti) => (
          <div className="author-info">
            <List
              size="small"
              bordered
              dataSource={mbti.Answers}
              renderItem={(item, idx) => (
                <List.Item>
                  {idx + 1}. {item.answer}
                </List.Item>
              )}
            />
          </div>
        ),
      },
      {
        title: 'Giá trị',
        dataIndex: 'value',
        key: 'value',
        render: (_, mbti) => (
          <div className="author-info">
            <List
              size="small"
              bordered
              dataSource={mbti.Answers}
              renderItem={(item, idx) => (
                <List.Item>
                  <CaretRightOutlined /> {item.value}
                </List.Item>
              )}
            />
          </div>
        ),
      },
      {
        key: 'action',
        fixed: 'right',
        dataIndex: 'action',
        render: (_, mbti) => (
          <div className="author-info">
            <Button type="text" loading={processId === mbti.id} onClick={() => handleEdit(mbti.id)}>
              <EditOutlined style={{ color: 'green' }} />
            </Button>
            {mbti.deletedAt === null && (
              <Popconfirm
                placement="leftTop"
                title="Xác nhận xóa"
                okText="Xóa"
                onConfirm={() => handleDelete(mbti.id)}
                cancelText="Hủy"
              >
                <Button danger>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            )}
            {mbti.deletedAt !== null && (
              <Popconfirm
                placement="leftTop"
                title="Xác nhận khôi phục"
                okText="Khôi phục"
                onConfirm={() => handleRestore(mbti.id)}
                cancelText="Hủy"
              >
                <Button success>
                  <UndoOutlined />
                </Button>
              </Popconfirm>
            )}
          </div>
        ),
      },
    ],
    [],
  );

  //gọi redux state
  const dispatch = useDispatch();
  const {
    data: mbtiData,
    pending: pendingState,
    mbtiParams,
    metaData,
    questionGroups,
  } = useSelector((state) => state.mbti);

  //Lấy danh sách nhóm câu hỏi
  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getMbtiQuestionGroup());
  }, [dispatch]);

  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getMbtiQuestion());
  }, [dispatch, mbtiParams]);

  //hàm phan trang
  const handlePageChange = (page, pageSize) => {
    dispatch(setParams({ page: page, size: pageSize }));
  };

  //tìm kiếm
  const onSearch = (value, _e, info) => {
    dispatch(setParams({ search: value, page: 1 }));
  };

  return (
    <React.Fragment>
      {/* Data list */}
      <div className="tabled">
        <Row gutter={[18, 20]}>
          <Col span={8} style={{ display: 'flex', justifyContent: 'start' }}>
            <Button
              style={{ padding: '0 1rem' }}
              onClick={() => handelCreate()}
              type="primary"
              size="large"
            >
              <PlusCircleFilled />
              &nbsp; Tạo câu hỏi
            </Button>
          </Col>
          <Col span={16}>
            <Search placeholder="Tìm kiếm câu hỏi" onSearch={onSearch} enterButton="Tìm" />
          </Col>
          <Col xs="24" xl={24}>
            <Card bordered={false} className="criclebox tablespace mb-24" title="Danh sách câu hỏi">
              <div className="table-responsive">
                <Table
                  bordered={true}
                  columns={columns}
                  loading={pendingState}
                  dataSource={mbtiData?.data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <Pagination
                current={metaData.page}
                pageSize={metaData.size}
                total={metaData.total}
                onChange={handlePageChange}
                showQuickJumper
                showSizeChanger
                onShowSizeChange={handlePageChange}
                style={{ marginTop: 20, marginBottom: 20 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      {/* Creating modal */}
      <Modal
        confirmLoading={pendingState}
        title={
          <p style={{ textAlign: 'center', margin: 0 }}>
            {' '}
            {(isEditing && 'Chỉnh sửa câu hỏi') || 'Thêm câu hỏi'}
          </p>
        }
        okText="Lưu"
        centered
        width={1000}
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
        open={isOpenModal}
        onOk={handleSubmitForm}
        onCancel={() => setIsOpenModal(false)}
      >
        <Card style={{ margin: 0, padding: 0 }} loading={pendingState}>
          <Form wrapperCol={{ span: 20 }} labelCol={{ span: 4 }} ref={formRef}>
            <Form.Item name="id">
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              name="question_group_id"
              label="Nhóm câu hỏi"
              rules={[{ required: true, message: 'Vui lòng chọn điểm điểm dừng' }]}
            >
              <Select
                size="large"
                options={questionGroups?.map((group) => ({
                  value: group.id,
                  label: `${group.value} - ${group.name}`,
                }))}
                placeholder="Chọn nhóm câu hỏi"
              />
            </Form.Item>
            <Form.Item
              label="Câu hỏi"
              name="question"
              rules={[{ required: true, message: 'Nhập câu hỏi!' }]}
            >
              <Input placeholder="Câu hỏi" />
            </Form.Item>

            <Form.List name="answers">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Card
                      title={'Câu trả lời ' + parseInt(index + 1)}
                      extra={!isEditing && <MinusCircleOutlined onClick={() => remove(name)} />}
                      key={key}
                      className="mb-3"
                    >
                      <Form.Item
                        wrapperCol={{ span: 16 }}
                        labelCol={{ span: 8 }}
                        {...restField}
                        name={[name, 'answer']}
                        label="Câu trả lời"
                        rules={[{ required: true, message: 'Vui lòng nhập câu trả lời' }]}
                      >
                        <Input size="large" placeholder="Câu trả lời" />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{ span: 16 }}
                        labelCol={{ span: 8 }}
                        {...restField}
                        name={[name, 'value']}
                        label="Giá trị"
                        rules={[
                          { required: true, message: 'Vui lòng nhập giá trị' },
                          {
                            max: 1,
                            message: 'giá trị câu trả lời không quá 1 ký tự',
                          },
                          {
                            pattern: /^[EISNTJP]$/,
                            message: 'Giá trị phải là 1 ký tự thuộc E,I,S,N,T,J,P',
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Câu trả lời" />
                      </Form.Item>
                    </Card>
                  ))}
                  {!isEditing && (
                    <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusCircleOutlined />}
                      >
                        Thêm câu trả lời
                      </Button>
                    </Form.Item>
                  )}
                </>
              )}
            </Form.List>
          </Form>
        </Card>
      </Modal>
    </React.Fragment>
  );
}

export default Mbti;
