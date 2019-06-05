import React, { Component } from 'react';
import HomeScss from './index.module.scss'
import { connect } from 'react-redux'
import { getGoods } from './action.js'
class index extends Component {
    state = {  }
    async componentDidMount(){
        await this.props.getGoods()
    }
    render() {
        return (
            <div className={HomeScss.home}>
            <header>
                <p className="icon">
                    <span>具体负责人指引</span>
                    <i className="iconfont icon-xiangxia "></i>
                </p>
                <p className="icon">
                    <i className="iconfont icon-icon-"></i>
                    <i className="iconfont icon-kefu"></i>
                </p>
               
            </header>
            <section>
            <div className={HomeScss.tabbar}>
                <span className={HomeScss.active}>全部</span>
            </div>
            <div className={HomeScss.goods}>
              
                <dl className={HomeScss.goodItem}>
                    <dt>
                        <img src={require('../../assets/img/1.png')} alt=""/>
                    </dt>
                    <dd>
                        <p>gfhjkl;</p>
                        <p>
                            <span className={HomeScss.price}>
                                $9.0  <s>7</s>
                            </span>
                          
                            <span className={HomeScss.count}>
                                <b className={`${HomeScss.button} ${HomeScss.redu}`}>-</b>
                                <b className={HomeScss.num}>9</b>
                                <b className={`${HomeScss.button} ${HomeScss.add}`}>+</b>
                            </span>
                        </p>
                    </dd>
                </dl>
              
            </div>
            </section>
          
            </div>
        );
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
    }
})

export default connect(mapState,mapDispatch)(index);