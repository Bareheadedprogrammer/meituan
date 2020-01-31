import { fromJS } from 'immutable';

const defaultData = fromJS({
    error_message: "错误信息:服务器找不到请求的网页"
})

export default ( state = defaultData, action ) =>{
    switch(action.type){
        default: 
            return state;
    }
}