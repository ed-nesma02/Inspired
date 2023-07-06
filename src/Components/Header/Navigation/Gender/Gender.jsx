import { NavLink, useLocation } from 'react-router-dom';
import s from './Gender.module.scss'
import cn from 'classnames';
import { useSelector } from 'react-redux';


export const Gender = ()=>{
    const  {genderList, activeGender, categories }=useSelector (state=>state.navigation);

    return (
    <ul className={s.gender} >
        {genderList.map(gender =>
            <li key={gender} className={s.item}>
                <NavLink 
                    to={gender} 
                    className={({isActive})=>cn(s.link, (isActive || gender===activeGender) && s.linkActive)}>
                        {categories[gender].title}
                </NavLink>
            </li>
        )}
    </ul>
    )
};