import { Navigation } from "./Navigation/Navigation.jsx";
import { Top } from "./Top/Top.jsx";
import s from "./Header.module.scss";

export const Header = ()=>(
    <header className={s.header}>
        <Top/>
        <Navigation/>
    </header>
);