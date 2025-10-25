import { Box, Button } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
export default function DeleteButton() {
    return (
        <>
            <Box sx={{ position: 'relative' }}>
                <Button
                    sx={{
                        opacity: 0.8,
                        transition: 'opacity 0.3s',
                        position: 'relative',
                        cursor: 'pointer',
                    }}
                >
                    <HighlightOffOutlinedIcon
                        sx={{
                            fontSize: 28,
                            color: '#ff2f2fff',
                        }}
                    />
                </Button>
            </Box>
        </>
    );
}
