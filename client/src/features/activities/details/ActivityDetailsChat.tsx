import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Avatar,
    CircularProgress,
    Paper,
    Button,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { Link, useParams } from 'react-router';
import { useComments } from '../../../lib/hooks/useComments';
import { timeAgo } from '../../../lib/util/util';
import { useForm, type FieldValues } from 'react-hook-form';
import { observer } from 'mobx-react-lite';

const ActivityDetailsChat = observer(() => {
    const { id } = useParams();
    const { commentStore } = useComments(id);
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const AddComment = async (data: FieldValues) => {
        try {
            await commentStore.hubConnection?.invoke('SendComment', {
                activityId: id,
                body: data.body,
            });
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(AddComment)();
        }
    };

    return (
        <Card
            elevation={3}
            sx={{
                overflow: 'hidden',
                borderRadius: isMobile ? 2 : 2,
                mb: isMobile ? 2 : 3,
            }}
        >
            {/* Header with gradient */}
            <Box
                sx={{
                    background:
                        'linear-gradient(135deg, #163273ff 0%, #1e3a5f 50%, #0d9488 100%)',
                    color: 'white',
                    padding: isMobile ? 2 : 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isMobile ? 1 : 1.5,
                }}
            >
                <ChatIcon sx={{ fontSize: isMobile ? 24 : 28 }} />
                <Typography
                    variant={isMobile ? 'body1' : 'h6'}
                    sx={{
                        fontWeight: 600,
                        letterSpacing: 0.5,
                    }}
                >
                    Chat about this event
                </Typography>
            </Box>

            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                {/* Comments List */}
                <Box
                    sx={{
                        height: isMobile ? 250 : 370,
                        overflow: 'auto',
                        mb: isMobile ? 2 : 3,
                        pr: 1,
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.3)',
                            },
                        },
                    }}
                >
                    {commentStore.comments.length === 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                color: 'text.secondary',
                                px: 2,
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: 'center',
                                    fontSize: isMobile ? '0.85rem' : '0.875rem',
                                }}
                            >
                                No comments yet. Be the first to comment!
                            </Typography>
                        </Box>
                    ) : (
                        commentStore.comments.map((comment) => (
                            <Paper
                                key={comment.id}
                                elevation={0}
                                sx={{
                                    display: 'flex',
                                    p: isMobile ? 1.5 : 2,
                                    mb: isMobile ? 1.5 : 2,
                                    backgroundColor: 'action.hover',
                                    borderRadius: 2,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'action.selected',
                                        transform: isMobile
                                            ? 'none'
                                            : 'translateX(4px)',
                                    },
                                }}
                            >
                                <Avatar
                                    component={Link}
                                    to={`/profiles/${comment.userId}`}
                                    src={comment.imageUrl}
                                    alt={comment.displayName}
                                    sx={{
                                        mr: isMobile ? 1.5 : 2,
                                        width: isMobile ? 36 : 44,
                                        height: isMobile ? 36 : 44,
                                        border: '2px solid',
                                        borderColor: 'primary.main',
                                        transition: 'transform 0.2s ease',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                />
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            gap: isMobile ? 1 : 1.5,
                                            mb: 0.5,
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <Typography
                                            component={Link}
                                            to={`/profiles/${comment.userId}`}
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                textDecoration: 'none',
                                                color: 'primary.main',
                                                transition: 'color 0.2s ease',
                                                fontSize: isMobile
                                                    ? '0.85rem'
                                                    : '0.875rem',
                                                '&:hover': {
                                                    color: '#008793',
                                                    textDecoration: 'underline',
                                                },
                                            }}
                                        >
                                            {comment.displayName}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: isMobile
                                                    ? '0.7rem'
                                                    : '0.75rem',
                                            }}
                                        >
                                            {timeAgo(comment.createdAt)}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                            lineHeight: 1.6,
                                            color: 'text.primary',
                                            fontSize: isMobile
                                                ? '0.85rem'
                                                : '0.875rem',
                                        }}
                                    >
                                        {comment.body}
                                    </Typography>
                                </Box>
                            </Paper>
                        ))
                    )}
                </Box>

                {/* Comment Input Form */}
                <Box
                    component="form"
                    onSubmit={handleSubmit(AddComment)}
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        gap: isMobile ? 1 : 2,
                        alignItems: 'flex-start',
                    }}
                >
                    <TextField
                        {...register('body', { required: true })}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={1}
                        placeholder={
                            isMobile
                                ? 'Add a comment...'
                                : 'Enter your comment...'
                        }
                        onKeyDown={handleKeyPress}
                        disabled={isSubmitting}
                        slotProps={{
                            input: {
                                sx: {
                                    backgroundColor: 'background.paper',
                                    fontSize: isMobile ? '0.9rem' : '1rem',
                                    '&:hover': {
                                        backgroundColor: 'background.paper',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'background.paper',
                                    },
                                },
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#008793',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#008793',
                                    borderWidth: 2,
                                },
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                            px: isMobile ? 1 : 1,
                            py: isMobile ? 1.6 : 1.25,
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: isMobile ? '0.9rem' : '0.875rem',
                            background:
                                'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                            boxShadow: '0 4px 12px rgba(13, 148, 136, 0.4)',
                            minWidth: isMobile ? 80 : 100,
                            height: isMobile ? 'auto' : '56px',
                            '&:hover': {
                                background:
                                    'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 16px rgba(13, 148, 136, 0.5)',
                            },
                            '&:disabled': {
                                background: 'rgba(0, 0, 0, 0.12)',
                            },
                        }}
                    >
                        {isSubmitting ? (
                            <CircularProgress
                                size={25}
                                sx={{ color: 'white' }}
                            />
                        ) : (
                            'Add'
                        )}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
});

export default ActivityDetailsChat;
