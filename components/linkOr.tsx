import Link from 'next/link';
import React from 'react';

export default function LinkOr(props: { href: string | undefined | null; children: React.ReactElement; }) {
    if (props.href) {
        return <Link {...props} />;
    }

    return <span {...props as any} />;
}