"use client";

import { Layout, Typography, Form, FormProps, Input, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Title } = Typography;

interface FieldType {
    email: string;
    password: string;
}

const Login = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        router.push("/home");
    };

    return (
        <div className="min-h-screen">
            <main className="w-full">
                <Layout style={{ minHeight: "100vh" }}>
                    <Content
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                        }}
                    >
                        <div className="w-[20%] !space-y-6">
                            <div className="flex flex-col items-center justify-center !space-y-2">
                                <Title
                                    level={3}
                                    style={{
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        letterSpacing: "0.05rem",
                                    }}
                                >
                                    BPI MS
                                </Title>
                            </div>
                            <Form
                                form={form}
                                layout="vertical"
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item<FieldType>
                                    name="email"
                                    rules={[
                                        { required: true, message: "Please input your email!" },
                                    ]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your password!",
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full"
                                    loading={isLoading}
                                >
                                    Login
                                </Button>
                            </Form>
                        </div>
                    </Content>
                </Layout>
            </main>
        </div>
    );
};

export default Login;
