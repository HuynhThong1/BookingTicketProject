import React, { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
  Button,
  Image, 
} from 'antd';
import { FormikConsumer, useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../Util/setting';
import { Row, Col, Divider  } from 'antd';
import noImage from '../../../../Images/NoImage.png';


const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('');
   const dispatch = useDispatch();

  const formik = useFormik({
      initialValues: {
        tenPhim: '',
        trailer: '',
        moTa: '',
        ngayKhoiChieu:'',
        dangChieu: false,
        sapChieu: false,
        hot: false,
        danhGia: 0,
        maNhom: GROUPID,
        hinhAnh: {},
      },
      onSubmit: (values) =>{

        values.maNhom = GROUPID;
        let formData = new FormData();
        for (let key in values) {
            if(key!=='hinhAnh')
            {
                formData.append(key, values[key])
            }else {
                formData.append('File', values.hinhAnh, values.hinhAnh.name)
            }
        }
        console.log(formData.get('maNhom'))
        dispatch(themPhimUploadHinhAction(formData));
        console.log('values', values)
      }
  })
  
  const handleChangeSwitch = (name) => {
    return (value) => {
        formik.setFieldValue(name , value)
    }
  };
  const handleChangeFile = async (event) => {
    let file = event.target.files[0];
    if (file) {
        if(file.type === "image/jpeg" || file.type === "image/jpg" ||file.type === "image/png") {
            await formik.setFieldValue('hinhAnh',file)
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                // console.log(e.target.result);
                setImgSrc(e.target.result);
            }
           
    }else {
        return;
    }
    
}
  }
  const handleChangeInputNumber = (name) => {
    return (value) => {
        formik.setFieldValue(name , value)
    }
  };
  const handleChangeDatePicker = (value) => {
      formik.setFieldValue('ngayKhoiChieu',moment(value).format("DD/MM/YYYY") )
    };
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
          <Divider orientation="left">Thêm mới phim</Divider>
        </Col>
      </Row>
      <Row>
        <Col xs={{span: 24, order: 3}} xl={{span: 6, order: 1}} >
          { imgSrc && (
            <Image  style={{width:'100%', height: 'auto'}} src={imgSrc} alt="..." /> 
            )
          }
            { !imgSrc && (
            <Image  style={{width:'100%', height: 'auto'}} src={noImage} alt="..." /> 
          )
          }
        </Col>
        <Col xs={{span: 24, order: 2}} xl={{span: 18, order: 2}} >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim" onChange={formik.handleChange}>
          <Input name="tenPhim"/>
        </Form.Item>
        <Form.Item label="Trailer"  onChange={formik.handleChange}>
          <Input name="trailer"/>
        </Form.Item>
        <Form.Item label="Mô tả"  onChange={formik.handleChange}>
          <Input name="moTa"/>
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker}/>
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch name="dangChieu" onChange={handleChangeSwitch('dangChieu')} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
        <Switch  name="sapChieu" onChange={handleChangeSwitch('sapChieu')} />        </Form.Item>
        <Form.Item label="Hot">
        <Switch  name="hot" onChange={handleChangeSwitch('hot')} />        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10}/>
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg, image/jpg,image/png"/>
        </Form.Item>
        </Col>
        <Col xs={{span: 24, order: 5}} xl={{span: 6, order: 4}} >
      
        </Col>
        <Col xs={{span: 24, order: 6}} xl={{span: 18, order: 5}} >
        <Form.Item label="Tác vụ">
          <Button type="primary" danger htmlType="submit">
          Thêm phim
          </Button>
        </Form.Item>
        </Col>
      </Row>
      </Form>
    </>
  );
};

export default AddNew;
