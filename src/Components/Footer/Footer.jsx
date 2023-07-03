import { Container } from "../Layout/Container/Container.jsx";
import { Catalog } from "./Catalog/Catalog.jsx";
import { Contacts } from "./Contacts/Contacts.jsx";
import { Copyright } from "./Copyright/Copyright.jsx";
import { Development } from "./Development/Development.jsx";
import s from './Footer.module.scss'
import { Social } from "./Social/Social.jsx";

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