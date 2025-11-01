import {
    Box,
    Card,
    CardContent,
    Grid,
    Skeleton,
    Stack,
    Divider,
    useTheme,
    useMediaQuery,
} from '@mui/material';

export default function ActivityDetailsSkeleton() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid container spacing={isMobile ? 2 : 8}>
            {/* Left Column - Main Content */}
            <Grid size={{ xs: 12, md: 8 }}>
                {/* Header Section */}
                <Card
                    sx={{
                        mb: isMobile ? 2 : 3,
                        borderRadius: isMobile ? 2 : 3,
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    {/* Hero Image */}
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={isMobile ? 250 : 400}
                        sx={{
                            bgcolor: 'rgba(0, 0, 0, 0.11)',
                        }}
                    />

                    {/* Overlay Content */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: isMobile ? 2 : 4,
                            background:
                                'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                        }}
                    >
                        <Skeleton
                            variant="text"
                            width="70%"
                            height={isMobile ? 35 : 50}
                            sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
                        />
                        <Skeleton
                            variant="text"
                            width="40%"
                            height={isMobile ? 25 : 30}
                            sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mt: 1 }}
                        />
                        <Box
                            sx={{
                                mt: 2,
                                display: 'flex',
                                gap: isMobile ? 1 : 2,
                                flexDirection: isMobile ? 'column' : 'row',
                            }}
                        >
                            <Skeleton
                                variant="rounded"
                                width={isMobile ? '100%' : 180}
                                height={isMobile ? 40 : 42}
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: 2,
                                }}
                            />
                            {!isMobile && (
                                <Skeleton
                                    variant="rounded"
                                    width={180}
                                    height={42}
                                    sx={{
                                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                                        borderRadius: 2,
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Card>

                {/* Info Section */}
                <Card
                    sx={{
                        mb: isMobile ? 2 : 3,
                        borderRadius: isMobile ? 2 : 3,
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                        <Stack spacing={isMobile ? 2 : 3}>
                            {/* Description */}
                            <Box>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                    mb={2}
                                >
                                    <Skeleton
                                        variant="circular"
                                        width={isMobile ? 36 : 40}
                                        height={isMobile ? 36 : 40}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={isMobile ? 100 : 120}
                                        height={24}
                                    />
                                </Box>
                                <Skeleton
                                    variant="text"
                                    width="100%"
                                    height={20}
                                />
                                <Skeleton
                                    variant="text"
                                    width="90%"
                                    height={20}
                                />
                            </Box>

                            <Divider />

                            {/* Date & Time */}
                            <Box>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                    mb={2}
                                >
                                    <Skeleton
                                        variant="circular"
                                        width={isMobile ? 36 : 40}
                                        height={isMobile ? 36 : 40}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={isMobile ? 100 : 120}
                                        height={24}
                                    />
                                </Box>
                                <Skeleton
                                    variant="text"
                                    width="60%"
                                    height={20}
                                />
                            </Box>

                            <Divider />

                            {/* Location */}
                            <Box>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                    mb={2}
                                >
                                    <Skeleton
                                        variant="circular"
                                        width={isMobile ? 36 : 40}
                                        height={isMobile ? 36 : 40}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={isMobile ? 100 : 120}
                                        height={24}
                                    />
                                </Box>
                                <Skeleton
                                    variant="text"
                                    width="70%"
                                    height={20}
                                />
                                <Box sx={{ mt: 2 }}>
                                    <Skeleton
                                        variant="rounded"
                                        width={isMobile ? '100%' : 120}
                                        height={isMobile ? 40 : 36}
                                        sx={{ borderRadius: 2 }}
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                {/* Chat Section - Only show on desktop in skeleton */}
                {!isMobile && (
                    <Card
                        sx={{
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Skeleton
                                variant="text"
                                width={150}
                                height={28}
                                sx={{ mb: 2 }}
                            />
                            <Stack spacing={2}>
                                {[...Array(3)].map((_, i) => (
                                    <Box
                                        key={i}
                                        display="flex"
                                        alignItems="flex-start"
                                        gap={2}
                                    >
                                        <Skeleton
                                            variant="circular"
                                            width={40}
                                            height={40}
                                        />
                                        <Box flex={1}>
                                            <Skeleton
                                                variant="text"
                                                width={120}
                                                height={20}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width="90%"
                                                height={16}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width="70%"
                                                height={16}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                )}
            </Grid>

            {/* Right Column - Sidebar */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Card
                    sx={{
                        borderRadius: isMobile ? 2 : 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        position: isMobile ? 'relative' : 'sticky',
                        top: isMobile ? 0 : 100,
                        mb: isMobile ? 2 : 0,
                    }}
                >
                    <Box
                        sx={{
                            background:
                                'linear-gradient(135deg, #163273ff 0%, #0d9488 100%)',
                            p: isMobile ? 2 : 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <Skeleton
                            variant="circular"
                            width={isMobile ? 28 : 32}
                            height={isMobile ? 28 : 32}
                            sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
                        />
                        <Skeleton
                            variant="text"
                            width={isMobile ? 120 : 150}
                            height={isMobile ? 24 : 28}
                            sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
                        />
                    </Box>

                    <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                        <Stack spacing={2}>
                            {[...Array(isMobile ? 2 : 4)].map((_, i) => (
                                <Box
                                    key={i}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{
                                        p: isMobile ? 1.5 : 2,
                                        borderRadius: 2,
                                        bgcolor: 'rgba(0, 0, 0, 0.02)',
                                    }}
                                >
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={isMobile ? 1.5 : 2}
                                    >
                                        <Skeleton
                                            variant="circular"
                                            width={isMobile ? 44 : 48}
                                            height={isMobile ? 44 : 48}
                                        />
                                        <Box>
                                            <Skeleton
                                                variant="text"
                                                width={isMobile ? 100 : 120}
                                                height={20}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width={isMobile ? 70 : 80}
                                                height={16}
                                            />
                                        </Box>
                                    </Box>
                                    {i === (isMobile ? 1 : 3) && (
                                        <Skeleton
                                            variant="rounded"
                                            width={60}
                                            height={24}
                                            sx={{ borderRadius: 3 }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            {/* Chat Section for Mobile - at bottom */}
            {isMobile && (
                <Grid size={12}>
                    <Card
                        sx={{
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            mb: 2,
                        }}
                    >
                        <CardContent sx={{ p: 2 }}>
                            <Skeleton
                                variant="text"
                                width={120}
                                height={24}
                                sx={{ mb: 2 }}
                            />
                            <Stack spacing={2}>
                                {[...Array(2)].map((_, i) => (
                                    <Box
                                        key={i}
                                        display="flex"
                                        alignItems="flex-start"
                                        gap={1.5}
                                    >
                                        <Skeleton
                                            variant="circular"
                                            width={36}
                                            height={36}
                                        />
                                        <Box flex={1}>
                                            <Skeleton
                                                variant="text"
                                                width={100}
                                                height={18}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width="90%"
                                                height={14}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    );
}
