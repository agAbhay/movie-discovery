import React from 'react';
import { Card, CardContent, CardMedia, Skeleton, Stack } from '@mui/material';

const MovieCardSkeleton: React.FC = () => {
    return (
        <Card
            sx={{ width: '100%', maxWidth: 250 }}
            className="mr-6 rounded-2xl shadow-lg min-h-[360px] flex flex-col"
        >
            <Skeleton variant="rectangular" width="100%" height={300} />

            <CardContent className="!px-3.5 !py-3 flex-grow flex flex-col justify-between">
                <Skeleton variant="text" height={24} width="80%" />
                <Stack direction="row" justifyContent="space-between" className="mt-2">
                    <Skeleton variant="text" width="40%" height={18} />
                    <Skeleton variant="text" width="30%" height={18} />
                </Stack>
                <Skeleton variant="text" width="100%" height={12} className="mt-3" />
                <Skeleton variant="text" width="100%" height={12} />
                <Skeleton variant="text" width="90%" height={12} />
            </CardContent>
        </Card>
    );
};

export default MovieCardSkeleton;
