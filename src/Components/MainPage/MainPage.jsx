import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategory, fetchGender } from "../../features/goodsSlice";
import { setActiveGender } from "../../features/navigationSlice";
import { Goods } from "../Goods/Goods";
import { Banner } from "../Banner/Banner";

export const MainPage=()=>{
    const {gender, category} = useParams();
    const dispath = useDispatch();
    const {activeGender, categories, genderList}=useSelector(state=>state.navigation);
    const genderData = categories[activeGender];
    const categoryData=genderData?.list.find(item => item.slug === category);

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
            dispath(fetchCategory({gender, category}));
            return;
        }
        if(gender){
            dispath(fetchGender(gender));
            return;
        }
    },[gender, category ,dispath])

    return (
        <>
        {!category && genderData?.banner && <Banner data={genderData?.banner} category={category}/>}
        <Goods categoryData={categoryData}/>
        </>
    )
}