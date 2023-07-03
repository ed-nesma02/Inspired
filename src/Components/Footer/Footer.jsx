import { Container } from "../Layout/Container/Container.jsx";
import { Catalog } from "./Catalog.jsx";
import { Contacts } from "./Contacts.jsx";
import { Copyright } from "./Copyright.jsx";
import { Development } from "./Development.jsx";
import s from './Footer.module.scss'
import { Social } from "./Social.jsx";

export const Footer=()=>(
    <footer>
        <Container className={s.container} >
            <Catalog/>
            <Social/>
            <Contacts/>
            <Copyright/>
            <Development/>
        </Container>
    </footer>
);