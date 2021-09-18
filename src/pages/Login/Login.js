import React, { useState } from 'react'
import { useFormik } from 'formik';
import { dangKyAction, dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { useDispatch, useSelector } from 'react-redux';
import "./Login.scss";
import * as Yup from 'yup';
import styled from 'styled-components';

export default function Login(props) {

    const dispatch = useDispatch()

    const [slideUp, setSlideUp] = useState(true);

    const [loginFail ,setLoginFail] = useState(false);

    const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer)


    const { errors } = useSelector((state) => state.QuanLyNguoiDungReducer);
    console.log('errorsScreen', errors)

    console.log('userLogin', userLogin)

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        onSubmit: values => {

            const action = dangNhapAction(values);

            dispatch(action);


            console.log('values', values);
        },
    });


    const formikRegister = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: "GP01",
            hoTen: ""
        },
        validationSchema: Yup.object().shape({
            hoTen: Yup.string().required('Không được bỏ trống!!!').matches('^[A-Za-z]+$', 'Vui lòng nhập họ tên phù hợp!!!'),
            taiKhoan: Yup.string().required('không được bỏ trống!!!'),
            email: Yup.string().required('không được bỏ trống!!!').matches('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$', 'không hợp lệ!!!'),
            matKhau: Yup.string().required('không được bỏ trống!!!').min(6, 'phải từ 6-32 ký tự!!!').max(32, 'phải từ 6 - 32 ký tự!!!'),
            soDt: Yup.string().required('không được bỏ trống!!!').min(10, 'Vui lòng nhập số điện thoại hợp lệ!!!').max(11, 'Vui lòng nhập số điện thoại hợp lệ!!!').matches('^[0-9]+$', 'Vui lòng nhập số điện thoại!!!'),
        }),
        onSubmit: values => {

            const action = dangKyAction(values);

            dispatch(action);


            console.log('values', values);
        },
    })


    let classLogin = 'slide-up';
    let classRegister = '';


    if (slideUp) {
        //login
        classRegister = 'slide-up';
        classLogin = '';
    } else {
        //register
        classRegister = '';
        classLogin = 'slide-up';
    }


    let classLoginFail = '';

    if(loginFail){
        classLoginFail = 'hidden';
    }else{
        classLoginFail = '';
    }



    return (

        <div className="flex justify-center items-center bg-black h-screen">
            <div className="form-structure">
                <div className={`signup ${classRegister}`}>
                    <h2 className="form-title" id="signup" onClick={(e) => {
                        setSlideUp(false);
                    }}><span>hoặc</span>Đăng Ký</h2>
                    <form onSubmit={formikRegister.handleSubmit}>
                        <div className="form-holder shadow-md">
                            <div className="user-box">
                                <input type="text" required name="hoTen" onChange={formikRegister.handleChange} onBlur={formikRegister.handleBlur} />
                                <label>Họ Tên{formikRegister.errors.hoTen && formikRegister.touched.hoTen ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikRegister.errors.hoTen} </span>) : null}</label>

                            </div>
                            <div className="user-box">
                                <input type="text" name="taiKhoan" onChange={formikRegister.handleChange} onBlur={formikRegister.handleBlur} />
                                <label>Tài Khoản{formikRegister.errors.taiKhoan && formikRegister.touched.taiKhoan ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikRegister.errors.taiKhoan} </span>) : null}</label>
                            </div>
                            <div className="user-box">
                                <input type="email" name="email" required onChange={formikRegister.handleChange} onBlur={formikRegister.handleBlur} />
                                <label>Email{formikRegister.errors.email && formikRegister.touched.email ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikRegister.errors.email} </span>) : null}</label>
                            </div>
                            <div className="user-box">
                                <input type="password" name="matKhau" onChange={formikRegister.handleChange} onBlur={formikRegister.handleBlur} />
                                <label>Mật Khẩu{formikRegister.errors.matKhau && formikRegister.touched.matKhau ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikRegister.errors.matKhau} </span>) : null}</label>
                            </div>
                            <div className="user-box">
                                <input type="text" name="soDt" onChange={formikRegister.handleChange} onBlur={formikRegister.handleBlur} />
                                <label>Số Điện Thoại{formikRegister.errors.soDt && formikRegister.touched.soDt ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikRegister.errors.soDt} </span>) : null}</label>
                            </div>
                            <div className="user-box">
                                <input type="text" name="maNhom" onChange={formikRegister.handleChange} onBlur={formikRegister.handleBlur} />
                                <label>Mã Nhóm (GP01)</label>
                            </div>
                        </div>
                        <button className="submit-btn">Sign up</button>
                    </form>
                </div>
                <div className={`login ${classLogin}`}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="center">
                            <h2 className="form-title" id="login" onClick={(e) => {
                                setSlideUp(true);
                            }}><span>hoặc</span>Đăng Nhập</h2>
                            <div className="form-holder shadow-md" style={{ borderRadius: '0px !important', padding: 10 }}>
                                <div className="user-box" >
                                    <input type="text" name="taiKhoan" onChange={formik.handleChange} />
                                    <label>Tài Khoản</label>
                                </div>
                                <div className="user-box mt-5">
                                    <input type="password" name="matKhau" onChange={formik.handleChange} />
                                    <label>Mật Khẩu</label>
                                </div>
                            </div>
                            <button className="submit-btn" onClick={() => {
                                if(errors){
                                    setLoginFail(true);
                                }
                            }}>Log in</button>
                        </div>

                        <div className={`${classLoginFail}`}>{errors ? (
                        <LoginFail >
                            <PopupLoginFail  className="text-center p-2">
                                <h1 className="text-2xl mt-5">Đăng nhập Thất Bại</h1>
                                <p style={{color: 'red', fontSize: 16}}>{errors}</p>
                                <p>Vui lòng đăng nhập lại để vào hệ thống.</p>
                                <div>
                                    <button type="button" className="bg-red-500 w-full p-3 text-white rounded-md" onClick={() =>{
                                        console.log('hello')
                                        setLoginFail(true)
                                    }}>Đóng</button>
                                </div>
                            </PopupLoginFail>
                        </LoginFail>) : ''}</div>
                    </form>
                </div>
            </div>
        </div>
    )
}



const LoginFail = styled.div`
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`


const PopupLoginFail = styled.div`
    background-color: #fff;
    min-height: 210px;
    width: 300px;
    color: #000;

`










