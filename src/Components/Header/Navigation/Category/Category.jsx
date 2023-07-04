import { NavLink, useLocation } from 'react-router-dom';
import s from './Category.module.scss'
import cn from 'classnames';


export const Category = ({list})=>{
    let location=useLocation().pathname.split('/')[1];
    return (
    <ul className={s.category} >
        {list[(location==='men') ? 1: 0].categories.map(item =>
            <li key={item.link}>
                <NavLink 
                    to={`${location==='' ? '/women': location}/${item.link}`} 
                    className={({isActive})=>cn(s.link, isActive && s.linkActive)}>
                        {item.title}
                    </NavLink>
            </li>
        )}
    </ul>
    )
}