import React, { useContext } from "react";
import { Context } from "../index";
import { NavLink, useNavigate } from "react-router-dom";
import { SHOP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE } from "../utils/const";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";

const Navbar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  function handleClick(route) {
    navigate(route);
  }

  const logOut =()=>{
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <nav className="navbar sticky-md-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid container">
        <NavLink
          className=" text-danger fs-3 text-decoration-none "
          to={SHOP_ROUTE}
        >
          InternetShop
        </NavLink>

        <div>
          {user.isAuth ? (
            <ul className="navbar-nav mb-5 mb-lg-0">
              <li className="nav-item mx-2">
                <Button
                  variant={"outline-light"}
                  onClick={() => handleClick(ADMIN_ROUTE)}
                >
                  Admin
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  variant={"outline-light"}
                  onClick={() => logOut()}
                >
                  Chiqish
                </Button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mb-5 mb-lg-0">
              <li className="nav-item">
                <Button
                  variant={"outline-light"}
                  onClick={() => navigate(LOGIN_ROUTE)}
                >
                  Ro'yxatdan o'tish
                </Button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
