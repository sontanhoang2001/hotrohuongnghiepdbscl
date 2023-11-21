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
  getMbtiQuestion,
  getMbtiQuestionGroup,
  setParams,
  updateMbti,
} from '../../../redux/mbtiSlice';
import React from 'react';
import TextArea from 'antd/es/input/TextArea';
import mbtiApi from '../../../api/mbtiApi';
import Search from 'antd/es/input/Search';
import {
  createFaqs,
  deleteFaqs,
  getAllFAQS,
  restoreFaqs,
  setFaqsParams,
  updateFaqs,
} from '../../../redux/faqsSlice';
import faqsApi from '../../../api/faqsApi';

const { Title } = Typography;

function Faqs({ organizationId }) {
  //gọi redux state
  const dispatch = useDispatch();

  const { faqs,size,page,total,pending,faqsParams } = useSelector((state) => state.faqs);
  //form
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const formRef = React.useRef(null);
  const handleSubmitForm = (values) => {
    formRef.current
      .validateFields()
      .then((values) => {
        let formData = { ...values, organizationId: organizationId };
        if (!isEditing) {
          //create
          dispatch(createFaqs(formData));
        } else {
          //update
          dispatch(updateFaqs(formData));
        }
        dispatch(getAllFAQS({ organizationId }));
      })
      .catch((errorInfo) => {
        console.log('Form validation failed:', errorInfo);
      });
  };

  //editing
  const [isEditing, setIsEditing] = useState(false);
  const [processId, setProcessId] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleEdit = (id) => {
    setProcessId(id);
    faqsApi
      .getById({ id, organizationId })
      .then((res) => {
        setIsEditing(true);
        setIsOpenModal(true);

        setTimeout(() => {
          const question = res.data.data;
          formRef.current?.resetFields();
          formRef.current?.setFieldsValue({
            ...question,
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
    dispatch(deleteFaqs({ id, organizationId })).then(() => {
      dispatch(getAllFAQS({ organizationId }));
    });
  };
  //restore
  const handleRestore = (id) => {
    dispatch(restoreFaqs({ id, organizationId })).then(() => {
      dispatch(getAllFAQS({ organizationId }));
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
        title: 'Trả lời',
        dataIndex: 'answers',
        key: 'answers',
        render: (_, record) => <div className="author-info">{record.answer}</div>,
      },

      {
        key: 'action',
        fixed: 'right',
        dataIndex: 'action',
        render: (_, record) => (
          <div className="author-info">
            <Button type="text" onClick={() => handleEdit(record.id)}>
              <EditOutlined style={{ color: 'green' }} />
            </Button>
            {record.deletedAt === null && (
              <Popconfirm
                placement="leftTop"
                title="Xác nhận xóa"
                okText="Xóa"
                onConfirm={() => handleDelete(record.id)}
                cancelText="Hủy"
              >
                <Button danger>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            )}
            {record.deletedAt !== null && (
              <Popconfirm
                placement="leftTop"
                title="Xác nhận khôi phục"
                okText="Khôi phục"
                onConfirm={() => handleRestore(record.id)}
                cancelText="Hủy"
              >
                <Button danger>
                  <UndoOutlined />
                </Button>
              </Popconfirm>
            )}
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleDelete, handleEdit, faqs],
  );

  //Lấy danh sách nhóm câu hỏi
  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllFAQS({ organizationId }));
  }, [dispatch, organizationId,faqsParams]);

  //hàm phan trang
  const handlePageChange = (page, pageSize) => {
    dispatch(setFaqsParams({ page: page, size: pageSize }));
  };

  //tìm kiếm
  const onSearch = (value, _e, info) => {
    dispatch(setFaqsParams({ search: value, page: 1 }));
  };

  return (
    <React.Fragment>
      {/* Data list */}
      <div className="tabled">
        <Row gutter={[18, 20]}>
          <Col span={8} style={{ display: 'flex', justifyContent: 'start' }}>
            <Button
              style={{ padding: '0 1rem' }}
              onClick={() => {
                formRef.current?.resetFields();
                setIsEditing(false);
                setIsOpenModal(true);
              }}
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
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách câu hỏi thường gặp"
            >
              <div className="table-responsive">
                <Table
                  bordered={true}
                  columns={columns}
                  loading={pending}
                  dataSource={faqs}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <Pagination
                current={page}
                pageSize={size}
                total={total}
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
        confirmLoading={pending}
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
        <Card style={{ margin: 0, padding: 0 }} loading={pending}>
          <Form wrapperCol={{ span: 20 }} labelCol={{ span: 4 }} ref={formRef}>
            <Form.Item name="id">
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="Câu hỏi"
              name="question"
              rules={[{ required: true, message: 'Nhập câu hỏi!' }]}
            >
              <TextArea placeholder="Câu hỏi" autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
            <Form.Item
              label="Câu trả lời"
              name="answer"
              rules={[{ required: true, message: 'Nhập câu trả lời!' }]}
            >
              <TextArea placeholder="Câu trả lời" autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </React.Fragment>
  );
}

export default Faqs;
