import { NavLink, useLocation, useParams } from 'react-router-dom'
import { Container } from '../Layout/Container/Container'
import s from './Banner.module.scss'
import { API_URL } from '../../const'
import { useMedia } from 'react-use'
import { useEffect, useRef, useState} from 'react'
import { useSelector } from "react-redux";

export const Banner = ({ data, category })=>{
    const isMobile = useMedia('(max-width: 540px)');
    const isTablet = useMedia('(max-width: 768px)');
    const isLaptop = useMedia('(max-width: 1024px)');
    const {activeGender}=useSelector(state=>state.navigation);
    const [permission, setPermission] = useState();

    
useEffect(() => {
    if (isMobile) {
        setPermission(data?.bg.mobile)
    } else if (isTablet) {
        setPermission(data?.bg.tablet)
    } else if (isLaptop) {
        setPermission(data?.bg.laptop)
    } else {
        setPermission(data?.bg.desktop)
    }
}, [isMobile, isTablet, isLaptop, activeGender]);

    return(
    (!category&&data)&&
    <section 
        className={s.banner}
        style={{backgroundImage:`url(${API_URL}/${(permission ? permission : data?.bg.desktop)})`}}
        >
        <Container>
            <div className={s.content}>
                <h2 className={s.title}>{data.description}</h2>
                <NavLink className={s.link} to={`/product/${data.id}`}>
                    Перейти
                </NavLink>
            </div>
        </Container>
    </section>
)}