import "./App.css";
import { createBrowserHistory } from "history";
import { Router } from 'react-router';
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import { Route, Switch } from "react-router-dom";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
// import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";

// import { Suspense, lazy } from 'react';
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import Users from "./pages/Admin/User/Users";
import Showtime from "./pages/Admin/Showtime/Showtime";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import AddNewUser from "./pages/Admin/User/AddNew/AddNew";
import EditUser from "./pages/Admin/User/Edit/Edit";
import PageError from "./pages/PageError/PageError";
import UserBooked from "./pages/Admin/UserBooked/UserBooked";
import FilmShedule from "./pages/Admin/FilmSchedule/FilmsSchedule";
import CheckoutMobile from "./pages/Checkout/CheckoutMobile";
import CheckoutIpad from "./pages/Checkout/CheckoutIpad";
import { DetailTemplate } from "./templates/DetailTemplate/DetailTemplate";
import DetailMobile from "./pages/Detail/DetailMobile";
import DetailIpad from "./pages/Detail/DetailIpad";


// const CheckoutTemplateLazy = lazy(() => import('./templates/CheckoutTemplate/CheckoutTemplate'));

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />

      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        {/* <HomeTemplate path="/detail/:id" exact Component={Detail} /> */}
        <DetailTemplate path="/detail/:id" exact Component={Detail} ComponentMobile={DetailMobile} ComponentIpad={DetailIpad} />

        {/* <Route path="/register" exact Component={Register} /> */}

        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} ComponentMobile={CheckoutMobile} ComponentIpad={CheckoutIpad} />

        <UserTemplate path="/login" exact Component={Login} />

        <HomeTemplate path="/profile" exact Component={Profile} />

        <AdminTemplate path="/admin" exact Component={Dashboard} />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate path="/admin/films/showtime/:id/:tenphim" exact Component={Showtime} />
        <AdminTemplate path="/admin/films-shedule" exact Component={FilmShedule} />
        <AdminTemplate path="/admin/users" exact Component={Users} />
        <AdminTemplate path="/admin/users/addnew" exact Component={AddNewUser} />
        <AdminTemplate path="/admin/users/edit/:taiKhoan" exact Component={EditUser} />
        <AdminTemplate path="/admin/users/booked/:taiKhoan" exact Component={UserBooked} />


        {/* <AdminTemplate path="/admin/showtime" exact Component={Showtime}/> */}




        {/* <Suspense fallback={<h1>Loading...</h1>}>
          <CheckoutTemplateLazy path="/checkout/:id" exact Component={Checkout} />
        </Suspense> */}

        <HomeTemplate path="/" exact Component={Home} />
        <Route parth="*" component={PageError} />
      </Switch>

    </Router>
  );
}

export default App;
