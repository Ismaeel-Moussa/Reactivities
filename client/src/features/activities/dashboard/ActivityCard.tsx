import {
    Button,
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    CardHeader,
    Avatar,
    Divider,
    Stack,
    CardActions,
} from '@mui/material';
import { Link } from 'react-router';
import { AccessTime, Place } from '@mui/icons-material';
import { formatDate } from '../../../lib/util/util';

type Props = {
    activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
    console.log(activity);

    const isHost = false;
    const isGoing = false;
    const isCancelled = false;

    const getStatusChip = () => {
        if (isCancelled) {
            return <Chip label="Cancelled" color="error" variant="outlined" />;
        }
        if (isHost) {
            return <Chip label="You are hosting" color="secondary" />;
        }
        if (isGoing) {
            return <Chip label="You are going" color="success" />;
        }
        return null;
    };

    return (
        <Card elevation={2} sx={{ mb: 3, borderRadius: 3 }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ width: 60, height: 60 }}
                        src={`/images/user.png`}
                        alt="Host Avatar"
                    />
                }
                action={getStatusChip()}
                title={
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {activity.title}
                    </Typography>
                }
                subheader={
                    <>
                        Hosted by{' '}
                        <Link
                            to={`/profiles/bob`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <strong>Bob</strong>
                        </Link>
                    </>
                }
            />
            <CardContent sx={{ pt: 0 }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: 'text.secondary', mb: 2 }}
                >
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        gap={0.5}
                        flexGrow={0}
                    >
                        <AccessTime sx={{ fontSize: '1rem' }} />
                        <Typography variant="body2" noWrap>
                            {formatDate(activity.date)}
                        </Typography>
                    </Box>

                    <Place sx={{ fontSize: '1rem', ml: 2 }} />
                    <Typography variant="body2">
                        {activity.venue}, {activity.city}
                    </Typography>
                </Stack>

                <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 2 }}>
                    <Typography variant="body2">Attendees go here</Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                }}
            >
                <Stack spacing={1} direction="row" alignItems="center">
                    <Typography variant="body2">
                        {activity.description}
                    </Typography>
                    <Chip
                        label={activity.category}
                        variant="outlined"
                        color="default"
                    />
                </Stack>
                <Button
                    component={Link}
                    to={`/activities/${activity.id}`}
                    size="small"
                    variant="contained"
                    sx={{ borderRadius: 2, boxShadow: 'none' }}
                >
                    View
                </Button>
            </CardActions>
        </Card>
    );
}
