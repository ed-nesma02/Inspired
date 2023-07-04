import { NavLink, useLocation } from 'react-router-dom';
import s from './Gender.module.scss'
import cn from 'classnames';


export const Gender = ({list})=>(
    <ul className={s.gender} >
        {list.map(item =>
            <li key={item.link} className={s.item}>
                <NavLink 
                    to={item.link} 
                    className={({isActive})=>cn(s.link, (isActive || (item.link==='women' && useLocation().pathname==='/')) && s.linkActive)}>
                        {item.title}
                </NavLink>
            </li>
        )}
    </ul>
);