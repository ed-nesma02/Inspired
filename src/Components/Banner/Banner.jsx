import { NavLink, useLocation, useParams } from 'react-router-dom'
import { Container } from '../Layout/Container/Container'
import s from './Banner.module.scss'
import { API_URL } from '../../const'
import { useMedia } from 'react-use'
import { useEffect } from 'react'

export const Banner = ({ data, category })=>{
    const isMobile = useMedia('(max-width: 540px)');
    const isTablet = useMedia('(max-width: 768px)');
    const isLaptop = useMedia('(max-width: 1024px)');
    const permissionScreen= data?.bg.desktop;

useEffect(() => {
    if (isMobile) {
        const permissionScreen= data?.bg.mobile;
        console.log('Мобильное разрешение');
    } else if (isTablet) {
        const permissionScreen= data?.bg.tablet;
        console.log('Разрешение планшета');
    } else if (isLaptop) {
        const permissionScreen= data?.bg.laptop;
        console.log('Разрешение ноутбука');
    } else {
       const permissionScreen= data?.bg.desktop;
       console.log('Десктопное разрешение');
    }
}, [isMobile, isTablet, isLaptop]);

    return(
    (!category&&data)&&
    <section 
        className={s.banner}
        style={{backgroundImage:`url(${API_URL}/${permissionScreen})`}}>
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