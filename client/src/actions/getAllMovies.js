export default async function () {
  try {
    const response = await fetch('/api/film');
    if (!response.ok) throw new Error();
    const movies = await response.json();
    return movies;
  } catch (err) {
    console.error(err);
    return [];
  }
}
