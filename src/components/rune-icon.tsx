"use client";

type Props = {
  name: string;
};

export const RuneIcon = ({ name }: Props) => (
  <div className="shrink-0">
    <img
      src={`/images/${name}_rune.png`}
      alt={`${name} rune`}
      width={48}
      height={48}
      className="size-8 md:size-12"
      loading="lazy"
      style={{
        imageRendering: "pixelated",
      }}
    />
    <span className="inline-block w-full text-center text-neutral-400 font-bold uppercase text-[10px] md:text-xs">
      {name}
    </span>
  </div>
);
