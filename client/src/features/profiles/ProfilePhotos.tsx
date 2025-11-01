import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';
import {
    Box,
    Button,
    Divider,
    ImageList,
    ImageListItem,
    Typography,
    Skeleton,
    Fade,
    alpha,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import PhotoUploadWidget from '../../app/shared/components/PhotoUploadWidget';
import StarButton from '../../app/shared/components/StarButton';
import DeleteButton from '../../app/shared/components/DeleteButton';
import { AddPhotoAlternate, ImageNotSupported } from '@mui/icons-material';

export default function ProfilePhotos() {
    const { id } = useParams();
    const {
        photos,
        loadingPhotos,
        isCurrentUser,
        uploadPhoto,
        profile,
        setMainPhoto,
        deletePhoto,
    } = useProfile(id);
    const [editMode, setEditMode] = useState(false);
    const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.down('md'));

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto.mutate(file, {
            onSuccess: () => {
                setEditMode(false);
            },
        });
    };

    // Loading State
    if (loadingPhotos) {
        return (
            <Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    mb={3}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    gap={{ xs: 2, sm: 0 }}
                >
                    <Skeleton width={100} height={40} />
                    <Skeleton width={120} height={40} />
                </Box>
                <ImageList
                    cols={isXs ? 2 : isSm ? 3 : 4}
                    rowHeight={220}
                    gap={12}
                >
                    {[...Array(8)].map((_, index) => (
                        <ImageListItem key={index}>
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={220}
                                sx={{ borderRadius: 2 }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        );
    }

    if (!photos) return <Typography>No photos found for this user</Typography>;

    return (
        <Box>
            {/* Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={{ xs: 1.5, sm: 0 }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                >
                    Photos
                    {!editMode && (
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{
                                ml: 2,
                                color: '#28969c',
                                fontWeight: 600,
                                bgcolor: 'rgba(40, 150, 156, 0.1)',
                                px: 1.5,
                                py: 0.7,
                                borderRadius: 2,
                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                            }}
                        >
                            {photos.length}
                        </Typography>
                    )}
                </Typography>
                {isCurrentUser && (
                    <Button
                        onClick={() => setEditMode(!editMode)}
                        variant={editMode ? 'outlined' : 'contained'}
                        startIcon={<AddPhotoAlternate />}
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
                        {editMode ? 'Cancel' : 'Add Photo'}
                    </Button>
                )}
            </Box>

            <Divider />

            {/* Upload Widget */}
            {editMode && (
                <Fade in={editMode}>
                    <Box mb={3}>
                        <PhotoUploadWidget
                            uploadPhoto={handlePhotoUpload}
                            loading={uploadPhoto.isPending}
                        />
                    </Box>
                </Fade>
            )}

            {/* Photos Grid */}
            {!editMode && (
                <>
                    {photos.length === 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                py: { xs: 4, md: 8 },
                                px: 2,
                            }}
                        >
                            <ImageNotSupported
                                sx={{
                                    fontSize: { xs: 48, md: 64 },
                                    color: 'text.secondary',
                                    mb: 2,
                                    opacity: 0.5,
                                }}
                            />
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                gutterBottom
                                sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                            >
                                No photos yet
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={2}
                                sx={{
                                    fontSize: { xs: '0.8rem', md: '0.875rem' },
                                }}
                            >
                                Start building your photo gallery
                            </Typography>
                            {isCurrentUser && (
                                <Button
                                    variant="contained"
                                    onClick={() => setEditMode(true)}
                                    startIcon={<AddPhotoAlternate />}
                                    sx={{
                                        bgcolor: '#28969c',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        '&:hover': {
                                            bgcolor: '#227278',
                                        },
                                    }}
                                >
                                    Add Your First Photo
                                </Button>
                            )}
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                height: { xs: 500, md: 440 },
                                overflow: 'auto',
                                pr: { xs: 1, md: 2 },
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background:
                                        'linear-gradient(180deg, rgba(40, 150, 156, 0.05) 0%, rgba(40, 150, 156, 0.1) 100%)',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(40, 150, 156, 0.1)',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background:
                                        'linear-gradient(180deg, #28969c 0%, #227278 100%)',
                                    borderRadius: '10px',
                                    border: '2px solid transparent',
                                    backgroundClip: 'padding-box',
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    background:
                                        'linear-gradient(180deg, #227278 0%, #1a5a5f 100%)',
                                },
                            }}
                        >
                            <ImageList
                                cols={isXs ? 2 : isSm ? 3 : 5}
                                rowHeight={isXs ? 180 : 240}
                                gap={isXs ? 8 : 12}
                            >
                                {photos.map((photo) => (
                                    <ImageListItem
                                        key={photo.id}
                                        sx={{
                                            position: 'relative',
                                            overflow: 'hidden',
                                            borderRadius: 2,
                                            border: '2px solid',
                                            borderColor:
                                                photo.url === profile?.imageUrl
                                                    ? '#28969c'
                                                    : 'divider',
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                boxShadow:
                                                    '0 12px 24px rgba(40, 150, 156, 0.25)',
                                                borderColor: '#28969c',
                                                zIndex: 1,
                                            },
                                        }}
                                        onMouseEnter={() =>
                                            setHoveredPhoto(photo.id)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredPhoto(null)
                                        }
                                    >
                                        <img
                                            srcSet={`${photo.url.replace(
                                                '/upload/',
                                                '/upload/w_300,h_300,c_fill,f_auto,dpr_2,g_face/'
                                            )}`}
                                            src={`${photo.url.replace(
                                                '/upload/',
                                                '/upload/w_300,h_300,c_fill,f_auto,dpr_2,g_face/'
                                            )}`}
                                            alt="user profile"
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />

                                        {/* Main Photo Badge */}
                                        {photo.url === profile?.imageUrl && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: { xs: 8, md: 12 },
                                                    left: { xs: 8, md: 12 },
                                                    bgcolor: alpha(
                                                        '#28969c',
                                                        0.95
                                                    ),
                                                    color: 'white',
                                                    px: { xs: 1, md: 1.5 },
                                                    py: { xs: 0.5, md: 0.75 },
                                                    borderRadius: 1.5,
                                                    fontSize: {
                                                        xs: '0.6rem',
                                                        md: '0.7rem',
                                                    },
                                                    fontWeight: 700,
                                                    letterSpacing: '0.5px',
                                                    backdropFilter: 'blur(8px)',
                                                    boxShadow:
                                                        '0 4px 12px rgba(0,0,0,0.2)',
                                                }}
                                            >
                                                MAIN PHOTO
                                            </Box>
                                        )}

                                        {/* Action Buttons */}
                                        {isCurrentUser && (
                                            <Fade
                                                in={hoveredPhoto === photo.id}
                                                timeout={250}
                                            >
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        background:
                                                            'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)',
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        alignItems:
                                                            'flex-start',
                                                        p: { xs: 1, md: 1.5 },
                                                    }}
                                                >
                                                    <StarButton
                                                        onClick={() =>
                                                            setMainPhoto.mutate(
                                                                photo
                                                            )
                                                        }
                                                        selected={
                                                            photo.url ===
                                                            profile?.imageUrl
                                                        }
                                                    />

                                                    {profile?.imageUrl !==
                                                        photo.url && (
                                                        <DeleteButton
                                                            onClick={() =>
                                                                deletePhoto.mutate(
                                                                    photo.id
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </Box>
                                            </Fade>
                                        )}
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}
