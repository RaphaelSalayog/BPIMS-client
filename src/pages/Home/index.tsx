"use client";

import Image from "next/image";
import { Button, Card, Modal, Table } from "antd";
import type { TableProps } from "antd";
import CustomActionButtons from "@/components/CustomActionButtons";
import { PlusOutlined } from "@ant-design/icons";
import EmployeeFormDrawer from "./EmployeeFormDrawer";
import { useContext } from "react";
import { DrawerContext } from "@/context/DrawerVisibilityContext";

interface DataType {
    key: string;
    id: string;
    name: string;
    country: string;
    account_type: string;
    photo: string;
    username: number;
    email: string;
}

const data: DataType[] = [
    {
        key: "1",

        id: "1",
        photo: "https://img.freepik.com/free-photo/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes_273609-16608.jpg?semt=ais_hybrid&w=740",
        name: "John Doe",
        username: 10123,
        country: "United States",
        email: "john.doe@example.com",
        account_type: "Admin",
    },
    {
        key: "2",
        id: "2",
        photo: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg?semt=ais_hybrid&w=740",
        name: "Jane Smith",
        username: 10234,
        country: "Canada",
        email: "jane.smith@example.ca",
        account_type: "Editor",
    },
    {
        key: "3",
        id: "3",
        photo: "https://www.pixelstalk.net/wp-content/uploads/2016/05/Free-HD-Wallpaper-High-Quality.png",
        name: "Michael Lee",
        username: 10345,
        country: "Australia",
        email: "michael.lee@example.au",
        account_type: "Viewer",
    },
    {
        key: "4",
        id: "4",
        photo: "https://img.freepik.com/free-photo/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes_273609-16608.jpg?semt=ais_hybrid&w=740",
        name: "Emily Johnson",
        username: 10456,
        country: "United Kingdom",
        email: "emily.johnson@example.co.uk",
        account_type: "Admin",
    },
    {
        key: "5",
        id: "5",
        photo: "https://img.freepik.com/free-photo/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes_273609-16608.jpg?semt=ais_hybrid&w=740",
        name: "Carlos Martinez",
        username: 10567,
        country: "Mexico",
        email: "carlos.m@example.mx",
        account_type: "Contributor",
    },
];

const Home = () => {
    const [modal, contextHolderModal] = Modal.useModal();
    const { add, edit, id } = useContext(DrawerContext);

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "Photo",
            dataIndex: "photo",
            key: "photo",
            render: (photo) => (
                <div className="relative w-20 h-20 overflow-hidden">
                    <Image src={photo} alt="" fill className="object-cover" />
                </div>
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
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
                            onOk: () => {},
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
                    <Table<DataType> columns={columns} dataSource={data} />
                </div>
            </Card>
            <EmployeeFormDrawer
                isOpen={add.visible || edit.visible}
                onClose={onCloseEmployeeFormDrawer}
            />
        </>
    );
};

export default Home;
