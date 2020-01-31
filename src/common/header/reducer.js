import { fromJS } from 'immutable';

const defaultData = fromJS({
    isLogin: false,
    city: "哈尔滨"
})

export default ( state = defaultData, action ) =>{
    switch(action.type){
        default: 
            return state;
    }
}