const def = {
    goods:[]
}
const reducer = (state=def,action)=>{
    switch(action.type){
        case 'GOODS':
            console.log(action,'action')
            return {
                ...state
            }
        default :return {...state}
    }
}
export default reducer