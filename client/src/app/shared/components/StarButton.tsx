import { Star, StarBorder } from '@mui/icons-material';
import { Box, Button, type ButtonProps } from '@mui/material';

type Props = ButtonProps;

type StarButtonProps = Props & {
    selected: boolean;
};

export default function StarButton({ selected, ...rest }: StarButtonProps) {
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
                    <StarBorder
                        sx={{
                            fontSize: 35,
                            color: 'white',
                            position: 'absolute',
                        }}
                    />
                    <Star
                        sx={{
                            fontSize: 35,
                            color: selected
                                ? 'rgba(255, 238, 0, 1)'
                                : 'rgba(0, 0, 0, 0.75)',
                        }}
                    />
                </Button>
            </Box>
        </>
    );
}
