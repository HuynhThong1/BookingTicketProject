import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Table, Row, Col ,Tag, Divider} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { layThongTinNguoiDungTheoTaiKhoanAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { displayLoadingAction, hideLoadingAction } from "../../../redux/actions/LoadingAction";



export default function UserBooked(props) {
    // const { thongTinNguoiDungTheoTaiKhoan, isLoading } = useSelector(state => state.UserReducer);
    const { thongTinNguoiDungTheoTaiKhoan } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { isLoading } = useSelector(state => state.LoadingReducer);

    const taiKhoan = props.match.params.taiKhoan;

    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch({ type: 'RESET_LOADING_USER' });
        dispatch(displayLoadingAction);
        dispatch(layThongTinNguoiDungTheoTaiKhoanAction(taiKhoan));
        dispatch(hideLoadingAction);
    }, []);
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const listChar = [
        { number: 16, char: 'A' },
        { number: 32, char: 'B' },
        { number: 48, char: 'C' },
        { number: 64, char: 'D' },
        { number: 80, char: 'E' },
        { number: 96, char: 'F' },
        { number: 112, char: 'G' },
        { number: 128, char: 'H' },
        { number: 144, char: 'I' },
        { number: 160, char: 'J' },
    ]
    const setNameSeat = (index) => {
        let result;
        for (let i = 0; i < listChar.length; i++) {
            if (index <= listChar[i].number && index >= listChar[i].number - 15) {
                let h = 0;
                let indexSeat;
                for (let j = listChar[i].number - 16; j <= listChar[i].number; j++) {
                    if (index == j) {
                        indexSeat = h;
                        break;
                    }
                    h++;
                }
                if (indexSeat < 10) {
                    result = ` ${listChar[i].char}0${indexSeat}`;
                } else {
                    result = ` ${listChar[i].char}${indexSeat}`;
                }
            }
        }
        return result;
    }
    const  NestedTable = memo(() => {
        const expandedRowRender = (row) => {
            const columns = [
                { title: 'GHẾ', dataIndex: 'tenGhe', key: 'tenGhe',render:(text,index)=>(
                    <Tag color="blue" key={index}>
                            {setNameSeat(text)}
                        </Tag>
                )},
                { title: 'MÃ HỆ THỐNG RẠP', dataIndex: 'maHeThongRap', key: 'maHeThongRap' },
                { title: 'TÊN HỆ THỐNG RẠP', dataIndex: 'tenHeThongRap', key: 'tenHeThongRap' },
                { title: 'TÊN CỤM RẠP', dataIndex: 'tenCumRap', key: 'tenCumRap' },
            ];

            const data = [];
            for (let i = 0; i < 3; ++i) {
                data.push({
                    key: i,
                    date: '2014-12-24 23:12:00',
                    name: 'This is production name',
                    upgradeNum: 'Upgraded: 56',
                });
            }
            const datas = [];
            for (let i = 0; i < thongTinNguoiDungTheoTaiKhoan.thongTinDatVe.length; i++) {
                let dataA = [];
                for (let j = 0; j < thongTinNguoiDungTheoTaiKhoan.thongTinDatVe[i].danhSachGhe.length; j++) {
                    dataA.push(thongTinNguoiDungTheoTaiKhoan.thongTinDatVe[i].danhSachGhe[j]);
                }
                datas[i] = dataA;
            }
            let dataEx ;
            for(let i = 0; i < thongTinNguoiDungTheoTaiKhoan.thongTinDatVe.length; i++){
                if(i == row.key){
                    dataEx = datas[i];
                }
            }

            return <Table columns={columns} dataSource={dataEx} pagination={false} />;
        };

        const columns = [
            { title: 'TÊN PHIM', dataIndex: 'tenPhim', key: 'tenPhim', with: '350' },
            { title: 'NGÀY ĐẶT', dataIndex: 'ngayDat', key: 'ngayDat', with: '200' },
            { title: 'GIÁ VÉ', dataIndex: 'giaVe', key: 'giaVe', render: (text) => (<span>{numberWithCommas(text)} VNĐ</span>), with: '150' },
            { title: 'THỜI LƯỢNG PHIM', dataIndex: 'thoiLuongPhim', key: 'thoiLuongPhim', render: (text) => (<span>{text} P</span>), with: '100' },
        ];

        const data = [];
        for (let i = 0; i < thongTinNguoiDungTheoTaiKhoan?.thongTinDatVe?.length; i++) {
            data.push({
                key: i,
                tenPhim: thongTinNguoiDungTheoTaiKhoan.thongTinDatVe[i].tenPhim,
                ngayDat: moment(thongTinNguoiDungTheoTaiKhoan.thongTinDatVe[i].ngayDat).format('DD/MM/YYYY hh:mm:ss'),
                giaVe: thongTinNguoiDungTheoTaiKhoan.thongTinDatVe[i].giaVe,
                thoiLuongPhim: thongTinNguoiDungTheoTaiKhoan.thongTinDatVe[i].thoiLuongPhim,
            });
        }
        return (
            <Table
                loading={isLoading}
                bordered
                className="components-table-demo-nested"
                columns={columns}
                expandable={{ expandedRowRender }}
                dataSource={data}
                scroll={{ x: 400 }}
            />
        );
    });
    return (
        <>
        <Row >
           <Col span={24}>
               <Divider orientation="left">THÔNG TIN ĐẶT VÉ  CỦA {taiKhoan}</Divider>
            </Col>
           <Col span={24} style={{marginRight:10}}>
                <NestedTable />
           </Col>
       </Row>
       </>
    )
}
