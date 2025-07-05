"use client";

import { postLogin } from "@/api/auth";
import { AuthenticationContext } from "@/context/AuthenticationContext";
import { Layout, Typography, Form, FormProps, Input, Button, Card } from "antd";
import { Content } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const { Title, Text } = Typography;

interface FieldType {
    username: string;
    password: string;
}

const Login = () => {
    const { user } = useContext(AuthenticationContext);
    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        setIsLoading(true);
        try {
            const resp = await postLogin({
                payload: values,
            });

            if (resp.ok) {
                localStorage.setItem("token", resp.data.token);
                user.setValue(resp.data.user);
                router.push("/home");
            } else {
                form.setFields([
                    {
                        name: "password",
                        errors: ["Invalid credentials"],
                    },
                ]);
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
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
                        <Card
                            style={{ position: "absolute", width: "20%", top: 50, left: 50 }}
                            title="Credential"
                        >
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Text>Username: bpims</Text>
                                <Text>Password: bpims</Text>
                            </div>
                        </Card>
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
                                    name="username"
                                    rules={[
                                        { required: true, message: "Please input your username!" },
                                    ]}
                                >
                                    <Input placeholder="Username" />
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
