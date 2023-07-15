import { NavLink, useLocation } from 'react-router-dom'
import s from './Pagination.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { ReactComponent as ArrowRight } from "../../assets/arrow_right.svg"
import { ReactComponent as ArrowLeft } from "../../assets/arrow_left.svg"
import { usePageFromSearchParams } from '../../hooks/usePageFromSearchParams';
import { useEffect, useState } from 'react';

export const Pagination = ()=>{
    const pathname =  useLocation().pathname;
    const {page, pages} = useSelector(state=>state.goods);
    const [pagePagination, setPagePagination] = useState('');
    const dispath = useDispatch();
    const pageActive = usePageFromSearchParams(dispath);

    useEffect(()=>{
        setPagePagination(page);
    }, [page, setPagePagination])

    const handlePageChange = (NewPage =>{
        setPagePagination(NewPage);
    })
    const handlePrevPage =()=>{
        if(pagePagination>1){
            handlePageChange(pagePagination - 1);
        }
    }
    const handleNextPage = ()=>{
        if(pagePagination<pages){
            handlePageChange(pagePagination + 1);
        }
    }

    const renderPaginationItems = ()=>{
        const paginationItems = [];
        let startPage = Math.max(1, pagePagination - 1);
        let endPage = Math.min(startPage + 2, pages);
        if(pages === pagePagination && pages>=3){
            startPage = pagePagination-2;
        }

        for(let i = startPage; i <= endPage; i++){
            paginationItems.push(
                <li key={i} className={s.item}>
                    <NavLink 
                    to={`${pathname}?page=${i}`}
                    className={cn(s.link, i === +pageActive  ? s.linkActive : '')}
                    onClick={() => handlePageChange(i)}
                    >
                    {i}
                    </NavLink>
                </li>
            )
        }
        return paginationItems;
    }

    return pages!==1 && (
        <div className={s.pagination}>
            {pages>3 && 
            <button 
                className={s.arrow} 
                onClick={handlePrevPage} 
                disabled={pagePagination <= 2} 
            >
                <ArrowLeft/>
            </button>}
            <ul className={s.list}>{renderPaginationItems()}</ul>
            {pages>3 && 
            <button 
                className = {s.arrow} 
                onClick = {handleNextPage}
                disabled = {pagePagination >= pages-1 || pages <= 3 } 
            >
                <ArrowRight/>
            </button>}
        </div>
    )
}