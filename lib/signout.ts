import { signOut } from "next-auth/react";
import querystring from 'querystring';

const generateSignOutUrl = () => {
    const domain = "vitrav.auth.us-east-1.amazoncognito.com"; // Replace with your Cognito domain
    const clientId = '53kqgchkbunqgfie1f5gs6qmdi' // Replace with your actual client ID
    const redirectUri = window.location.host; // Replace with your actual redirect URI

    const params = {
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,
        state: "example-state-value", // You may want to generate a unique state value per request
        nonce: "example-nonce-value", // Use a unique nonce value per request for security
        scope: "openid profile aws.cognito.signin.user.admin",
        logout_uri: window.location.host
    };

    const queryString = querystring.stringify(params);
    return `https://${domain}/logout?${queryString}`;
};

const logoutUrl = generateSignOutUrl();

export const signOutHandler = () => {
    signOut().then(() => {
        window.location.href = logoutUrl
    })
}