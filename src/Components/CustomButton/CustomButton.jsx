import { Button } from "@mui/material"

const CustomButton = ({onClick, buttonText}) => {
    return (
        <Button
            type="submit"
            variant="outlined"
            onClick={onClick}
            sx={ {background: '#291111',
                border: '#767676 1px solid',
                color: '#ffffff',
                '&:hover': {
                    background: '#5d0e0e',
                    border: '#171414 1px solid',
                },
            } }>
                {buttonText}
        </Button>
    )
}

export default CustomButton;