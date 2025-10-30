import {
    Box,
    Card,
    CardContent,
    Grid,
    Skeleton,
    Stack,
    Divider,
} from '@mui/material';

export default function ActivityDetailsSkeleton() {
    return (
        <Grid container spacing={8}>
            {/* Left Column - Main Content */}
            <Grid size={8}>
                {/* Header Section */}
                <Card
                    sx={{
                        mb: 3,
                        borderRadius: 3,
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    {/* Hero Image */}
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={400}
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
                            p: 4,
                            background:
                                'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                        }}
                    >
                        <Skeleton
                            variant="text"
                            width="70%"
                            height={50}
                            sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
                        />
                        <Skeleton
                            variant="text"
                            width="40%"
                            height={30}
                            sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mt: 1 }}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Skeleton
                                variant="rounded"
                                width={180}
                                height={42}
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: 2,
                                }}
                            />
                        </Box>
                    </Box>
                </Card>

                {/* Info Section */}
                <Card
                    sx={{
                        mb: 3,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Stack spacing={3}>
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
                                        width={40}
                                        height={40}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={120}
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
                                        width={40}
                                        height={40}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={120}
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
                                        width={40}
                                        height={40}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={120}
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
                                        width={120}
                                        height={36}
                                        sx={{ borderRadius: 2 }}
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                {/* Chat Section */}
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
            </Grid>

            {/* Right Column - Sidebar */}
            <Grid size={4}>
                <Card
                    sx={{
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        position: 'sticky',
                        top: 100,
                    }}
                >
                    <Box
                        sx={{
                            background:
                                'linear-gradient(135deg, #163273ff 0%, #0d9488 100%)',
                            p: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Skeleton
                            variant="circular"
                            width={32}
                            height={32}
                            sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
                        />
                        <Skeleton
                            variant="text"
                            width={150}
                            height={28}
                            sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
                        />
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                        <Stack spacing={2}>
                            {[...Array(4)].map((_, i) => (
                                <Box
                                    key={i}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: 'rgba(0, 0, 0, 0.02)',
                                    }}
                                >
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                    >
                                        <Skeleton
                                            variant="circular"
                                            width={48}
                                            height={48}
                                        />
                                        <Box>
                                            <Skeleton
                                                variant="text"
                                                width={120}
                                                height={20}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width={80}
                                                height={16}
                                            />
                                        </Box>
                                    </Box>
                                    {i === 3 && (
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
        </Grid>
    );
}
