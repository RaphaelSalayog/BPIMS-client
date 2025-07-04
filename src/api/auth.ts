import axiosHelper from "../../util/axiosHelper";

const url = process.env.NEXT_PUBLIC_API_URL;

interface IPostLoginApi {
    payload: {
        username: string;
        password: string;
    };
}

export const postLogin = async ({ payload }: IPostLoginApi) => {
    return await axiosHelper({
        url: url,
        pathname: "/login",
        method: "POST",
        payload,
    });
};
