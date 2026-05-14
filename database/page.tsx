import {
  getUserById,
  getUserWithPasswordHashInsecure,
} from '../../../database/users';

export async function generateMetadata({ params }) {
  const user = await getUserWithPasswordHashInsecure(Number(params.userID));

  if (!user) {
    return {
      title: 'User not found',
    };
  }

  return {
    title: user.firstName,
    description: `${user.firstName} ${user.lastName}`,
  };
}

export default async function Page({ params }) {
  const user = await getUserWithPasswordHashInsecure(Number(params.userID));

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>{user.firstName}</h1>
      <p>{user.lastName}</p>
    </div>
  );
}
