import http from "@/utils/request";

//定义请求首页数据的接口
export const getData = () =>{
    //返回一个promise对象
    return http.get('/home/getData')
}    

export const getUser =(params)=>{
    //返回用户列表
    return http.get('/user/getUser', params)
}

//增加用户
export const addUser =(data) =>{
    return http.post('/user/add', data)
}

//修改用户
export const editUser =(data) =>{
    return http.post('/user/edit', data)
}

//删除用户
export const delUser =(data) =>{
    return http.post('/user/del', data)
}
export const getMenu =(data) =>{
    return http.post('/permission/getMenu', data)
}