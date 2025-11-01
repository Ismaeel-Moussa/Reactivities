import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';
import {
    Box,
    Button,
    Divider,
    Typography,
    Fade,
    Paper,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import ProfileEditForm from './ProfileEditForm';
import { useState } from 'react';
import { Edit, Info } from '@mui/icons-material';

export default function ProfileAbout() {
    const { id } = useParams();
    const { profile, isCurrentUser } = useProfile(id);
    const [editMode, setEditMode] = useState(false);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box>
            {/* Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={{ xs: 1.5, sm: 0 }}
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                    >
                        About {profile?.displayName}
                    </Typography>
                </Box>
                {isCurrentUser && (
                    <Button
                        onClick={() => setEditMode(!editMode)}
                        variant={editMode ? 'outlined' : 'contained'}
                        startIcon={<Edit />}
                        fullWidth={isXs ? true : false}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 2,
                            fontSize: { xs: '0.85rem', md: '0.95rem' },
                            ...(editMode
                                ? {
                                      borderColor: '#28969c',
                                      color: '#28969c',
                                  }
                                : {
                                      bgcolor: '#28969c',
                                      '&:hover': {
                                          bgcolor: '#227278',
                                      },
                                  }),
                        }}
                    >
                        {editMode ? 'Cancel' : 'Edit Profile'}
                    </Button>
                )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Content */}
            <Box
                sx={{
                    overflow: 'auto',
                    maxHeight: { xs: 450, md: 380 },
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#28969c',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#227278',
                    },
                }}
            >
                {editMode ? (
                    <Fade in={editMode}>
                        <Box>
                            <ProfileEditForm setEditMode={setEditMode} />
                        </Box>
                    </Fade>
                ) : (
                    <Fade in={!editMode}>
                        <Box>
                            {profile?.bio ? (
                                <Typography
                                    variant="body1"
                                    sx={{
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: 1.8,
                                        color: 'text.primary',
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                    }}
                                >
                                    {profile.bio}
                                </Typography>
                            ) : (
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: { xs: 3, md: 4 },
                                        py: { xs: 8, md: 12 },
                                        textAlign: 'center',
                                        bgcolor: 'rgba(40, 150, 156, 0.04)',
                                        border: '1px dashed',
                                        borderColor: 'rgba(40, 150, 156, 0.3)',
                                        borderRadius: 2,
                                    }}
                                >
                                    <Info
                                        sx={{
                                            fontSize: { xs: 40, md: 48 },
                                            color: 'text.secondary',
                                            opacity: 0.5,
                                            mb: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        gutterBottom
                                        sx={{
                                            fontSize: {
                                                xs: '0.9rem',
                                                md: '1rem',
                                            },
                                        }}
                                    >
                                        No bio added yet
                                    </Typography>
                                    {isCurrentUser && (
                                        <>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                mb={2}
                                                sx={{
                                                    fontSize: {
                                                        xs: '0.8rem',
                                                        md: '0.875rem',
                                                    },
                                                }}
                                            >
                                                Share a little bit about
                                                yourself
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                onClick={() =>
                                                    setEditMode(true)
                                                }
                                                startIcon={<Edit />}
                                                sx={{
                                                    bgcolor: '#28969c',
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    fontSize: {
                                                        xs: '0.85rem',
                                                        md: '0.95rem',
                                                    },
                                                    '&:hover': {
                                                        bgcolor: '#227278',
                                                    },
                                                }}
                                            >
                                                Add Bio
                                            </Button>
                                        </>
                                    )}
                                </Paper>
                            )}
                        </Box>
                    </Fade>
                )}
            </Box>
        </Box>
    );
}
