import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title: string;
    description: string;
    path: string;
    ogImage?: string;
}

const SITE_URL = 'https://zazaint.tech';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, path, ogImage }) => {
    const fullUrl = `${SITE_URL}${path}`;
    const image = ogImage || DEFAULT_OG_IMAGE;
    const fullTitle = path === '/' ? 'Zaza International — Digital Agency' : `${title} — Zaza International`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Zaza International" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:locale:alternate" content="ru_RU" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEOHead;
