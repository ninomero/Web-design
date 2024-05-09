import { FC, createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

// 型
import { FavObject, UserObject } from "../function/types";

// Context オブジェクトを生成する
const CartContext = createContext<FavObject | undefined>(undefined);
const UserContext = createContext<UserObject | undefined>(undefined);
const FavContext = createContext({});
const OrderContext = createContext({});


// Contextを提供する関数
// 将来的にはreducerを使用した形に変える
// React18からReact.FCで暗黙の{children}は渡せない,childrenを取るには明示的に書く
export const ContextProvider: FC<{children: React.ReactNode}> = (props) => {
    const { children } = props;

    console.log("ContextProviderをレンダリング")
    // ユーザ情報
    const [userInfo, setUserInfo] = useState();
    // 商品情報
    const [userCart, setUserCart] = useState<FavObject>();
    // お気に入り
    const [favItems, setFavItems] = useState([])
    // 購入履歴
    const [orders, setOrders] = useState([])

    useEffect(() => {
        let user;
        (async () => {
            user = auth.currentUser;
        })()

        if (user !== null && user !== undefined) {
            setUserInfo(user)
        }
    }, [])

    const values = {userInfo, setUserInfo}

    return (
        // <CartContext.Provider value={values}>
            <UserContext.Provider value={[userInfo, setUserCart]}>
                <FavContext.Provider value={[favItems, setFavItems]}>
                    <OrderContext.Provider value={[orders, setOrders]}>
                        {children}
                    </OrderContext.Provider>
                </FavContext.Provider>
            </UserContext.Provider>
        // </CartContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}

export function useCart() {
    return useContext(CartContext)
}

export function useFav() {
    return useContext(FavContext)
}

export function useOrder() {
    return useContext(OrderContext)
}