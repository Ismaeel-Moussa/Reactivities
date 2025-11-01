import { CloudUpload } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper, { type ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

type Props = {
    uploadPhoto: (file: Blob) => void;
    loading: boolean;
};

export default function PhotoUploadWidget({ uploadPhoto, loading }: Props) {
    const [files, setFiles] = useState<object & { preview: string }[]>([]);
    const cropperRef = useRef<ReactCropperElement>(null);

    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
    }, []);

    const onCrop = useCallback(() => {
        const cropper = cropperRef.current?.cropper;
        cropper?.getCroppedCanvas().toBlob((blob) => {
            uploadPhoto(blob as Blob);
        });
    }, [uploadPhoto]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Step 1 - Add Photo */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Typography
                    variant="overline"
                    color="secondary"
                    sx={{ fontSize: { xs: '0.75rem', md: '0.9rem' } }}
                >
                    Step 1 - Add photo
                </Typography>
                <Box
                    {...getRootProps()}
                    sx={{
                        border: 'dashed 3px #eee',
                        borderColor: isDragActive ? 'green' : '#eee',
                        borderRadius: '5px',
                        height: { xs: '200px', sm: '240px', md: '280px' },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        '&:hover': {
                            borderColor: '#28969c',
                            bgcolor: 'rgba(40, 150, 156, 0.02)',
                        },
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUpload
                        sx={{ fontSize: { xs: 50, sm: 60, md: 80 } }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: {
                                xs: '1rem',
                                sm: '1.25rem',
                                md: '1.5rem',
                            },
                            mt: 1,
                            textAlign: 'center',
                            px: 2,
                        }}
                    >
                        Drop image here
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                            mt: 0.5,
                        }}
                    >
                        or click to browse
                    </Typography>
                </Box>
            </Grid>

            {/* Step 2 - Resize Image */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Typography
                    variant="overline"
                    color="secondary"
                    sx={{ fontSize: { xs: '0.75rem', md: '0.9rem' } }}
                >
                    Step 2 - Resize image
                </Typography>
                {files[0]?.preview && (
                    <Box
                        sx={{
                            height: { xs: '200px', sm: '240px', md: '300px' },
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Cropper
                            src={files[0]?.preview}
                            style={{
                                height: '100%',
                                width: '100%',
                                maxWidth: '100%',
                            }}
                            initialAspectRatio={1}
                            aspectRatio={1}
                            preview=".img-preview"
                            guides={false}
                            viewMode={1}
                            background={false}
                            ref={cropperRef}
                            responsive={true}
                            checkOrientation={false}
                        />
                    </Box>
                )}
            </Grid>

            {/* Step 3 - Preview & Upload */}
            <Grid size={{ xs: 12, md: 4 }}>
                {files[0]?.preview && (
                    <>
                        <Typography
                            variant="overline"
                            color="secondary"
                            sx={{ fontSize: { xs: '0.75rem', md: '0.9rem' } }}
                        >
                            Step 3 - Preview & upload
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    bgcolor: '#00000088',
                                    gap: 2,
                                    width: '100%',
                                    height: {
                                        xs: '200px',
                                        sm: '240px',
                                        md: '300px',
                                    },
                                }}
                            >
                                <div
                                    className="img-preview"
                                    style={{
                                        width: '100%',
                                        maxWidth: 300,
                                        height: 200,
                                        overflow: 'hidden',
                                        borderRadius: '8px',
                                        border: '2px solid #eee',
                                    }}
                                />
                            </Box>
                            <Button
                                onClick={onCrop}
                                variant="contained"
                                color="secondary"
                                disabled={loading}
                                fullWidth
                                sx={{
                                    maxWidth: 300,

                                    mt: 2,
                                    height: { xs: 44, md: 48 },
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    bgcolor: '#28969c',
                                    '&:hover': {
                                        bgcolor: '#227278',
                                    },
                                }}
                            >
                                {loading ? 'Uploading...' : 'Upload Photo'}
                            </Button>
                        </Box>
                    </>
                )}
            </Grid>
        </Grid>
    );
}
