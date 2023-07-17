import { useDispatch, useSelector } from "react-redux"
import { Goods } from "../Goods/Goods"
import { useEffect } from "react";
import { fetchCategory } from "../../features/goodsSlice";
import { usePageFromSearchParams } from "../../hooks/usePageFromSearchParams";
import s from './FavoritePage.module.scss'
import { Container } from "../Layout/Container/Container";
import { useNavigate } from "react-router-dom";

export const FavoritePage = () =>{
    const dispath = useDispatch();
    const favorites = useSelector(state => state.favorites);
    const {pages} = useSelector(state=> state.goods)
    const page = usePageFromSearchParams(dispath);
    const navigate = useNavigate();

    useEffect(()=>{
        if(favorites){
            const param = {list : favorites};
            const favoritesLength = favorites.length;
            if(!(favoritesLength%12) && page===Math.ceil((favoritesLength+1)/12)){
                navigate(`/favorite?page=${page-1}`);
            }else if(page){
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