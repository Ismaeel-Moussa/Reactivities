import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Avatar,
    CircularProgress,
    Paper,
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
                borderRadius: 2,
                mb: 3,
            }}
        >
            {/* Header with gradient */}
            <Box
                sx={{
                    background:
                        'linear-gradient(135deg, #163273ff 0%, #1e3a5f 50%, #0d9488 100%)',
                    color: 'white',
                    padding: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.5,
                }}
            >
                <ChatIcon sx={{ fontSize: 28 }} />
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        letterSpacing: 0.5,
                    }}
                >
                    Chat about this event
                </Typography>
            </Box>

            <CardContent sx={{ p: 3 }}>
                {/* Comments List */}
                <Box
                    sx={{
                        height: 370,
                        overflow: 'auto',
                        mb: 3,
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
                            }}
                        >
                            <Typography variant="body2">
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
                                    p: 2,
                                    mb: 2,
                                    backgroundColor: 'action.hover',
                                    borderRadius: 2,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'action.selected',
                                        transform: 'translateX(4px)',
                                    },
                                }}
                            >
                                <Avatar
                                    component={Link}
                                    to={`/profiles/${comment.userId}`}
                                    src={comment.imageUrl}
                                    alt={comment.displayName}
                                    sx={{
                                        mr: 2,
                                        width: 44,
                                        height: 44,
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
                                            gap: 1.5,
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
                                                fontSize: '0.75rem',
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
                    }}
                >
                    <TextField
                        {...register('body', { required: true })}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                        onKeyDown={handleKeyPress}
                        disabled={isSubmitting}
                        slotProps={{
                            input: {
                                endAdornment: isSubmitting ? (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: 'primary.main',
                                        }}
                                    />
                                ) : null,
                                sx: {
                                    backgroundColor: 'background.paper',
                                    '&:hover': {
                                        backgroundColor: 'background.paper',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'background.paper',
                                    },
                                    width: '99%',
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
                    <Typography
                        variant="caption"
                        sx={{
                            display: 'block',
                            mt: 0.5,
                            color: 'text.secondary',
                            fontSize: '0.8rem',
                        }}
                    >
                        Press Enter to send • Shift + Enter for new line
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
});

export default ActivityDetailsChat;
