import { useNavigate } from 'react-router-dom'
import { Container } from '../Layout/Container/Container'
import s from './Search.module.scss'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { toggleSearch } from '../../features/searchSlice'

export const Search = ()=>{
    const {openSearch} = useSelector(state=> state.search);
    const validationSchema = Yup.object({
        search: Yup.string().required("Поле не может быть пустым")
    })

    const navigate = useNavigate();
    const dispath = useDispatch();
    const handleSubmit= ({search}, {resetForm}) => {
        if(search.trim()){
            navigate(`search?q=${search}`);
            resetForm();
            dispath(toggleSearch(false));
        }
    };

    return openSearch && (
        <div className={s.search}>
            <Container>
                <Formik 
                initialValues={{ 
                    search:'',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                    <Form className={s.form}>
                        <Field 
                            className={s.input} 
                            type="search" 
                            name='search' 
                            placeholder='Найти...' 
                        />
                        <ErrorMessage name='search' className={s.error} component={"p"} />
                        <button className={s.btn} type='submit' >Submit</button>
                    </Form>
                </Formik>
            </Container>
        </div>
    )
}