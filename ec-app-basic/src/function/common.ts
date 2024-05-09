import HTMLReactParser from 'html-react-parser';

// 正規表現を使用して「\r\n」を「<br/>」に変換する
export const returnCodeToBr = (text) => {
    if (text === "") {
        return text
    } else {
        return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
    }
};