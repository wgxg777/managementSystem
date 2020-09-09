import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    })
}
export const belle = query => {
    return request({
        url: './test.json',
        method: 'get',
        params: query
    })
}
