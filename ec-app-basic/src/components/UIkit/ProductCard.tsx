import React from 'react'

// MUI Card
//https://mui.com/material-ui/react-card/

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const ProductCard = ({ name, price, images, id }) => {
    console.log("ProductCardをレンダリング")
    return (
        <div className='flex justify-center items-center w-auto h-full'>
            <Link to={`/product/${id}`}>
                <Card sx={{ maxWidth: 400, minWidth: 300 }}>
                    {images.map((image) => (
                        <CardMedia
                            sx={{ height: 300 }}
                            image={image.path}
                            title={name}
                            key={image.id}
                        />
                    )
                    )}

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <div>
                                {name}
                            </div>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {"￥" + price.toLocaleString()}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>

        </div>

    )
}

export default ProductCard