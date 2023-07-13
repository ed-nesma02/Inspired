import { useDispatch, useSelector } from "react-redux"
import { Goods } from "../Goods/Goods"
import { useEffect } from "react";
import { fetchCategory } from "../../features/goodsSlice";
import { usePageFromSearchParams } from "../../hooks/usePageFromSearchParams";

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
    <Goods title='Избранное'/>
)}