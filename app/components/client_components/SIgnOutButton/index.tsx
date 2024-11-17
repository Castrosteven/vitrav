'use client'
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react";
import querystring from 'querystring';
import { useEffect, useState } from "react";

const generateSignOutUrl = (redirectUri: string) => {
    const domain = "vitrav-auth.auth.us-east-1.amazoncognito.com"; // Replace with your Cognito domain
    const clientId = '69gabjngh58iobqb6k41eapf1v'

    // Generate unique values for `state` and `nonce` for better security
    const state = Math.random().toString(36).substring(2);  // A simple random state value (could be improved)
    const nonce = Math.random().toString(36).substring(2);  // A simple random nonce value (could be improved)

    const params = {
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,
        state: state,
        nonce: nonce,
        scope: "openid profile email",
        logout_uri: redirectUri,  // Use the full URL for logout_uri
    };

    const queryString = querystring.stringify(params);
    return `https://${domain}/logout?${queryString}`;
};


// const logoutUrl = generateSignOutUrl();

export const signOutHandler = (logoutUrl: string) => {
    signOut().then(() => {
        window.location.href = logoutUrl
    })
}
export function SignOutButton() {
    const [logoutUrl, setLogoutUrl] = useState<string | null>(null);
    useEffect(() => {
        // Check if window is available (only in the client)
        if (typeof window !== 'undefined') {
            const redirectUri = window.location.origin; // Ensure using full URL
            const generatedLogoutUrl = generateSignOutUrl(redirectUri);
            setLogoutUrl(generatedLogoutUrl);
        }
    }, []);
    if (!logoutUrl) {
        return <Button disabled>Loading...</Button>; // Show a loading state until the logout URL is ready
    }
    return (
        <Button type="button" onClick={() => signOutHandler(logoutUrl)}>
            Sign Out
        </Button>
    );
}