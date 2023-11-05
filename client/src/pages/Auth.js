import React, { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/const";
import { login, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const click = async () => {
    let data;
    try {
      if (isLogin) {
         data = await login(email, password);
      } else {
         data = await registration(email, password);
      }

      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <Container
      className=" d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Kirish" : "Ro'yxatdan o'tish"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-3"
            placeholder="Emailni kiriting..."
          />
          <Form.Control
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3"
            placeholder="Passwordni kiriting..."
          />
          <div className="mt-3 pl-3 pr-3 d-flex justify-content-between">
            {isLogin ? (
              <div>
                Ro'yxatdan o'tmaganmisiz?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Ro'yxatdan o'tish</NavLink>
              </div>
            ) : (
              <div>
                Ro'yxatdan o'tganmisiz?{" "}
                <NavLink to={LOGIN_ROUTE}>Kirish</NavLink>
              </div>
            )}
            <Button
              className="align-self-end"
              variant="outline-success"
              onClick={click}
            >
              {isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
