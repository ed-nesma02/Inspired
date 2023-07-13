import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setPage } from "../features/goodsSlice";

export const usePageFromSearchParams = (dispath)=>{
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pageURL = searchParams.get('page');

    useEffect(()=>{
        dispath(setPage(pageURL));
    }, [dispath, pageURL])

    return pageURL
}