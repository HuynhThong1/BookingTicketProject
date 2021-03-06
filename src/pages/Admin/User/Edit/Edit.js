import React, { useState, useEffect, memo } from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
  Button,
} from 'antd';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { GROUPID } from '../../../../Util/setting';
import { capNhatNguoiDungAction, layThongTinNguoiDungTheoTaiKhoanAction, layThongTinTaiKhoanAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { Row, Col, Divider  } from 'antd';
const { Option } = Select;


const Edit = memo((props) => {
  const [componentSize, setComponentSize] = useState('default');
   const dispatch = useDispatch();
   const { thongTinNguoiDungTheoTaiKhoan } = useSelector(state => state.QuanLyNguoiDungReducer)

  useEffect(() => {
     let {taiKhoan} = props.match.params;
    dispatch(layThongTinNguoiDungTheoTaiKhoanAction(taiKhoan))
  }, [])

  const formik = useFormik({
      enableReinitialize:true,
      initialValues: {
        taiKhoan: thongTinNguoiDungTheoTaiKhoan.taiKhoan,
        hoTen: thongTinNguoiDungTheoTaiKhoan.hoTen,
        email: thongTinNguoiDungTheoTaiKhoan.email,
        soDt: thongTinNguoiDungTheoTaiKhoan.soDT,
        matKhau:thongTinNguoiDungTheoTaiKhoan.matKhau,
        maLoaiNguoiDung: thongTinNguoiDungTheoTaiKhoan.maLoaiNguoiDung,
      },
      onSubmit: (values) =>{
  
        values.maNhom = GROUPID;
  
        dispatch(capNhatNguoiDungAction(values));
      }
  })




  const handleChangeLoaiUser = async (values) => {
    formik.setFieldValue('maLoaiNguoiDung',values)
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

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
      <Row>
        <Col xs={{span: 24}} xl={{span: 24}}>
          <Divider orientation="left">C???p nh???t th??ng tin t??i kho???n</Divider>
        </Col>
      </Row>
      <Row>
      <Col xs={{span: 24}} xl={{span: 12}} >
      <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="T??i Kho???n" onChange={formik.handleChange}>
          <Input name="taiKhoan"  value={formik.values.taiKhoan}/>
        </Form.Item>
        <Form.Item label="M???t Kh???u"  onChange={formik.handleChange}>
          <Input name="matKhau"  value={formik.values.matKhau}/>
        </Form.Item>
        <Form.Item label="H??? T??n"  onChange={formik.handleChange}>
          <Input name="hoTen"  value={formik.values.hoTen}/>
        </Form.Item>
        <Form.Item label="S??? ??T"  onChange={formik.handleChange}>
          <Input name="soDt"  value={formik.values.soDt}/>
        </Form.Item>
        <Form.Item label="Email"  onChange={formik.handleChange}>
          <Input name="email"  value={formik.values.email}/>
        </Form.Item>
        <Form.Item label="Lo???i User"  onChange={formik.handleChange}>
          <Select  onChange={handleChangeLoaiUser}  defaultValue={formik.values.maLoaiNguoiDung}>
            <Option value="KhachHang">Kh??ch h??ng</Option>
            <Option value="QuanTri">Qu???n tr???</Option>
          </Select>
        </Form.Item>
      
        <Form.Item label="T??c v???">
        <Button type="primary" htmlType="submit">
         C???p nh???t
          </Button>
        </Form.Item>
        </Col>
        </Row>
       
      </Form>
    </>
  );
});

export default Edit;
