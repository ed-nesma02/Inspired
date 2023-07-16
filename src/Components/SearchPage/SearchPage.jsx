import { useDispatch, useSelector } from "react-redux";
import { Goods } from "../Goods/Goods";
import { useEffect } from "react";
import { fetchCategory } from "../../features/goodsSlice";
import s from './SearchPage.module.scss'
import { useSearchParams } from "react-router-dom";

export const SearchPage = () =>{
    const {goodsList} = useSelector(state => state.goods);
    const dispath = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(()=>{
        const search = searchParams.get('q');
         dispath(fetchCategory({search, count: 50}));
    },[dispath, searchParams])

    return(
        <>
        {goodsList.length ? 
            <Goods title={searchParams.get('q')}/> 
            : 
            <h3 className={s.empty}>По вашему запросу ничего не найдено</h3>}
        </>
    )
}