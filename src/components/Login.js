import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { useLocation, useHistory } from "react-router-dom";
import { APPLICATION_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login, register } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const history = useHistory()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [patronimyc, setPatronimyc] = useState('')

	const click = async () => {
		try {
			let response;
			if (isLogin) {
				response = await login(email, password);
				console.log("login")
			} else {
				console.log("HERE!!!")
				response = await register(email, phoneNumber, firstname, lastname, patronimyc, password);
			}
			user.setUser(response);
			user.setIsAuth(true);
			history.push(APPLICATION_ROUTE);
		} catch (e) {
			alert(e.response.data.message)
		}
	};

	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className="p-5">
				<h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
				<Form className="d-flex flex-column">
					{!isLogin && (
						<>
							<Form.Control
								className="mt-3"
								placeholder="Введите ваш номер телефона..."
								value={phoneNumber}
								onChange={e => setPhoneNumber(e.target.value)}
							/>
							<Form.Control
								className="mt-3"
								placeholder="Введите ваше имя..."
								value={firstname}
								onChange={e => setFirstname(e.target.value)}
							/>
							<Form.Control
								className="mt-3"
								placeholder="Введите вашу фамилию..."
								value={lastname}
								onChange={e => setLastname(e.target.value)}
							/>
							<Form.Control
								className="mt-3"
								placeholder="Введите ваше отчество..."
								value={patronimyc}
								onChange={e => setPatronimyc(e.target.value)}
							/>
						</>
					)}
					<Form.Control
						className="mt-3"
						placeholder="Введите ваш email..."
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Введите ваш пароль..."
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password"
					/>
					<Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
						<Button
							variant={"outline-success"}
							onClick={click}
						>
							{isLogin ? 'Войти' : 'Регистрация'}
						</Button>
						{isLogin ? (
							<div>
								Нет аккаунта? <a href={REGISTRATION_ROUTE}>Регистрация</a>
							</div>
						) : (
							<div>
								Есть аккаунт? <a href={LOGIN_ROUTE}>Войти</a>
							</div>
						)}
					</Row>
				</Form>
			</Card>
		</Container>
	);
});

export default Auth;
