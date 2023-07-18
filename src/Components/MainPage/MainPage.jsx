import { useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategory, fetchGender } from "../../features/goodsSlice";
import { setActiveGender } from "../../features/navigationSlice";
import { Goods } from "../Goods/Goods";
import { Banner } from "../Banner/Banner";
import { usePageFromSearchParams } from "../../hooks/usePageFromSearchParams";
import { Preloader } from "../Preloader/Preloader";

export const MainPage=()=>{
    const {gender, category} = useParams();
    const dispath = useDispatch();
    const {activeGender, categories, genderList}=useSelector(state=>state.navigation);
    const {status}=useSelector(state=>state.goods) 
    const genderData = categories[activeGender];
    const categoryData=genderData?.list.find(item => item.slug === category);
    const page = usePageFromSearchParams(dispath);
    
    useEffect(()=>{
        if(gender){
            dispath(setActiveGender(gender));
        }else if(genderList[0]){
            dispath(setActiveGender(genderList[0]));
            dispath(fetchGender(genderList[0]));
        }

    },[gender, dispath, genderList])

    useEffect(()=>{
        if(gender && category){
            const param = {gender, category};
            if(page){
                param.page = page;
            }
            dispath(fetchCategory(param))
            return;
        }
        if(gender){
            dispath(fetchGender(gender));
            return;
        }
    },[page, gender, category ,dispath])

    return ( status==='loading' ?
         <Preloader/> 
        :
        (<>
        {!category && genderData?.banner && <Banner data={genderData?.banner} category={category}/>}
        <Goods title={categoryData?.title}/>
        </>)
    )
}