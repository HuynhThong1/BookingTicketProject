import React, { useState } from 'react'
import { useFormik } from 'formik';
import { capNhatNguoiDungAction, dangKyAction, dangNhapAction, themNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { useDispatch, useSelector } from 'react-redux';
import "./Login.scss";
import * as Yup from 'yup';
import { GROUPID } from '../../Util/setting';
import bg from '../../assets/footer-bg.jpg';

export default function Login(props) {

    const dispatch = useDispatch()

    const [slideUp, setSlideUp] = useState(true);

    const [loginFail, setLoginFail] = useState(false);

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
            maNhom: GROUPID,
            maLoaiNguoiDung: 'KhachHang',
            hoTen: ""
        },

        //.matches('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$', 'không hợp lệ!!!')
        validationSchema: Yup.object().shape({
            hoTen: Yup.string().required('Không được bỏ trống!!!').matches('^[A-Z a-z]+$', 'Vui lòng nhập họ tên phù hợp!!!'),
            taiKhoan: Yup.string().required('không được bỏ trống!!!'),
            email: Yup.string().required('không được bỏ trống!!!').email('không hợp lệ!!!'),
            matKhau: Yup.string().required('không được bỏ trống!!!').min(6, 'phải từ 6-32 ký tự!!!').max(32, 'phải từ 6 - 32 ký tự!!!'),
            soDt: Yup.string().required('không được bỏ trống!!!').min(10, 'Vui lòng nhập số ĐT hợp lệ!!!').max(11, 'Vui lòng nhập số ĐT hợp lệ!!!').matches('^[0-9]+$', 'Vui lòng nhập số điện thoại!!!'),
        }),
        onSubmit: async values => {
            values.maNhom = GROUPID;
            const action = dangKyAction(values);
            await dispatch(action);

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

    return (

        <div className="flex justify-center items-center bg-login h-screen" style={{ backgroundImage: `url(${bg})` }}>
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
                        </div>
                        <button className="submit-btn">Đăng Ký</button>
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
                                if (errors) {
                                    setLoginFail(true);
                                }
                            }}>Đăng Nhập</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}












