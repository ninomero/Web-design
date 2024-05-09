import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router';

import { ImageUp, SetSizeArea } from '../components/Products';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit'

// Firebaseの商品登録を読み込んでいる
import { saveProduct, user } from '../firebase';
import { useUser } from './UserContext';
import ReccomendLogin from './ReccomendLogin';

import { Divider } from '@mui/material'

const ProductEdit = () => {
    const [userInfo] = useUser()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [gender, setGender] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([]);
    const [sizes, setSizes] = useState([]);

    const inputName = useCallback((e) => {
        setName(e.target.value)
    }, [setName]);

    const inputDescription = useCallback((e) => {
        setDescription(e.target.value)
    }, [setDescription]);

    const inputPrice = useCallback((e) => {
        setPrice(e.target.value)
    }, [setPrice]);

    const categorys = [
        { id: "tops", name: "トップス" },
        { id: "shirts", name: "シャツ" },
        { id: "pants", name: "パンツ" }
    ]

    const genders = [
        { id: "all", name: "すべて" },
        { id: "male", name: "メンズ" },
        { id: "female", name: "レディース" }
    ]

    return (
        <section>
            {userInfo.length !== 0 && userInfo !== null && userInfo !== undefined ? (
                <div>
                    <h2 className='u-text__headline u-text-center'>商品の登録・編集</h2>
                    <Divider />
                    <div className='c-section-container'>
                        <ImageUp images={images} setImages={setImages} />
                        <TextInput
                            fullWidth={true} label={"商品"} multiline={false} required={true}
                            rows={2} value={name} type={"text"} onChange={inputName}
                        />
                        <TextInput
                            fullWidth={true} label={"商品説明"} multiline={true} required={true}
                            rows={5} value={description} type={"text"} onChange={inputDescription}
                        />
                        <SelectBox
                            label={"性別"} required={true} options={genders} select={setGender}
                            value={gender}
                        >
                        </SelectBox>
                        <SelectBox
                            label={"カテゴリー"} required={true} options={categorys} select={setCategory}
                            value={category}

                        >
                        </SelectBox>
                        <TextInput
                            fullWidth={true} label={"価格"} multiline={false} required={true}
                            rows={2} value={price} type={"number"} onChange={inputPrice}
                        />
                        <SetSizeArea sizes={sizes} setSizes={setSizes} />

                        <div className="module-spacer--medium" />
                        <div className='center'>
                            <PrimaryButton label={"商品情報登録"}
                                onClick={() => saveProduct(name, description, gender, category, price, sizes, images)}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <ReccomendLogin />
            )}

        </section>
    )
}

export default ProductEdit