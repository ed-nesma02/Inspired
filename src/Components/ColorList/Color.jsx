import { createRef, useEffect, useRef } from 'react'
import s from './Color.module.scss'
import cn from 'classnames';

export const Color = ({color, check})=>{
    const dataItem = useRef();

    const clickColor = () => {
        const active = dataItem.current; 
        const parent = active.parentElement.childNodes;
        for(let node of parent){
            node.className = s.color;
        }
        active.classList.add(s.colorCheck);
    };

    return(
        <li style={{"--data-color": color}} onClick={clickColor} ref={dataItem} className={cn(s.color, check && s.colorCheck)}></li>
    ) 
}