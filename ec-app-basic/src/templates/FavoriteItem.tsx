import React from 'react'
import { useNavigate } from 'react-router';

import { Fav } from '../components/Products';
import { useUser, useFav } from './UserContext';

import { Divider } from '@mui/material'
import { PrimaryButton } from '../components/UIkit';
import ReccomendLogin from './ReccomendLogin';

const FavoriteItem = () => {
    const navigate = useNavigate()
    const [userInfo] = useUser()
    const [favItems] = useFav()

    // 商品一覧ページに飛ばす
    const backToHome = () => {
        navigate('/')
    }

    return (
        <>
            {userInfo.length !== 0 && userInfo !== null && userInfo !== undefined ?
                (
                    favItems.length > 0 ?
                        (<section className='c-section-wrapin'>
                            <h2 className='u-text__headline'>
                                お気に入り
                            </h2>
                            <Divider />
                            {favItems.map(favItem => <Fav favItem={favItem.product} key={favItem.product.favId} />)}
                            <div className='module-spacer--extra-extra-small'></div>
                            <PrimaryButton label={"ショッピングを続ける"} onClick={backToHome} />
                        </section>
                        )
                        : (<section className='c-section-wrapin'>
                            <h2 className='u-text__headline'>
                                お気に入り
                            </h2>
                            <Divider />
                            <div className="non-msg">お気に入りが存在しません</div>
                            <div div className='module-spacer--extra-extra-small'></div >
                            <PrimaryButton label={"ショッピングを続ける"} onClick={backToHome} />
                        </section>
                        )
                )
                :
                (
                    <ReccomendLogin />
                )
            }
        </>
    )
}

export default FavoriteItem