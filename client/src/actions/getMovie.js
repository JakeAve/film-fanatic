export default async function (id) {
  try {
    const response = await fetch('/api/film' + id);
    if (!response.ok) throw new Error();
    const movie = await response.json();
    return movie;
  } catch (err) {
    console.error(err);
    return {};
  }
}
