import { Box, Button, type ButtonProps } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

type Props = ButtonProps;

export default function DeleteButton({ ...rest }: Props) {
    return (
        <>
            <Box sx={{ position: 'relative' }}>
                <Button
                    {...rest}
                    sx={{
                        opacity: 0.8,
                        transition: 'opacity 0.3s',
                        position: 'relative',
                        cursor: 'pointer',
                    }}
                >
                    <HighlightOffOutlinedIcon
                        sx={{
                            fontSize: 35,
                            color: '#ff0000ff',
                            bgcolor: '#ffffffbe',
                            borderRadius: '50%',
                        }}
                    />
                </Button>
            </Box>
        </>
    );
}
