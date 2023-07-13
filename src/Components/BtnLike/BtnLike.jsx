import { useDispatch, useSelector } from "react-redux"
import { ReactComponent as LikeSVG } from "../../assets/heart.svg"
import s from './BtnLike.module.scss'
import { addToFavorite, removeFromFavorite } from "../../features/favoritesSlice";
import cn from "classnames";

export const BtnLike = ({id})=>{
    const dispath=useDispatch();
    const isFavorite = useSelector(state=>state.favorites.includes(id));

    const handleToggleFavorite =()=>{
        if(isFavorite){
            dispath(removeFromFavorite({id}));
        }else{
            dispath(addToFavorite({id}));
        }
    }

    return(
        <button className={isFavorite ? cn(s.like, s.active) : s.like} onClick={handleToggleFavorite} aria-label="Добавить в избранное" type="button">
            <LikeSVG/>
        </button>
    )
}