import { useSelector } from "react-redux"
import s from "./Cart.module.scss"
import { Container } from "../../Layout/Container/Container";
import { CartItem } from "./CartItem/CartItem";

export const Cart = ({cartItems, goodsList}) =>{
    const totalPrice = cartItems.map(e =>(
        (goodsList.find(item => item.id === e.id)?.price * e.count)
    ))?.reduce((acc, currentValue) => acc + currentValue, 0);

    return(
        <section className={s.cart}>
            <Container>
                <h2 className={s.title}>Корзина</h2>
                {cartItems.length ? 
                    <ul className={s.list}>
                        {cartItems.map(item =>(
                            <li key={`${item.id}-${item.color}-${item.size}`} className={s.item} >
                                <CartItem {...item} goodsList={goodsList}/>
                            </li>
                        ))}
                    </ul>
                    :
                    <h3 className={s.empty}>В корзине пусто</h3>
                }
                <div className={s.total}>
                    <p>Итого:</p>
                    <p>руб {totalPrice}</p>
                </div>
            </Container>
        </section>
    );
}