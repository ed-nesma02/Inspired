import { useEffect, useState } from 'react'
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

export const ProductPage = ()=>{
    const dispath = useDispatch();
    const {id} =useParams();
    const {product} = useSelector(state=>state.product)

    const [count, setCount]=useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const handleIncrement =()=>{
        setCount((prevCount) => ++prevCount)
    }
    const handleDecrement =()=>{
        if(count>1){
            setCount((prevCount) => --prevCount)
        }
    }

    const handleColorChange = (e)=>{
        setSelectedColor(e.target.value);
    }
    const handleSizeChange = (e)=>{
        setSelectedSize(e.target.value);
    }

    useEffect(()=>{
        dispath(fetchProduct(id));
    },[dispath, id])

    useEffect(()=>{
        dispath(setActiveGender(product.gender));
        dispath(fetchCategory({gender:product.gender, category:product.category,count:'4', top:'true', exclude:product.id}));
    },[product, dispath])
    
    return(
        <>
        <section className={s.card}>
            <Container className={s.container}>
                <img src={`${API_URL}/${product.pic}`} alt={`${product.title} ${product.description}`} className={s.image} />
                <form action="" className={s.content}>
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
                        <ColorList colors={product.colors} 
                            selectedColor={selectedColor} 
                            handleColorChange={handleColorChange}/>
                    </div>
                    <ProductSize 
                        size = {product.size}
                        selectedSize={selectedSize} 
                        handleSizeChange={handleSizeChange}/>
                    <div className={s.description}>
                        <p className={cn(s.subtitle, s.descriptionTitle)}>Описание</p>
                        <p className={s.descriptionText}>{product.description}</p>
                    </div>
                    <div className={s.control}>
                        <Count classNames={s.count} count={count} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
                        <button className={s.addCart} type='submit'>В корзину</button>
                        <button className={s.favorite} aria-label='Добавить в избранное' type='button'>
                            <BtnLike id={id}/>
                        </button>
                    </div>
                </form>
            </Container>
        </section>
        <Goods title='Вам также может понравиться'/>
        </>
)}