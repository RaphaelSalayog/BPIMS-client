"use client";

import { createEmployee, getEmployeeById, updateEmployee } from "@/api/employee";
import { DrawerContext } from "@/context/DrawerVisibilityContext";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Drawer,
    Form,
    FormProps,
    Input,
    message,
    Modal,
    Select,
    Space,
    Upload,
    UploadFile,
} from "antd";
import { useCallback, useContext, useEffect, useState } from "react";

const fileList: UploadFile[] = [
    // {
    //     uid: "0",
    //     name: "xxx.png",
    //     status: "uploading",
    //     percent: 33,
    // },
    // {
    //     uid: "-1",
    //     name: "yyy.png",
    //     status: "done",
    //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //     thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //     uid: "-2",
    //     name: "zzz.png",
    //     status: "error",
    // },
];

interface IProjectFormDrawer {
    isOpen: boolean;
    onClose: () => void;
    reload: () => void;
}

interface FieldType {
    country: string;
    account_type: string;
    username: string;
    last_name: string;
    first_name: string;
    email: string;
    contact_number: string;
    photo: string;
}

const EmployeeFormDrawer: React.FC<IProjectFormDrawer> = ({ isOpen, onClose, reload }) => {
    const [modal, contextHolderModal] = Modal.useModal();
    const [messageApi, contextHolderMessage] = message.useMessage();
    const [form] = Form.useForm();
    const { add, edit, id } = useContext(DrawerContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const func = async () => {
            if (id.value) {
                setIsLoading(true);
                try {
                    const resp = await getEmployeeById({ id: id.value });
                    form.setFieldsValue(resp.data.data);
                } catch (error) {
                } finally {
                    setIsLoading(false);
                }
            }
        };
        func();
    }, [id.value]);

    const onClickSubmit = useCallback(() => {
        form.submit();
    }, [form]);

    const onCloseForm = useCallback(() => {
        if (form.isFieldsTouched()) {
            modal.confirm({
                title: "Confirm Discard",
                content: (
                    <>
                        <p>Are you sure you want to discard changes?</p>
                        <p>This action cannot be undone.</p>
                    </>
                ),
                onOk: () => {
                    onClose();
                },
                okText: "YES",
            });
        } else {
            onClose();
        }
    }, [form, modal, onClose]);

    const onFinish: FormProps<FieldType>["onFinish"] = useCallback(
        async (values: FieldType) => {
            try {
                if (add.visible) {
                    await createEmployee({ payload: values });
                    messageApi.open({
                        type: "success",
                        content: "Employee added successfully!",
                    });
                }

                if (edit.visible) {
                    await updateEmployee({ id: id.value, payload: values });
                    messageApi.open({
                        type: "success",
                        content: "Employee updated successfully!",
                    });
                    id.setValue("");
                }
                reload();
                onClose();
            } catch (error) {
            } finally {
            }
        },
        [messageApi, onClose]
    );

    return (
        <>
            {contextHolderModal}
            {contextHolderMessage}
            <Drawer
                title={add.visible ? "Add Employee" : edit.visible ? "Edit Employee" : ""}
                width={600}
                onClose={onCloseForm}
                open={isOpen}
                extra={
                    <Space>
                        <Button onClick={onClickSubmit} type="primary" icon={<SaveOutlined />}>
                            {add.visible ? "Submit" : edit.visible ? "Save" : ""}
                        </Button>
                    </Space>
                }
                afterOpenChange={(open) => {
                    if (!open) {
                        form.resetFields();
                    }
                }}
                loading={isLoading}
            >
                <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
                    <div className="!space-y-6">
                        <Form.Item
                            label="Country"
                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: "Country is required",
                                },
                            ]}
                        >
                            <Select
                                className="!w-full"
                                allowClear
                                options={[
                                    { value: "ph", label: "Philippines" },
                                    { value: "us", label: "United States" },
                                ]}
                                placeholder="select it"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Account Type"
                            name="account_type"
                            rules={[
                                {
                                    required: true,
                                    message: "Account Type is required",
                                },
                            ]}
                        >
                            <Select
                                className="!w-full"
                                allowClear
                                options={[
                                    { value: "team_member", label: "Team Member" },
                                    { value: "admin", label: "Admin" },
                                ]}
                                placeholder="select it"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: "Username is required" }]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[{ required: true, message: "Last Name is required" }]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[{ required: true, message: "First Name is required" }]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            label="Email Address"
                            name="email"
                            rules={[
                                { required: true, message: "Email Address is required" },
                                { type: "email", message: "Please enter a valid email address" },
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item label="Contact Number" name="contact_number">
                            <Input
                                allowClear
                                onKeyDown={(e) => {
                                    const isNumber = /^[0-9]$/.test(e.key);
                                    const isAllowedControl =
                                        e.ctrlKey ||
                                        [
                                            "Backspace",
                                            "Tab",
                                            "Enter",
                                            "ArrowLeft",
                                            "ArrowRight",
                                            "ArrowUp",
                                            "ArrowDown",
                                            "Delete",
                                            "Home",
                                            "End",
                                        ].includes(e.key);

                                    if (!isNumber && !isAllowedControl) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </Form.Item>

                        <Form.Item label="Photo (optional)" name="photo">
                            <Upload
                                listType="picture"
                                defaultFileList={fileList}
                                beforeUpload={() => false}
                                maxCount={1}
                                style={{ width: "100%" }}
                            >
                                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                                    Upload
                                </Button>
                            </Upload>
                        </Form.Item>
                    </div>
                </Form>
            </Drawer>
        </>
    );
};

export default EmployeeFormDrawer;
