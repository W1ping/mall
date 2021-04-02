import {
 ADD_COUNTER,
 ADD_TO_CART
} from './mutation-types';

export default {
  [ADD_COUNTER](state, payload){
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload)
  },

  /**
   * 更新商品中Checked的值
   */
   updateChecked(state, payload) {
    //1、查找到当前要修改的商品
    let oldProduct = state.cartList.find(item => {
      return item.iid === payload.item.iid && item.productStyleMsg === payload.item.productStyleMsg && item.productSizeMsg === payload.item.productSizeMsg
    })
    //2、改变checked值
    oldProduct.checked = payload.checked;
  },

  /**
   * 更新商品中currentCounts的值
   */
  updateCounts(state, payload) {
    //1、查找到当前要修改的商品
    let oldProduct = state.cartList.find(item => {
      return item.iid === payload.item.iid && item.productStyleMsg === payload.item.productStyleMsg && item.productSizeMsg === payload.item.productSizeMsg
    })
    //2、改变checked值
    oldProduct.currentCounts += payload.number;
  },
  /**
   * 删除选中的商品
   */
  deleteProduct(state) {
    state.cartList = state.cartList.filter(item => !item.checked);
  }
}