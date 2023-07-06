import { NavLink } from 'react-router-dom';
import s from '../Footer.module.scss';
import cn from 'classnames';
import { useSelector } from 'react-redux';

export const Category=()=>{
    const { genderList, categories } = useSelector(state=>state.navigation);

    return(
    <div className={s.category}>
        <h3 className={cn(s.categoryTitle, s.title)}>Каталог</h3>
        <ul className={s.categoryList}>
            {genderList.map(gender=>(
                <li key={gender} className={s.categories}>
                    <h3 className={s.categorySubtitle}>
                        <NavLink to={gender} className={s.link}>
                            {categories[gender].title}
                        </NavLink>
                    </h3>
                    <ul className={s.categorySublist}>
                        {categories[gender]?.list?.map(item=>(
                            <li key={item.slug}>
                                <NavLink className={s.link} to={`${gender}/${item.slug}`}>
                                    {item.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </li>    
            ))}
        </ul> 
    </div>
)};