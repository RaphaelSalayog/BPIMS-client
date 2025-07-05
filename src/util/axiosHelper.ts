import axios from "axios";

interface IAxiosHelper {
    url?: string;
    pathname: string;
    method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
    payload?: any;
}

const axiosHelper = async ({ url, pathname, method, payload }: IAxiosHelper) => {
    const token = localStorage.getItem("token") || "";

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const resp = await axios({ url: `${url}${pathname}`, method, headers, data: payload });
        if (resp.statusText === "OK") {
            (resp as any).ok = true;
        }
        return resp;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return error.response.data;
            }
        } else {
            return {
                status: 500,
                message: "Something went wrong!",
            };
        }
    }
};

export default axiosHelper;
