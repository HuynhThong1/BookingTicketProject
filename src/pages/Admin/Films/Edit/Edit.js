import React, { useState, useEffect, memo } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
  Image,
  Button,
  Popover,
} from 'antd';
import { FormikConsumer, useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { capNhatPhimUploadAction, layThongTinPhimAction, themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../Util/setting';
import { Row, Col, Divider  } from 'antd';
import noImage from '../../../../Images/NoImage.png';

const Edit = memo((props) => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('');
   const dispatch = useDispatch();
   const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer)
   console.log('thongTinPhim', thongTinPhim)
  useEffect(() => {
     let {id} = props.match.params;
     dispatch(layThongTinPhimAction(id))
  }, [])

  const formik = useFormik({
      enableReinitialize:true,
      initialValues: {
        maPhim: thongTinPhim.maPhim,
        tenPhim: thongTinPhim.tenPhim,
        trailer: thongTinPhim.trailer,
        moTa: thongTinPhim.moTa,
        ngayKhoiChieu:thongTinPhim.ngayKhoiChieu,
        dangChieu: thongTinPhim.dangChieu,
        sapChieu: thongTinPhim.sapChieu,
        hot: thongTinPhim.hot,
        danhGia: thongTinPhim.danhGia,
        maNhom: GROUPID,
        hinhAnh: null,
      },
      onSubmit: (values) =>{
  
        values.maNhom = GROUPID;
        let formData = new FormData();
        for (let key in values) {
            if(key!=='hinhAnh')
            {
                formData.append(key, values[key])
            }else {
                if(values.hinhAnh !== null)
                {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }
        }
        dispatch(capNhatPhimUploadAction(formData));
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
        formik.setFieldValue('ngayKhoiChieu',moment(value, 'DD/MM/YYYY'))
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
          <Divider orientation="left">C???p nh???t phim</Divider>
        </Col>
      </Row>
      <Row>
      <Col xs={{span: 24, order: 3}} xl={{span: 6, order: 1}} >
             <Image style={{width:'100%', height: 'auto'}} src={imgSrc==='' ? thongTinPhim.hinhAnh : imgSrc} alt="..." /> 
        </Col>
        <Col xs={{span: 24, order: 2}} xl={{span: 18, order: 2}} >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="T??n phim" onChange={formik.handleChange}>
          <Input name="tenPhim"  value={formik.values.tenPhim}/>
        </Form.Item>
        <Form.Item label="Trailer"  onChange={formik.handleChange}>
          <Input name="trailer"  value={formik.values.trailer}/>
        </Form.Item>
        <Form.Item label="M?? t???"  onChange={formik.handleChange}>
          <Input name="moTa"  value={formik.values.moTa}/>
        </Form.Item>
        <Form.Item label="Ng??y kh???i chi???u">
          <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
        </Form.Item>
        <Form.Item label="??ang chi???u">
          <Switch name="dangChieu" onChange={handleChangeSwitch('dangChieu')}  checked={formik.values.dangChieu} />
        </Form.Item>
        <Form.Item label="S???p chi???u">
        <Switch  name="sapChieu" onChange={handleChangeSwitch('sapChieu')}  checked={formik.values.sapChieu} />        </Form.Item>
        <Form.Item label="Hot">
        <Switch  name="hot" onChange={handleChangeSwitch('hot')}  checked={formik.values.hot}/>        </Form.Item>
        <Form.Item label="S??? sao">
          <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10}  value={formik.values.danhGia}/>
        </Form.Item>
        <Form.Item label="H??nh ???nh">
          <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg, image/jpg,image/png"/>
        </Form.Item>
          </Col>
        <Col xs={{span: 24, order: 5}} xl={{span: 6, order: 4}} >
      
        </Col>
        <Col xs={{span: 24, order: 6}} xl={{span: 18, order: 5}} >
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
