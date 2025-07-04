import { Layout } from "antd";

const MainPageLayout = ({ children }: { children: React.ReactNode }) => {
    return <Layout className="!min-h-screen flex items-center justify-center">{children}</Layout>;
};

export default MainPageLayout;
