import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";


import Admin from "../pages/Admin";
import  Auth  from "../pages/Auth";
import Basket from "../pages/Basket";
import DevicePage from "../pages/DevicePage";
import Shop from "../pages/Shop";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../utils/const";

import { Context } from "../index";

const AppRouter = () => {

  const {user} = useContext(Context)

  return (
    <Routes>
        (<Route path={SHOP_ROUTE} element={<Shop/>} exact />)
        (<Route path={LOGIN_ROUTE} element={<Auth/>} exact />)
        (<Route path={REGISTRATION_ROUTE} element={<Auth/>} exact />)
        (<Route path={DEVICE_ROUTE + "/:id"} element={<DevicePage/>} exact />)
        { user.isAuth && (<Route path={ADMIN_ROUTE} element={<Admin/>} exact />)}
        {user.isAuth && (<Route path={BASKET_ROUTE} element={<Basket/>} exact />)}
        <Route path="*" element={<Shop/>} />  
    </Routes>
  );
};

export default AppRouter;
