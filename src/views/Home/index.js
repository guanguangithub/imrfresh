import React, { Component } from 'react';
import HomeScss from './index.module.scss'
import { connect } from 'react-redux'
import { getGoods } from './action.js'
class index extends Component {
    state = { 
        index:0,
        arr:window.localStorage.getItem('order')?JSON.parse(window.localStorage.getItem('order')):[],
        allPrice:this.props.allPrice
     }
    async componentDidMount(){
        this.changeTab = this.changeTab.bind(this)
        this.changeCount = this.changeCount.bind(this)
         await this.props.getGoods()
    }
    render() {
        const { 
            goods, 
            allCount,
            allPrice,
            save,
            } = this.props
        return (
            <div className={HomeScss.home}>
            <header>
                <div className={HomeScss.header}>
                    <p className="icon">
                        <span>具体负责人指引</span>
                        <i className="iconfont icon-xiangxia "></i>
                    </p>
                    <p className="icon">
                        <i className="iconfont icon-icon-"></i>
                        <i className="iconfont icon-kefu"></i>
                    </p> 
                </div>
               
                <div className={HomeScss.tabbar}>
                {
                    goods.length?
                        goods.map((item,i)=>(
                            <span 
                            className={i===this.state.index?HomeScss.active:null}
                            onClick={()=>this.changeTab(i)}
                            key={i}>{item.tab}</span>
                        ))
                  :null
                }           
            </div>
            </header>
            <section>
         
            <div className={HomeScss.goods}>
              {
                  goods.length?
                  goods[this.state.index].list.map((item,i)=>(
                    <dl className={HomeScss.goodItem} key={i}>
                        <dt>
                            <img src={require(`../../assets/img/${item.img}`)} alt=""/>
                        </dt>
                        <dd>
                            <p>{item.title}</p>
                            <p>
                                <span className={HomeScss.price}>
                                   {item.price}  <s>{item.oldPrice}</s>
                                </span>
                            
                                <span className={HomeScss.count}>
                                    <span className={item.count?HomeScss.count:HomeScss.none}>
                                        <b 
                                         onClick={()=>this.changeCount(this.state.index,i,'REDUCE')}
                                        className={`${HomeScss.button} ${HomeScss.redu}`}>-</b>
                                        <b className={HomeScss.num}>{item.count}</b>
                                    </span>
                                   {/* 加单品数量 */}
                                    <b 
                                    className={`${HomeScss.button} ${HomeScss.add} `}
                                    onClick={()=>this.changeCount(this.state.index,i,'ADD')}
                                    >+</b>
                                </span>
                            </p>
                        </dd>
                    </dl>
                  ))
                  :null
              }            
            </div>
            </section>
              <footer className={HomeScss.footer}>
                  <div className={HomeScss.shopcarWrap}>
                    <span className={HomeScss.shopcar}>
                        {
                            allCount?
                                <b>{allCount}</b>
                            :null
                        }
                    </span>
                  </div>
              
                  <p className={HomeScss.allPrice}>
                      
                      <span className={HomeScss.money}>
                          总计 {allPrice?`￥${allPrice}`:null}
                      </span>
                      <b className={HomeScss.save}>已优惠{save?`￥${save}`:null}</b>
                  </p>
                  <span className={HomeScss.goPay}>
                      去结算
                      
                  </span>
              </footer>
            </div>
        );
    }
    changeTab(i){
        this.setState({
            index:i,
            curGoods:this.props.goods[i]
        })
    }
    async changeCount(bigIndex,littleIndex,type){
        //更改单品数量
       await this.props.changeSingleCount(bigIndex,littleIndex,type)
        //本地存储 保存选中数据
        let arr = this.state.arr
        let curItem = this.props.goods[bigIndex].list[littleIndex]
        if(arr.length){
            let isExit = arr.findIndex(item=>item.id===curItem.id)
            if(isExit===-1){
                arr.push(curItem)
                
            }else{
                arr[isExit]=curItem
                if(curItem.count===0){
                    arr.pop(isExit)
                }
            }
       }else{
           arr = [{ ...curItem}]
        }
        //计算总价
        let allPricenew = arr.reduce((a,b)=>{
            return a+b.count*b.price
        },0)   
        // 更改总金额
        this.props.changeAllPrice(allPricenew)
        //商品数据持久化
        window.localStorage.setItem('order',JSON.stringify(this.state.arr))
        
    }
}
const mapState = (state)=>{
    return {
        ...state
    }
}
const mapDispatch = dispatch=>({
    getGoods(){
        dispatch(getGoods())
    },
    changeSingleCount(bigIndex,littleIndex,type){
        dispatch({
            type,
            bigIndex,
            littleIndex
        })
    },
    // 更改总金额
    changeAllPrice(money){
        dispatch({
            type:"MONEY",
            money
        })
    }
    
})

export default connect(mapState,mapDispatch)(index);