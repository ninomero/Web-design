import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import { FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import { useUser } from '../../templates/UserContext';

const SizeTable = ({ addProduct, sizes }) => {
    const [userInfo] = useUser()

    return (
        <TableContainer sx={{
            "@media screen and (max-width:782px)": {
                width: "390px",
            },
        }}>
            <Table>
                <TableBody>
                    {sizes.length > 0 && (
                        sizes.map(s => (
                            <TableRow key={s.size}>
                                <TableCell component="th" scope='row'>
                                    {s.size}
                                </TableCell>
                                <TableCell>
                                    {s.quantity === 0 ?
                                        (<>
                                            残り{s.quantity}点
                                        </>)
                                        : (<>
                                            在庫あり
                                        </>)
                                    }

                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {s.quantity > 0 && userInfo.length !== 0 && userInfo !== null && userInfo !== undefined ? (
                                        <IconButton onClick={() => addProduct(s.size, "add")}>
                                            <ShoppingCart />
                                        </IconButton>
                                        // <PrimaryButton label={'買い物かごに追加'} onClick={() => addProduct(s.size, "add")} />
                                    ) : (
                                        <div>-</div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {userInfo.length !== 0 && userInfo !== null && userInfo !== undefined ? (
                                        <IconButton onClick={() => addProduct(s.size, "fav")}>
                                            <FavoriteBorder />
                                        </IconButton>
                                    ) : (
                                        <div>-</div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SizeTable