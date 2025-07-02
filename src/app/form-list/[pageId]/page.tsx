import FormListSinglePage from "@/pages/FormListPage/FormListSinglePage/FormListSinglePage";
import { Metadata } from "next";

type PageProps = {
  params: { pageId: string };
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { pageId } = await params;
  return {
    title: `Form Page ${pageId}`,
  };
};

export default async function Page({ params }: PageProps) {
  const { pageId } = await params;

  return (
    <>
      <FormListSinglePage pageId={pageId} />
    </>
  );
}
