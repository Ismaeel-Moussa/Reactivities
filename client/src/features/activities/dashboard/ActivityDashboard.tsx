import { Grid, Box, Fab, Drawer, useMediaQuery, useTheme } from '@mui/material';
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';

export default function ActivityDashboard() {
    const [filterOpen, setFilterOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 10 }}>
                {/* Activity List - Full width on mobile, 7/12 on desktop */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <ActivityList />
                </Grid>

                {/* Activity Filters - Hidden on mobile, shown in drawer */}
                <Grid
                    size={{ xs: 12, md: 5 }}
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        position: 'sticky',
                        top: 100,
                        alignSelf: 'flex-start',
                    }}
                >
                    <ActivityFilters />
                </Grid>
            </Grid>

            {/* Mobile Filter Button */}
            {isMobile && (
                <Fab
                    color="primary"
                    aria-label="filters"
                    onClick={() => setFilterOpen(true)}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 1000,
                        boxShadow: '0 4px 20px rgba(32, 167, 172, 0.4)',
                    }}
                >
                    <FilterListIcon />
                </Fab>
            )}

            {/* Mobile Filter Drawer */}
            <Drawer
                anchor="bottom"
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                        maxHeight: '50vh',
                        overflow: 'auto',
                    },
                }}
            >
                <Box sx={{ p: 3 }}>
                    {/* Drawer Handle */}
                    <Box
                        sx={{
                            width: 40,
                            height: 4,
                            bgcolor: 'divider',
                            borderRadius: 2,
                            mx: 'auto',
                            mb: 3,
                        }}
                    />
                    <ActivityFilters onClose={() => setFilterOpen(false)} />
                </Box>
            </Drawer>
        </>
    );
}
