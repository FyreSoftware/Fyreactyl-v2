export default interface IUser {
    id: string;
    OAuthId: string;
    email: string;
    isAdmin: boolean;
    createdAt: Date;
    firstName: string;
    lastName: string;
    displayName: string;
    avatarUrl: string;
    emailActivated: boolean;
}