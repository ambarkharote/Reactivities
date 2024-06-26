import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../layout/models/activity";
import { toast } from "react-toastify";
import { router } from "../Router/Routes";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async response => {
     await sleep(1000);
      return response;
}, (error: AxiosError) => {
    const {data, status,config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if(config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors,'id')) {
                router.navigate('/not-found');
            }
            if(data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if(data.errors[key]) 
                    {
                        modalStateErrors.push(data.errors[key]);
                    }
                } 
                throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
            break;
        case 401:
            toast.error('Unauthorized')
            break;
        case 403:
            toast.error('Forbidden')
            break;
        case 404:
            router.navigate('Not Found')
            break;       
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
})

const resposeBody = <T> (response : AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(resposeBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(resposeBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(resposeBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(resposeBody)
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;