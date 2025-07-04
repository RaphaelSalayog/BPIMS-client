import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Tooltip } from 'antd';

const CustomActionButtons = ({
    actions,
    handleView,
    handleEdit,
    handleDelete,
}: {
    actions?: Array<'view' | 'edit' | 'delete'>;
    handleView?: () => void;
    handleEdit?: () => void;
    handleDelete?: () => void;
}) => {
    const showView = actions?.includes('view') || !actions;
    const showEdit = actions?.includes('edit') || !actions;
    const showDelete = actions?.includes('delete') || !actions;

    return (
        <Space size='small'>
            {showView && (
                <Tooltip placement='top' title='View'>
                    <Button
                        type='text'
                        icon={<EyeOutlined className='!text-blue-500' />}
                        onClick={handleView}
                        title='View'
                    />
                </Tooltip>
            )}
            {showView && showEdit && <Divider type='vertical' />}
            {showEdit && (
                <Tooltip placement='top' title='Edit'>
                    <Button
                        type='text'
                        icon={<EditOutlined className='!text-blue-500' />}
                        onClick={handleEdit}
                    />
                </Tooltip>
            )}
            {(showEdit || showView) && showDelete && <Divider type='vertical' />}
            {showDelete && (
                <Tooltip placement='top' title='Delete'>
                    <Button
                        type='text'
                        icon={<DeleteOutlined className='!text-red-500' />}
                        onClick={handleDelete}
                    />
                </Tooltip>
            )}
        </Space>
    );
};

export default CustomActionButtons;
