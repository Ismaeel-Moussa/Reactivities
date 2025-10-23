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
import AvatarPopover from '../../../app/shared/components/AvatarPopover';

type Props = {
    activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
    const getStatusChips = () => {
        const chipsToShow = [];

        if (activity.isCancelled) {
            chipsToShow.push(
                <Chip key="cancelled" label="Cancelled" color="error" />
            );
        }

        if (activity.isHost) {
            chipsToShow.push(
                <Chip
                    key="host"
                    label="You are hosting"
                    color="secondary"
                    variant="outlined"
                />
            );
        } else if (activity.isGoing) {
            chipsToShow.push(
                <Chip
                    key="going"
                    label="You are going"
                    color="warning"
                    variant="outlined"
                />
            );
        }

        if (chipsToShow.length === 0) {
            return null;
        }

        return (
            <Stack spacing={1} sx={{ mr: 2 }}>
                {chipsToShow}
            </Stack>
        );
    };

    return (
        <Card elevation={2} sx={{ mb: 3, borderRadius: 3 }}>
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{ width: 60, height: 60 }}
                            src={`/images/user.png`}
                            alt="Host Avatar"
                        />
                    }
                    title={
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {activity.title}
                        </Typography>
                    }
                    subheader={
                        <>
                            Hosted by{' '}
                            <Link
                                to={`/profiles/${activity.hostId}`}
                                style={{
                                    color: '#20a7ac',
                                }}
                            >
                                <strong>{activity.hostDisplayName}</strong>
                            </Link>
                        </>
                    }
                />

                {getStatusChips()}
            </Box>
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

                <Box
                    display={'flex'}
                    gap={2}
                    sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 2 }}
                >
                    {activity.attendees.map((attendee) => (
                        <AvatarPopover profile={attendee} key={attendee.id} />
                    ))}
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
                    <Chip
                        label={activity.category}
                        variant="outlined"
                        sx={{
                            color: '#20a7ac',
                            borderColor: '#20a7ac',
                            fontWeight: 'bold',
                        }}
                    />
                    <Typography variant="body2">
                        {activity.description}
                    </Typography>
                </Stack>
                <Button
                    component={Link}
                    to={`/activities/${activity.id}`}
                    size="small"
                    variant="contained"
                    sx={{
                        borderRadius: 2,
                        boxShadow: 'none',
                        bgcolor: '#20a7ac',
                    }}
                >
                    View
                </Button>
            </CardActions>
        </Card>
    );
}
