import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title, 
    description, 
    keywords, 
    canonical = "https://subdomain.insd.edu.in/",
    ogTitle, 
    ogDescription, 
    ogImage = "https://ik.imagekit.io/fmldynl4j4/insd-awards/Gemini_Generated_Image_wy3si8wy3si8wy3s.png?tr=w-1200,h-630,fo-auto", 
    ogType = 'website',
    twitterCard = 'summary_large_image',
    robots = 'max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    courseSchema = null
}) => {
    const siteName = "INSD";
    const metaDescription = description || "Best design institute in Delhi, India. Join INSD is one of the top design colleges in Delhi, NCR offers fashion, interior, textile and graphic design courses in UG and PG.";
    const metaKeywords = keywords || "best design institute in Delhi, skill school design, job oriented fashion design, interior design placement, graphic design course, INSD India";

    // JSON-LD Structured Data for Ranking Enhancement
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": siteName,
        "url": "https://subdomain.insd.edu.in",
        "logo": "https://ik.imagekit.io/fmldynl4j4/INSD-Logo_Horizontal-removebg-preview.png",
        "sameAs": [
            "https://www.facebook.com/INSD.Official/",
            "https://www.instagram.com/insd_official/",
            "https://twitter.com/INSDofficial",
            "https://www.youtube.com/user/INSDofficial"
        ],
        "description": metaDescription,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Delhi NCR",
            "addressCountry": "IN"
        }
    };

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{title}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={canonical} />

            {/* Mobile / Interaction */}
            <meta name="theme-color" content="#b30000" />

            {/* Open Graph / Facebook */}
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={ogTitle || title} />
            <meta property="og:description" content={ogDescription || metaDescription} />
            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:secure_url" content={ogImage} />
            <meta property="og:image:width" content="1357" />
            <meta property="og:image:height" content="627" />

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={ogTitle || title} />
            <meta name="twitter:description" content={ogDescription || metaDescription} />
            <meta name="twitter:image" content={ogImage} />

            <meta name="twitter:site" content="@INSDofficial" />

            {/* Structured Data (Schema.org) */}
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
            {courseSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(courseSchema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
