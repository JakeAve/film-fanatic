export default async function (id, formData) {
  try {
    const response = await fetch(`/api/film${id}new-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error(response.text);
    const movie = await response.json();
    return movie;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}
