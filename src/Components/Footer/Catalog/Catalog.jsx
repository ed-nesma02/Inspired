import s from '../Footer.module.scss'
import cn from 'classnames'

const data={
    women:{
        title: 'Женщины',
        category:[
            'Бюстгальтеры',  
            'Трусы',
            'Носки',
            'Халаты',
            'Термобелье',
            'Пижамы',
        ]
    },
    men:{
        title: 'Мужчины',
        category:[  
            'Трусы',
            'Носки',
            'Халаты',
            'Термобелье',
        ]
    }
}

const CatalogCategories=({data})=>(
    <ul className={s.categorySublist}>
        <li><h4 className={s.categorySubtitle}>{data.title}</h4></li>
        {data.category.map((el)=> <li><a className={s.link} href="/">{el}</a></li>)}
    </ul>
)

export const Catalog=()=>(
    <div className={s.category}>
        <h3 className={cn(s.categoryTitle, s.title)}>Каталог</h3>
        <ul className={s.categoryList}>
            <CatalogCategories data={data.women}/>
            <CatalogCategories data={data.men}/>
        </ul>
        
    </div>
);