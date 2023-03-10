import React, { useState } from "react";
import "./Login.css";
import login from "../images/login.jpg";
import Logo from "../images/supplytrail.png";
import { request } from "../../utils/request";
import { Button, Form, Input, Select } from "antd";
import { onLogInSuccess } from "../../utils/auth";
import Swal from "sweetalert2";

function Login() {
    const options = [
        { value: "manufacturer", text: "Manufacturer" },
        { value: "deliverer", text: "Deliverer" },
        { value: "retailer", text: "Retailer" },
    ];

    const [isLoading, setIsLoading] = useState(false);

    const handleOnFormFinish = async (values) => {
        try {
            const params = {
                method: "POST",
                url: "/user/signin",
                body: values,
                headers: { "Content-Type": "application/json" },
            };
            setIsLoading(true);
            const rawResponse = await request(params);
            const response = await rawResponse.json();
            setIsLoading(false);
            if (rawResponse.status === 200) {
                onLogInSuccess(response.data);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: response.message,
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    return (
        <div className="main-login">
            <div className="login-contain">
                <div id="logo">
                    <a href="/">
                        <img
                            src={Logo}
                            style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "fill",
                            }}
                            alt="Supplytrail"
                        />
                    </a>
                </div>
                <div className="left-side">
                    <div className="title">
                        Supplytrail | Supply Chain Network
                    </div>
                    <h2>Sign In</h2>
                    <Form layout="vertical" onFinish={handleOnFormFinish}>
                        <Form.Item
                            name="userType"
                            label="User Type"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select user type",
                                },
                            ]}
                            htmlFor="userType"
                        >
                            <Select
                                id="uesrType"
                                placeholder="Select user type"
                            >
                                {options.map((option) => (
                                    <Select.Option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.text}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="User ID"
                            name="id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input user ID!",
                                },
                            ]}
                            htmlFor="id"
                            style={{ width: "100%" }}
                        >
                            <Input id="id" placeholder="Enter user ID" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input password!",
                                },
                            ]}
                            htmlFor="password"
                            style={{ width: "100%" }}
                        >
                            <Input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                bordered={false}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                id="button_login"
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                <div className="right-side">
                    <img
                        src={login}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                        alt="login-background"
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
