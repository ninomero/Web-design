import NoImage from '../../assets/img/src/no_image.png'

const ImageSwiper = (props) => {
    const images = props.images

    return (
        <div className='c-img'>
            {images.length === 0 ? (
                <div className='p-media-thumb'>
                    <img src={NoImage} alt="No Image" />
                </div>
            ) : (
                images.map(image => (
                    <div className='p-media__thumb' key={image.id}>
                        <img src={image.path} alt="商品画像" />
                    </div>
                ))
            )}
        </div>
    )
}

export default ImageSwiper