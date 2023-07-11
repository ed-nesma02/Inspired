import { useEffect, useRef } from 'react';
import s from './ProductSize.module.scss'

export const ProductSize= ({size, selectedSize, handleSizeChange})=>{

    return(
        <div className={s.size}>
            <p className={s.title}>Размер</p>
            <ul className={s.list}>
                {size?.map(item=>{
                    return(
                    <label key={item} className={s.item}>
                        <input 
                            className={s.input}
                            type='radio' 
                            name='size'
                            value={item}
                            checked={selectedSize ? selectedSize===item : ''}
                            onChange={handleSizeChange}
                        />
                        <span className={s.check}>{item}</span>
                    </label>
                    )
                })}
            </ul>
        </div>
    )
}