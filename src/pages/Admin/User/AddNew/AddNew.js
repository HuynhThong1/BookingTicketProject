import React, { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Button,
  Select,
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../Util/setting';
import { themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';


const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
   const dispatch = useDispatch();

  const formik = useFormik({
      initialValues: {
        taiKhoan: '',
        matKhau: '',
        email: '',
        soDt: '',
        maNhom: GROUPID,
        maLoaiNguoiDung: '',
        hoTen: '',
      },
      onSubmit: async (values, { resetForm }) =>{
        console.log('values', values)
        values.maNhom = GROUPID;
        await dispatch(themNguoiDungAction(values));
        resetForm();
      }
  })
  

  const handleChangeLoaiUser = async (values) => {
    formik.setFieldValue('maLoaiNguoiDung',values)
  }
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const convertSelectUser = () => {
    return [{label: 'Khách hàng', value: "KhachHang"}, {label: 'Quản Trị', value: "QuanTri"}]
}
  return (
    <>
      <Form
      onSubmitCapture= {formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3 className="text-3xl">Thêm mới người dùng</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tài Khoản" onChange={formik.handleChange}  rules={[{ required: true, message: 'Hãy nhập tài khoản!' }]}>
          <Input name="taiKhoan"  value={formik.values.taiKhoan}/>
        </Form.Item>
        <Form.Item label="Mật Khẩu"  onChange={formik.handleChange}>
          <Input.Password name="matKhau"  value={formik.values.matKhau}/>
        </Form.Item>
        <Form.Item label="Họ Tên"  onChange={formik.handleChange}>
          <Input name="hoTen"  value={formik.values.hoTen}/>
        </Form.Item>
        <Form.Item label="Số ĐT"  onChange={formik.handleChange}>
          <Input name="soDt"  value={formik.values.soDt}/>
        </Form.Item>
        <Form.Item label="Email"  onChange={formik.handleChange}>
          <Input name="email"  value={formik.values.email}/>
        </Form.Item>
        <Form.Item label="Loại User"  onChange={formik.handleChange}>
          <Select options={convertSelectUser()} onChange={handleChangeLoaiUser} placeholder="Chọn loại người dùng!" />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <Button type="primary" danger htmlType="submit">
          Thêm người dùng
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNew;
