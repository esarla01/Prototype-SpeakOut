export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/((?!register|forgot-password|reset-password|api/register|api/forgotpassword|api/resetpassword|login|images).*)']
}