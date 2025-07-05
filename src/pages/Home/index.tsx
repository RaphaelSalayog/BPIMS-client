"use client";

import Image from "next/image";
import { Button, Card, message, Modal, Table } from "antd";
import type { TableProps } from "antd";
import CustomActionButtons from "@/components/CustomActionButtons";
import { PlusOutlined } from "@ant-design/icons";
import EmployeeFormDrawer from "./EmployeeFormDrawer";
import { useContext, useEffect, useState } from "react";
import { DrawerContext } from "@/context/DrawerVisibilityContext";
import { deleteEmployee, getAllEmployees } from "@/api/employee";

interface DataType {
    id: string;
    first_name: string;
    last_name: string;
    country: string;
    account_type: string;
    photo: string;
    username: number;
    email: string;
}

const Home = () => {
    const [modal, contextHolderModal] = Modal.useModal();
    const [messageApi, contextHolderMessage] = message.useMessage();
    const { add, edit, id } = useContext(DrawerContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const func = async () => {
            setIsLoading(true);
            try {
                const resp = await getAllEmployees();
                setData(resp.data.data);
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };
        func();
    }, [reload]);

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "Photo",
            dataIndex: "photo",
            key: "photo",
            render: (photo, record) => (
                <div className="relative w-20 h-20 overflow-hidden">
                    {photo?.url && (
                        <Image
                            src={photo.url}
                            alt={record.first_name}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (_, { first_name, last_name }) => `${first_name} ${last_name}`,
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Country",
            dataIndex: "country",
            key: "country",
            render: (_, { country }) => {
                if (country === "ph") {
                    return "Philippines";
                } else if (country === "us") {
                    return "United States";
                }
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Account Type",
            dataIndex: "account_type",
            key: "account_type",
            render: (_, { account_type }) => {
                if (account_type === "team_member") {
                    return "Team Member";
                } else if (account_type === "admin") {
                    return "Admin";
                }
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <CustomActionButtons
                    actions={["edit", "delete"]}
                    handleEdit={() => {
                        edit.setVisible(true);
                        id.setValue(record.id);
                    }}
                    handleDelete={() => {
                        modal.confirm({
                            title: "Confirm Discard",
                            content: (
                                <>
                                    <p>
                                        Are you sure you want to delete{" "}
                                        <span className="font-semibold">{record.username}</span>?
                                    </p>
                                    <p>This action cannot be undone.</p>
                                </>
                            ),
                            onOk: async () => {
                                try {
                                    const resp = await deleteEmployee({ id: record.id });
                                    if (resp.status === 200) {
                                        setReload((prev) => !prev);
                                        messageApi.open({
                                            type: "success",
                                            content: "Employee delete successfully!",
                                        });
                                    }
                                } catch (error) {}
                            },
                            okText: "YES",
                        });
                    }}
                />
            ),
        },
    ];

    const onOpenEmployeeFormDrawer = () => {
        add.setVisible(true);
    };

    const onCloseEmployeeFormDrawer = () => {
        add.setVisible(false);
        edit.setVisible(false);
    };

    return (
        <>
            {contextHolderModal}
            {contextHolderMessage}
            <Card style={{ width: "80%" }} title="Employee Records">
                <div className="!space-y-6">
                    <div className="flex !justify-end">
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                            onClick={onOpenEmployeeFormDrawer}
                        >
                            Add Employee
                        </Button>
                    </div>
                    <Table<DataType>
                        columns={columns}
                        dataSource={data}
                        rowKey="id"
                        loading={isLoading}
                    />
                </div>
            </Card>
            <EmployeeFormDrawer
                isOpen={add.visible || edit.visible}
                onClose={onCloseEmployeeFormDrawer}
                reload={() => {
                    setReload((prev) => !prev);
                }}
            />
        </>
    );
};

export default Home;
