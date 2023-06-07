interface EmailLinkProps {
  email: string;
}
export const EmailLink = ({ email }: EmailLinkProps) => {
  return <a href={`mailto:${email}`}>{email}</a>;
};
