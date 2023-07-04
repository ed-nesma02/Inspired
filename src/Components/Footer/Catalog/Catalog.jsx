import { NavLink } from 'react-router-dom';
import s from '../Footer.module.scss'
import cn from 'classnames'

export const Catalog=({list})=>(
    <div className={s.category}>
        <h3 className={cn(s.categoryTitle, s.title)}>Каталог</h3>
        <ul className={s.categoryList}>
            {list.map(item=>(
                <li key={item.link} className={s.categories}>
                    <h3 className={s.categorySubtitle}>
                        <NavLink to={item.link} className={s.link}>
                            {item.title}
                        </NavLink>
                    </h3>
                    <ul className={s.categorySublist}>
                        {item.categories.map(category=>(
                            <li key={category.link}>
                                <NavLink className={s.link} to={`${item.link}/${category.link}`}>
                                    {category.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </li>    
            ))}
        </ul>
        
    </div>
);