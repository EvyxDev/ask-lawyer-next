import UpdateBlog from "../_components/UpdateBlog";

type PageProps = {
  params: Promise<{ id: string }>;
};

const Page = async({ params }: PageProps) => {
  const { id } = await params;

  return <UpdateBlog id={id} />;
};

export default Page;
