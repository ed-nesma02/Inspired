import { useDispatch, useSelector } from "react-redux";
import s from './Goods.module.scss';
import {Container} from '../Layout/Container/Container';
import { Product } from "../Product/Product";
import { Pagination } from "../Pagination/Pagination";
import { usePageFromSearchParams } from "../../hooks/usePageFromSearchParams";
import { useEffect } from "react";
import { fetchCategory } from "../../features/goodsSlice";

export const Goods = ({title})=>{
    const {goodsList, totalCount}=useSelector(state=>state.goods) 

    return(
    <section className={s.goods}>
            <Container>
                <h2 className={s.title}>{title ?? 'Новинки'}
                {totalCount && title !== "Вам также может понравиться" && <sup>({totalCount})</sup>}
                </h2>
                <ul className={s.list}>
                    {goodsList?.map(item=> (
                    <li key={item.id}>
                        <Product {...item}/>
                    </li>))}
                </ul>
                <Pagination/>
            </Container>
        </section>
)}