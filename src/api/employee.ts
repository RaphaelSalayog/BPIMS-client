import axiosHelper from "../../util/axiosHelper";

const url = process.env.NEXT_PUBLIC_API_URL;

interface IGetEmployeeByIdApi {
    id: string;
}

interface ICreateEmployeeApi {
    payload: {
        country: string;
        account_type: string;
        username: string;
        last_name: string;
        first_name: string;
        email?: string;
        contact_number?: string;
    };
}

interface IUpdateEmployeeApi {
    id: string;
    payload: {
        country: string;
        account_type: string;
        username: string;
        last_name: string;
        first_name: string;
        email?: string;
        contact_number?: string;
    };
}

interface IDeleteEmployeeApi {
    id: string;
}

export const getAllEmployees = () => {
    return axiosHelper({
        url: url,
        pathname: "/employee/getAllEmployees",
        method: "GET",
    });
};

export const getEmployeeById = ({ id }: IGetEmployeeByIdApi) => {
    return axiosHelper({
        url: url,
        pathname: `/employee/getEmployeeById/${id}`,
        method: "GET",
    });
};

export const createEmployee = ({ payload }: ICreateEmployeeApi) => {
    return axiosHelper({
        url: url,
        pathname: "/employee/createEmployee",
        method: "POST",
        payload,
    });
};

export const updateEmployee = ({ id, payload }: IUpdateEmployeeApi) => {
    return axiosHelper({
        url: url,
        pathname: `/employee/updateEmployee/${id}`,
        method: "PUT",
        payload,
    });
};

export const deleteEmployee = ({ id }: IDeleteEmployeeApi) => {
    return axiosHelper({
        url: url,
        pathname: `/employee/deleteEmployee/${id}`,
        method: "DELETE",
    });
};
