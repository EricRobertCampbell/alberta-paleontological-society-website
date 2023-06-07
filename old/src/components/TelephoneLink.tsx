interface TelephoneLinkProps {
  phone: string;
}
export const TelephoneLink = ({ phone }: TelephoneLinkProps) => {
  return <a href={`tel:${phone}`}>{phone}</a>;
};
