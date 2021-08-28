export default function Avatar({ username, ...rest }) {
  return (
    <img
      src={`/images/avatars/${username}.jpeg`}
      alt=""
      onError={(event) => {
        event.target.src = `/images/avatars/default.jpeg`;
      }}
      {...rest}
    />
  );
}
