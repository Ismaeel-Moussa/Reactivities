import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';
import { Box, Button, Divider, Typography, Fade, Paper } from '@mui/material';
import ProfileEditForm from './ProfileEditForm';
import { useState } from 'react';
import { Edit, Info } from '@mui/icons-material';

export default function ProfileAbout() {
    const { id } = useParams();
    const { profile, isCurrentUser } = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    return (
        <Box>
            {/* Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h5" fontWeight={700}>
                        About {profile?.displayName}
                    </Typography>
                </Box>
                {isCurrentUser && (
                    <Button
                        onClick={() => setEditMode(!editMode)}
                        variant={editMode ? 'outlined' : 'contained'}
                        startIcon={<Edit />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 2,
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
                    maxHeight: 380,
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
                                    }}
                                >
                                    {profile.bio}
                                </Typography>
                            ) : (
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        py: 12,
                                        textAlign: 'center',
                                        bgcolor: 'rgba(40, 150, 156, 0.04)',
                                        border: '1px dashed',
                                        borderColor: 'rgba(40, 150, 156, 0.3)',
                                        borderRadius: 2,
                                    }}
                                >
                                    <Info
                                        sx={{
                                            fontSize: 48,
                                            color: 'text.secondary',
                                            opacity: 0.5,
                                            mb: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        No bio added yet
                                    </Typography>
                                    {isCurrentUser && (
                                        <>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                mb={2}
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
