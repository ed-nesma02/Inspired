import { useEffect, useState } from "react";
import { Cart } from "./Cart/Cart"
import { Order } from "./Order/Order"
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../features/goodsSlice";
import { Preloader } from "../Preloader/Preloader";
import { OrderModal } from "./OrderModal/OrderModal";

export const CartPage = () =>{
    const {cartItems, countItems} = useSelector(state => state.cart);
    const {goodsList, status} = useSelector(state => state.goods);
    const {orderStatus} = useSelector(state => state.cart)
    const [count, setCount] = useState(0);
    const dispath = useDispatch();

    useEffect(()=>{
        if(count !== countItems){
            dispath(fetchAll({list: cartItems.map(item => item.id)}))
            setCount(countItems);
        }
    }, [cartItems, count, countItems, dispath])

    return status==='loading' ? <Preloader/> : (
    <>
        <Cart cartItems={cartItems} goodsList={goodsList} />
        { !!goodsList.length && <Order cartItems={cartItems} />}
        {orderStatus === "success" && <OrderModal/>}
    </>
)}