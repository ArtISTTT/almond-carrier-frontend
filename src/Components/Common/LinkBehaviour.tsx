import NextLink from 'next/link';
import React from 'react';
import { forwardRef } from 'react';

export const LinkBehaviour = forwardRef(function LinkBehaviour(
    props: any,
    ref: any
) {
    return <NextLink ref={ref} {...props} />;
});
