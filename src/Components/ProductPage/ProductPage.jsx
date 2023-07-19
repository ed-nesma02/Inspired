import { useEffect, useRef, useState } from 'react'
import {Container} from '../Layout/Container/Container'
import s from './ProductPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../features/productSlice'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../const'
import cn from 'classnames'
import {ColorList} from '../ColorList/ColorList'
import { Count } from '../Count/Count'
import { ProductSize } from '../ProductSize/ProductSize'
import { Goods } from '../Goods/Goods'
import { fetchCategory } from '../../features/goodsSlice'
import { setActiveGender } from '../../features/navigationSlice'
import { BtnLike } from '../BtnLike/BtnLike'
import { addToCart } from '../../features/cartSlice'
import { Preloader } from '../Preloader/Preloader'

export const ProductPage = ()=>{
    const dispatch = useDispatch();
    const {id} =useParams();
    const {product, status} = useSelector(state=>state.product)
    const {colors} = product;
    const {colorList}=useSelector(state=>state.color); 
    const addStatus = useRef()

    const [count, setCount]=useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [formError, setFormError] = useState(true);

    const handleIncrement =()=>{
        setCount((prevCount) => ++prevCount)
        addStatus.current.style.setProperty("--visible-status", "hidden")
    };
    const handleDecrement =()=>{
        if(count>1){
            setCount((prevCount) => --prevCount)
            addStatus.current.style.setProperty("--visible-status", "hidden")
        }
    };

    const handleColorChange = (e)=>{
        setSelectedColor(e.target.value);
        addStatus.current.style.setProperty("--visible-status", "hidden")
    };
    const handleSizeChange = (e)=>{
        setSelectedSize(e.target.value);
        setFormError(true);
        addStatus.current.style.setProperty("--visible-status", "hidden")
    };

    useEffect(()=>{
        dispatch(fetchProduct(id));
        setCount(1);
        setSelectedColor("");
        setSelectedSize("");
    },[dispatch, id]);

    useEffect(()=>{
        dispatch(setActiveGender(product.gender));
        dispatch(fetchCategory({gender:product.gender, category:product.category,count:'4', top:'true', exclude:product.id}));
    },[product, dispatch]);

    useEffect(()=>{
        if(colorList?.length && colors?.length){
            setSelectedColor(colorList.find(color => color.id === colors[0]).title)
        }
    }, [colorList, colors]);
    
    return status==="loading" ? <Preloader/> : (
        <>
        <section className={s.card}>
            <Container className={s.container}>
                <img src={product.pic ? `${API_URL}/${product.pic}` : ''} alt={`${product.title} ${product.description}`} className={s.image} />
                <form action="" className={s.content} onSubmit={e =>{
                    e.preventDefault();
                    if(selectedSize && selectedColor && count){
                        setFormError(true);
                        addStatus.current.style.setProperty("--visible-status", "visible")
                        dispatch(addToCart({
                        id, color: selectedColor, size: selectedSize, count
                    }))} else {
                        setFormError(false);
                    }
                    console.log(formError)
                }}>
                    <h2 className={s.title}>
                        {product.title}
                    </h2>
                    <p className={s.price}>РУБ {product.price}</p>
                    <div className={s.vendorCode}>
                        <span className={s.subtitle}>Артикул</span>
                        <span className={s.id}>{product.id}</span>
                    </div>
                    <div className={s.color}>
                        <p className={cn(s.subtitle, s.colorTitle)}>Цвет</p>
                        <ColorList colors={colors} 
                            selectedColor={selectedColor} 
                            handleColorChange={handleColorChange}/>
                    </div>
                    <ProductSize 
                        formError ={formError}
                        size = {product.size}
                        selectedSize={selectedSize} 
                        handleSizeChange={handleSizeChange}/>
                    <div className={s.description}>
                        <p className={cn(s.subtitle, s.descriptionTitle)}>Описание</p>
                        <p className={s.descriptionText}>{product.description}</p>
                    </div>
                    <div className={s.control}>
                        <Count classNames={s.count} count={count} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
                        <button className={s.addCart} ref={addStatus} style={{"--visible-status": "hidden"}} type='submit'>В корзину</button>
                        <BtnLike id={id}/>
                    </div>
                </form>
            </Container>
        </section>
        <Goods title='Вам также может понравиться'/>
        </>
)}