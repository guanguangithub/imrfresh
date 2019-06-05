import axiso from 'axios'
export const getGoods = ()=>dispatch=>{
    axiso.get('/mock/goods').then(res=>{
        console.log(res)
        if(res.data.data.length){
            dispatch({
                type:"GOODS",
                action:res.data.data
            })
        }
      
    })
}