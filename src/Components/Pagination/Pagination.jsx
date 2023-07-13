import { NavLink, useLocation } from 'react-router-dom'
import s from './Pagination.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { setPage } from '../../features/goodsSlice';
import { ReactComponent as ArrowRight } from "../../assets/arrow_right.svg"
import { ReactComponent as ArrowLeft } from "../../assets/arrow_left.svg"
import { usePageFromSearchParams } from '../../hooks/usePageFromSearchParams';

export const Pagination = ()=>{
    const pathname =  useLocation().pathname;
    const {page, pages} = useSelector(state=>state.goods);
    const dispath = useDispatch();
    const pageActive = usePageFromSearchParams(dispath);

    const handlePageChange = (NewPage =>{
        dispath(setPage(NewPage));
    })
    const handlePrevPage =()=>{
        if(page>1){
            handlePageChange(page - 1);
        }
    }
    const handleNextPage = ()=>{
        if(page<pages){
            handlePageChange(page + 1);
        }
    }

    const renderPaginationItems = ()=>{
        const paginationItems = [];
        let startPage = Math.max(1, page - 1);
        let endPage = Math.min(startPage + 2, pages);
        if(pages===page && pages>=3){
            startPage = page-2;
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
                disabled={page <= 2} 
            >
                <ArrowLeft/>
            </button>}
            <ul className={s.list}>{renderPaginationItems()}</ul>
            {pages>3 && 
            <button 
                className={s.arrow} 
                onClick={handleNextPage}
                disabled = {page >= pages-1 || pages <= 3 } 
            >
                <ArrowRight/>
            </button>}
        </div>
    )
}