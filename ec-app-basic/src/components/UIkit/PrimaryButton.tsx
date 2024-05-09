import Button from '@mui/material/Button';

const PrimaryButton = ({ label, onClick }) => {
    return (
        <Button
            sx={{
                background: 'black',
                color: 'white',
                width: '50%',
                mx: 'auto'
            }}
            variant='contained'
            onClick={() => onClick()}>
            {label}
        </Button>
    )
}

export default PrimaryButton