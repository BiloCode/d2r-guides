import { Home_Titles } from "@/constants/information";

import { Wrapper } from "@/components/wrapper";

import { getPageParams } from "@/helpers/server";

type Props = PageProps<"/[lang]"> & {};

export default async function Home({ params }: Props) {
  const { locale } = await getPageParams(params);

  return (
    <Wrapper className="w-full">
      <div className="grid gap-4">
        <h1 className="text-[16px] md:text-2xl text-neutral-400 font-bold">
          {Home_Titles["main"][locale]}
        </h1>
      </div>
    </Wrapper>
  );
}
