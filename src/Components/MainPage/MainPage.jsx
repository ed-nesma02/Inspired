import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategory, fetchGender } from "../../features/goodsSlice";
import { setActiveGender } from "../../features/navigationSlice";
import { Goods } from "../Goods/Goods";
import { Banner } from "../Banner/Banner";

export const MainPage=()=>{
    const {gender='women', category} = useParams();
    const dispath = useDispatch();
    const {activeGender, categories}=useSelector(state=>state.navigation);
    const genderData = categories[activeGender];

    useEffect(()=>{
        dispath(setActiveGender(gender));
    },[gender, dispath])

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
        <Banner data={genderData?.banner} category={category}/>
        <Goods categoryData={genderData?.list.find(item => item.slug === category)}/>
        </>
    )
}