import { Container } from "../../Layout/Container/Container.jsx";
import s from './Top.module.scss'
import cn from 'classnames'
import logo from '/src/assets/logo.svg'
import { NavLink } from "react-router-dom";
import { ReactComponent as LikeSVG } from "../../../assets/heart.svg"
import { ReactComponent as SearchSVG } from "../../../assets/search.svg"
import { ReactComponent as CartSVG } from "../../../assets/cart.svg"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toggleSearch } from "../../../features/searchSlice.js";

export const Top = ()=>{
    const {countItems} = useSelector(state => state.cart);
    const countFavorites=useSelector(state=>state.favorites)
    const [countFavorits, setCountFavorits] = useState(countFavorites.length);
    const dispath = useDispatch();

    const handleOpenSearch= () =>{
        dispath(toggleSearch());
    }

    useEffect(()=>{
        if(countFavorites.length>countFavorits){
            setCountFavorits(countFavorits + 1);
        } else if(countFavorites.length<countFavorits){
            setCountFavorits(countFavorits - 1);
        }
    },[countFavorites])

    return (
    <div className={s.top}>
        <Container className={s.topContainer}>
            <a className={cn(s.topLink, s.topPhone)} href="tel:89304902620">8 930 490 26 20</a>
            <NavLink className={cn(s.topLogo)} to="/">
                <img src={logo} alt="Логотип Inspired" />
            </NavLink>
            <div className={s.topNavigation}>
                <ul className={s.topNavList}>
                    <li className={s.navItem}>
                        <button className={s.topLink} onClick={handleOpenSearch}>
                            <SearchSVG/>
                        </button>
                    </li>
                    <li className={s.navItem}>
                        <NavLink to={'/cart'} className={s.topLink}>
                            <CartSVG/>
                            <span className={s.topLinkCount}>{countItems}</span>
                        </NavLink>
                    </li>
                    <li className={s.navItem}>
                        <NavLink to={'/favorite?page=1'} className={cn(s.topLink, s.like)}>
                            <LikeSVG/>
                            <span className={s.topLinkCount}>{countFavorites.length}</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </Container>
    </div>
)};