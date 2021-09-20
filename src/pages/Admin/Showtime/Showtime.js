import React, {useState, useEffect} from 'react'
import { Form, InputNumber, Button, DatePicker, Image, Select } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { Row, Col, Divider  } from 'antd';

export default function Showtime(props) {
     const formik = useFormik({
         initialValues: {
             maPhim: props.match.params.id,
             ngayChieuGioChieu:'',
             maRap: '',
             giaVe:'',
         },
         onSubmit : async (values) =>{
             console.log('values' ,values)
             try {
                let result = await quanLyDatVeService.taoLichChieu(values)
                alert(result.data.content);
    
            }catch (error) {
                console.log('errors', error.response?.data);
            }
         }
     })
    const [state, setState] = useState({
        heThongRapChieu:[],
        cumRapChieu:[]
    })

    useEffect(async() => {
            try{
                let result = await quanLyRapService.layDanhSachHeThongRap();
                setState({
                    ...state,
                    heThongRapChieu: result.data.content
                });
               }catch(errors){
                console.log('errors', errors.response?.data);
               }
    }, [])
    const handleChangeHeThongRap = async (values) => {
        try {
            let result = await quanLyRapService.layThongTinCumRap(values)
            setState({
                ...state,
                cumRapChieu: result.data.content
            })

        }catch (error) {
            console.log('errors', error.response?.data);
        }
    }
    console.log('state', state)
    const handleChangeCumRap = async (values) => {
      formik.setFieldValue('maRap',values)
    }
    const onOK = (values) => {
        formik.setFieldValue('ngayChieuGioChieu',moment(values).format('DD/MM/YYYY hh:mm:ss'))
    }
    const onChangeDate = (values) => {
        formik.setFieldValue('ngayChieuGioChieu',moment(values).format('DD/MM/YYYY hh:mm:ss'))
    }
    const onChangeInputNumber = (values) => {
        formik.setFieldValue('giaVe', values);
    }
    const convertSelectHTR = () => {
        return  state.heThongRapChieu?.map((htr,index)=>{
            return {label:htr.tenHeThongRap, value: htr.maHeThongRap}
        })
    }
    const convertSelectCR = () => {
        return  state.cumRapChieu?.map((cRap,index)=>{
            return {label:cRap.tenCumRap, value: cRap.maCumRap}
        })
    }
    let film = {};
    if(localStorage.getItem('filmParams')){
        film = JSON.parse(localStorage.getItem('filmParams'));
    }
    return (
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onSubmitCapture={formik.handleSubmit}
      >
        <Row>
            <Col xs={{span: 24}} xl={{span: 24}}>
            <Divider orientation="left">Tạo lịch chiếu - {props.match.params.tenphim} </Divider>
            </Col>
        </Row>  
        <Row>
            <Col xs={{span: 24}} xl={{span: 6}} >
                <Image src={film.hinhAnh} alt="..." style={{width: '100%', height:'auto'}}/>
            </Col>
            <Col xs={{span: 24}} xl={{span: 12}} >
                <Form.Item label="Hệ thống rạp">
                <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
            </Form.Item>
            <Form.Item label="Cụm rạp">
                <Select options={convertSelectCR()} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
            </Form.Item>
            <Form.Item label="Ngày chiếu giờ chiếu">
                <DatePicker format='DD/MM/YYYY/ hh:mm:ss' showTime onChange={onChangeDate} onOk={onOK}  />
            </Form.Item>
            <Form.Item label="Giá vé">
                <InputNumber min={75000} max={150000} onChange={onChangeInputNumber}  />
            </Form.Item>
            <Form.Item label="Tác vụ">
                <Button htmlType="submit" >Tạo lịch Chiếu</Button>,
            </Form.Item>
            </Col>
        </Row>
    </Form>
    )
}
