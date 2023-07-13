import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { MainPage } from "./Components/MainPage/MainPage.jsx";
import { Root } from "./routes/Root.jsx";
import { ErrorPage } from "./Components/ErrorPage/ErrorPage.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchNavigation } from "./features/navigationSlice.js";
import { fetchColors } from "./features/colorsSlice.js";
import { ProductPage } from "./Components/ProductPage/Productpage.jsx";
import { FavoritePage } from "./Components/FavoritePage/FavoritePage.jsx";
import { CartPage } from "./Components/CartPage/CartPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<MainPage />} />
      <Route path="/favorite" element={<FavoritePage/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/product/:id" element={<ProductPage/>} />
      <Route path="/catalog/:gender/:category?" element={<MainPage/>} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export const App=()=>{
  const dispath= useDispatch();
  
  useEffect(()=>{
    dispath(fetchNavigation());
    dispath(fetchColors());
  }, [dispath]);

  return <RouterProvider router={router}></RouterProvider>
}
