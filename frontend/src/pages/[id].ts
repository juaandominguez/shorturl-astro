const getLinkUrl = async (id: string) => {
  try {
    console.log(import.meta.env.BACKEND_URL);
    const res = await fetch(`${import.meta.env.BACKEND_URL}/shorturl?id=${id}`);
    if (res.status === 404) {
      return null;
    }
    const url = await res.text();
    return url;
  } catch (err) {
    console.error(err);
  }
};
export async function GET({
  params,
  redirect,
}: {
  params: any;
  redirect: any;
}) {
  const { id } = params;
  const link = await getLinkUrl(id);

  if (!link) {
    return redirect(`${import.meta.env.BASE_HOME_URL}/404`, 404);
  }

  return redirect(link, 307);
}
