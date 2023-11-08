import { useState, useEffect, useRef } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
// import { selectLoading, selectSuccess, selectError, selectDataPosts } from '../../redux/postSlice';

import {
  selectIsOpen,
  openModal,
  closeModal,
  selectId,
  selectActionName,
  selectActionSubmit,
  updateForm,
} from '../../redux/modalSlice';
import { Button, Form, Input, Modal } from 'antd';
import Title from 'antd/es/skeleton/Title';

function Modals(args) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const dispatch = useDispatch();
  const actionName = useSelector(selectActionName);
  const isOpenModal = useSelector(openModal);

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(closeModal());
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    dispatch(closeModal());
  };

  const formBody = (
    <>
      <div>
        <Form.Item label="Normal label" name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="A super long label text" name="password" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </div>
    </>
  );

  if (actionName === 'create') {
    return (
      <>
        <Modal
          title="Thêm mới"
          open={isOpenModal}
          onOk={handleOk}
          okText="Thêm"
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          cancelText="Đóng"
        >
          <Form
            name="wrap"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
          >
            {formBody}
          </Form>
        </Modal>
      </>
    );
  } else if (actionName === 'edit') {
    return (
      <>
        <Modal
          title="Chỉnh sửa"
          open={isOpenModal}
          onOk={handleOk}
          okText="Cập nhật"
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          cancelText="Đóng"
        >
          <Form
            name="wrap"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
          >
            {formBody}
          </Form>
        </Modal>
      </>
    );
  } else if (actionName === 'delete') {
    return (
      <>
        <Modal
          title="Bạn có muốn xóa trường này ?"
          open={isOpenModal}
          onOk={handleOk}
          okText="Xóa"
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          cancelText="Đóng"
        >
          <Form
            name="wrap"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
          >
          sjfjsdhf
          </Form>
        </Modal>
      </>
    );
  }
}

export default Modals;
