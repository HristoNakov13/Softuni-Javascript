function fetchData(URL: string, headers: RequestInit): Promise<any> {
    return fetch(URL, headers)
        .then(res => {
            if (!res.ok) {
                console.log(res);
                throw new Error(res.statusText);
            }

            return res;
        })
        .then(res => {
            return res.status === 204
                ? res
                : res.json();
        })
        .catch(console.error);
}

function buildHeaders(httpMethod: string, data?: object | Array<any>): Object {
    const headers: any = {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
        }
    };

    if (data) {
        headers.body = JSON.stringify(data);
    }

    return headers;
}

function get(endpoint: string) {
    const headers = buildHeaders("GET");
    const URL = buildURL(endpoint);

    return fetchData(URL, headers);
}

function post(endpoint: string, data?: object | Array<any>) {
    const headers = buildHeaders("POST", data);
    const URL = buildURL(endpoint);

    return fetchData(URL, headers);
}

function put(endpoint: string, data: object | Array<any>) {
    const headers = buildHeaders("PUT", data);
    const URL = buildURL(endpoint);

    return fetchData(URL, headers);
}

function del(endpoint: string, data: object | Array<any>) {
    const headers = buildHeaders("DELETE", data);
    const URL = buildURL(endpoint);

    return fetchData(URL, headers);
}

const ROOT_URL = " http://localhost:8080";

function buildURL(endpoint: string): string {
    return `${ROOT_URL}${endpoint}`;
}

const requester = {
    get,
    post,
    put,
    del
};

export default requester;