export default function Avatar({ username, ...rest }) {
  const src =
    username === null
      ? `/images/avatars/default.jpeg`
      : `/images/avatars/${username}.jpeg`;

  return (
    <img
      src={src}
      alt=""
      onError={(event) => {
        event.target.src = `/images/avatars/default.jpeg`;
      }}
      {...rest}
    />
  );
}
