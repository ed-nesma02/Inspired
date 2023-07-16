import { useDispatch, useSelector } from "react-redux"
import { Goods } from "../Goods/Goods"
import { useEffect } from "react";
import { fetchCategory } from "../../features/goodsSlice";
import { usePageFromSearchParams } from "../../hooks/usePageFromSearchParams";
import s from './FavoritePage.module.scss'
import { Container } from "../Layout/Container/Container";

export const FavoritePage = () =>{
    const dispath = useDispatch();
    const favorites = useSelector(state => state.favorites);
    const page = usePageFromSearchParams(dispath);

    useEffect(()=>{
        if(favorites){
            const param = {list : favorites};
            if(page){
                param.page = page;
            }
            dispath(fetchCategory(param))
        }
    }, [page, favorites, dispath])

    return(
    <>
    {favorites.length ? 
        <Goods title='Избранное'/> 
        :
        <Container >
            <h2 className={s.title}>Избранное</h2>
            <h3 className={s.empty}>Вы ничего не добавили в избранное</h3>
        </Container>
    }
    </>
)}