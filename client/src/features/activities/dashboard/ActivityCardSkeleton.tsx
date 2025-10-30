import {
    Card,
    CardContent,
    CardHeader,
    Skeleton,
    Box,
    Stack,
    Divider,
    CardActions,
} from '@mui/material';

export default function ActivityCardSkeleton() {
    return (
        <Card
            elevation={2}
            sx={{
                mb: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            {/* Header Section */}
            <CardHeader
                avatar={
                    <Skeleton
                        variant="circular"
                        width={60}
                        height={60}
                        sx={{
                            border: '3px solid',
                            borderColor: 'divider',
                        }}
                    />
                }
                action={
                    <Box sx={{ mr: 2, mt: 1.5 }}>
                        <Skeleton
                            variant="rounded"
                            width={120}
                            height={24}
                            sx={{ borderRadius: 3 }}
                        />
                    </Box>
                }
                title={
                    <Skeleton
                        variant="text"
                        width="60%"
                        height={28}
                        sx={{ mb: 0.5 }}
                    />
                }
                subheader={<Skeleton variant="text" width="40%" height={20} />}
                sx={{ pb: 1 }}
            />

            <CardContent sx={{ pt: 1, pb: 2 }}>
                {/* Date and Location Info */}
                <Stack spacing={1.5} sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Skeleton
                            variant="rounded"
                            width={36}
                            height={36}
                            sx={{ borderRadius: 2 }}
                        />
                        <Skeleton variant="text" width="50%" height={20} />
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <Skeleton
                            variant="rounded"
                            width={36}
                            height={36}
                            sx={{ borderRadius: 2 }}
                        />
                        <Skeleton variant="text" width="60%" height={20} />
                    </Box>
                </Stack>

                {/* Attendees Section */}
                <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                        <Skeleton variant="text" width={120} height={20} />
                    </Box>

                    <Box
                        display="flex"
                        gap={1}
                        sx={{
                            bgcolor: 'rgba(32, 167, 172, 0.04)',
                            p: 2,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'rgba(32, 167, 172, 0.1)',
                        }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <Skeleton
                                key={i}
                                variant="circular"
                                width={50}
                                height={50}
                            />
                        ))}
                    </Box>
                </Box>
            </CardContent>

            <Divider />

            {/* Footer Section */}
            <CardActions
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2.5,
                    py: 2,
                }}
            >
                <Box display="flex" alignItems="center" gap={2} flex={1}>
                    <Skeleton
                        variant="rounded"
                        width={80}
                        height={24}
                        sx={{ borderRadius: 3 }}
                    />
                    <Skeleton variant="text" width="50%" height={20} />
                </Box>

                <Skeleton
                    variant="rounded"
                    width={120}
                    height={36}
                    sx={{ borderRadius: 2 }}
                />
            </CardActions>
        </Card>
    );
}
