import axiso from 'axios'
export const getGoods = ()=>dispatch=>{
    axiso.get('/mock/getGoods').then(res=>{
        console.log(res)
        dispatch({
            type:"GOODS",
            action:res
        })
    })
}