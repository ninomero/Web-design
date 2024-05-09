import React, { useCallback, useEffect, useState } from 'react'

import { TextInput } from "../UIkit";

import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SetSizeArea = ({sizes, setSizes}) => {

    const [index, setIndex] = useState(0),
        [size, setSize] = useState(""),
        [quantity, setQuantity] = useState(0);

    const inputSize = useCallback((event) => {
        setSize(event.target.value)
    }, [setSize]);

    const inputQuantity = useCallback((event) => {
        setQuantity(event.target.value)
    }, [setQuantity]);

    const addSize = (index, size, quantity) => {
        console.log(index)
        console.log(sizes.length)
        if (size === "" || quantity === 0) {
            // Required input is blank
            return false
        } else {
            if (index === sizes.length) {
                setSizes(prevState => [...prevState, {size: size, quantity: quantity}]);
                // propsのsizeが更新されるたびuseEffectが呼び出されてindexが修正されるので以下は呼び出さなくても問題ない
                // setIndex(index + 1);
                setSize("");
                setQuantity(0)
            } else {
                const newSizes = sizes;
                newSizes[index] = {size: size, quantity: quantity};
                setSizes(newSizes);
                setIndex(newSizes.length);
                setSize("");
                setQuantity(0);
            }
        }
    }

    // mapで付与されたindexに一致する配列要素の値をstateに設定する
    // その結果size列の長さとindexがずれるため正常に編集が行われる
    const editSize = (index, size, quantity) => {
        setIndex(index)
        setSize(size)
        setQuantity(quantity)
    }

    // mapで付与されたindexに一致する配列要素以外を抽出する
    // 抽出した結果でpropsのsize更新する
    // sizeが更新されたため、useEffectが呼び出されindexが配列の長さに設定される
    const deleteSize = (deleteIndex) => {
        const newSizes = sizes.filter((item, index) => index !== deleteIndex)
        setSizes(newSizes);
    }

    // propsのsizeが更新されるたび呼び出される
    useEffect(() => {
        setIndex(sizes.length)
    },[sizes.length])

    return (
        <div aria-label="サイズ展開">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>サイズ</TableCell>
                            <TableCell>数量</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sizes.length > 0 && (
                            // indexは 0から付与されると思われる
                            // そのためpropsのsize差異が生まれ編集ができるようになる
                            sizes.map((item, index) => (
                                <TableRow key={item.size}>
                                    <TableCell component="th" scope="row">{item.size}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell >
                                        <IconButton  onClick={() => editSize(index, item.size, item.quantity)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell >
                                        <IconButton  onClick={() => deleteSize(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fullWidth={false} label={"サイズ"} multiline={false} required={true}
                        onChange={inputSize} rows={1} value={size} type={"text"}
                    />
                    <TextInput
                        fullWidth={false} label={"数量"} multiline={false} required={true}
                        onChange={inputQuantity} rows={1} value={quantity} type={"number"}
                    />
                </div>
                <IconButton  onClick={() => addSize(index, size, quantity)}>
                    <CheckCircleIcon/>
                </IconButton>
            </TableContainer>
            <div className="module-spacer--small"/>
        </div>
    )
}

export default SetSizeArea