import { useDispatch } from "react-redux";
import { Container } from "../../Layout/Container/Container.jsx";
import { Category } from "./Category/Category.jsx";
import { Gender } from "./Gender/Gender.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setActiveGender } from "../../../features/navigationSlice.js";

export const Navigation =()=>{
    const dispath = useDispatch();
    const location= useLocation();
    const gender= location.pathname.split('/')[1] || 'women';

    useEffect(()=>{
        dispath(setActiveGender(gender));
    }, [gender, dispath]);

    return(
    <nav>
        <Container>
            <Gender/>
            <Category/>
        </Container>
    </nav>
)};