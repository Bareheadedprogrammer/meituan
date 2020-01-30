import { fromJS } from 'immutable';

const defaultData = fromJS({
    name: "我是默认数据"
})

export default ( state = defaultData, action ) =>{
    switch(action.type){
        default: 
            return state;
    }
}