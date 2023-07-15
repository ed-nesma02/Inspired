import { useEffect, useState } from "react";
import { Cart } from "./Cart/Cart"
import { Order } from "./Order/Order"
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../features/goodsSlice";

export const CartPage = () =>{
    const {cartItems, countItems} = useSelector(state => state.cart);
    const {goodsList} = useSelector(state => state.goods);
    const [count, setCount] = useState(0);
    const dispath = useDispatch();

    useEffect(()=>{
        if(count !== countItems){
            dispath(fetchAll({list: cartItems.map(item => item.id)}))
            setCount(countItems);
        }
    }, [cartItems, count, countItems, dispath])

    return(
    <>
        <Cart cartItems={cartItems} goodsList={goodsList} />
        <Order cartItems={cartItems} goodsList={goodsList} />
    </>
)}