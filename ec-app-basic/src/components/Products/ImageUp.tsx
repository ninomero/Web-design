import React, { useCallback } from 'react'
import ImagePreview from './ImagePreview';

import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';

import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const ImageUp = ({images, setImages}) => {

    const deleteImage = useCallback(async (id) => {
        const ret = window.confirm('この画像を削除しますか?')
        if (!ret) {
            return false
        } else {
            const newImages = images.filter(image => image.id !== id)
            setImages(newImages);
            const desertRef = ref(storage, id)
            return deleteObject(desertRef)
        }
    }, [images, setImages])

    const uploadImage = useCallback((event) => {
        const file = event.target.files;
        let blob = new Blob(file, { type: "image/jpeg" })

        // 16桁のランダムな文字列を生成する
        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const N = 16
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('')

        const uploadRef = ref(storage, fileName)
        const uploadTask = uploadBytes(uploadRef, blob)

        uploadTask.then(() => {
            getDownloadURL(ref(storage, fileName)).then((downloadURL) => {
                const newImage = { id: fileName, path: downloadURL }
                setImages((prevState => [...prevState, newImage]))
            })
        })

    }, [setImages])
    return (
        <>
            <div className='p-grid__list-images'>
                {images.length > 0 && (
                    images.map(image => <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} />)
                )} </div>
            <div className='u-text-right'>
                <span>商品画像を登録する</span>
                <IconButton>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input className='u-display-none' type='file' id='image' onChange={e => uploadImage(e)} />
                    </label>
                </IconButton>
            </div>
        </>
    )
}

export default ImageUp