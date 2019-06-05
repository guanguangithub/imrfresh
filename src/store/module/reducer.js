import { stat } from "fs";

const def = {
    goods:[],
    curGoods:[],
    allCount:0,
    allPrice:0,
    save:0,
    localList : JSON.parse(window.localStorage.getItem('order'))?JSON.parse(window.localStorage.getItem('order')):[]
}
const reducer = (state=def,action)=>{
    let newstate = JSON.parse(JSON.stringify(state))
    let bigIndex= action.bigIndex
    let littleIndex= action.littleIndex
    switch(action.type){
        //初始化数据
        //追加单个商品当前数量
        case 'GOODS':
            action.action.map(item=>{
                    item.list.forEach((val,i)=>{
                        val.count = 0;
                        let idx = newstate.localList.findIndex(value=>value.id===val.id)  
                        if(idx===-1){
                            return 
                        }else{
                            val.count = newstate.localList[idx].count
                        }
                    })
                })
           newstate.allPrice = newstate.localList.reduce((a,b)=>{
               return a+b.count*b.price
           },0)   
            return {
                ...newstate,
                goods:action.action,
                curGoods:action.action[0] ,
                allPrice:newstate.allPrice
            }
        //商品 加
        case "ADD":
            newstate.goods[bigIndex].list[littleIndex].count = 
            newstate.goods[bigIndex].list[littleIndex].count+1
            //统计总数
            newstate.allCount = newstate.allCount+1;
            newstate.allPrice = newstate.localList.reduce((a,b)=>{
                return a+b.count*b.price
            },0)
            return {
                ...newstate,
                allPrice:newstate.allPrice
            }
        //商品 减
        case "REDUCE":
            let count = newstate.goods[bigIndex].list[littleIndex].count
            
            //统计总数
            if(newstate.allCount) {
                newstate.allCount = newstate.allCount-1;
            }
            if(count>0) {
                newstate.goods[bigIndex].list[littleIndex].count = 
                newstate.goods[bigIndex].list[littleIndex].count-1

            } else {
                newstate.goods[bigIndex].list[littleIndex].count = 0
            }
            newstate.allPrice = newstate.localList.reduce((a,b) => {
                return a+b.count*b.price
            },0)
          
            return {
                ...newstate,
                allPrice:newstate.allPrice  
            }
        //计算总价
        case "MONEY":
            newstate.allPrice = action.money
            return {
                ...newstate
            }
        default :return {...state}
    }
}
export default reducer