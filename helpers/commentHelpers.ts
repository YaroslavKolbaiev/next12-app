export const createComment = async (commentsData: {
  email: string | null | undefined,
  text: string,
  postSlug: string,
  avatar: string | null | undefined,
}) => {
  const res = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify(commentsData),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const data = await res.json();

  if (!res.ok) {
    alert('Please provide text message');
  }

  return data;
};
