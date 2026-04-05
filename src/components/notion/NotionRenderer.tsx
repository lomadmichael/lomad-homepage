/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

interface NotionRendererProps {
  blocks: any[];
}

function RichText({ richText }: { richText: any[] }) {
  if (!richText) return null;
  return (
    <>
      {richText.map((t: any, i: number) => {
        const content = t.plain_text;
        const annotations = t.annotations || {};
        let el: React.ReactNode = content;

        if (annotations.bold) el = <strong key={i}>{el}</strong>;
        if (annotations.italic) el = <em key={i}>{el}</em>;
        if (annotations.underline) el = <u key={i}>{el}</u>;
        if (annotations.strikethrough) el = <s key={i}>{el}</s>;
        if (annotations.code)
          el = (
            <code
              key={i}
              className="px-1.5 py-0.5 bg-input-bg rounded text-[0.9em] font-mono"
            >
              {el}
            </code>
          );
        if (t.href)
          el = (
            <a
              key={i}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-text hover:text-text-sub"
            >
              {el}
            </a>
          );

        return <span key={i}>{el}</span>;
      })}
    </>
  );
}

export default function NotionRenderer({ blocks }: NotionRendererProps) {
  return (
    <div className="notion-content space-y-4">
      {blocks.map((block: any) => {
        const { type, id } = block;
        const data = block[type];

        switch (type) {
          case "paragraph":
            return (
              <p
                key={id}
                className="font-[family-name:var(--font-noto)] text-[15px] leading-[1.9] text-text"
              >
                <RichText richText={data.rich_text} />
              </p>
            );

          case "heading_1":
            return (
              <h2
                key={id}
                className="font-[family-name:var(--font-noto)] text-[28px] font-black mt-10 mb-4"
              >
                <RichText richText={data.rich_text} />
              </h2>
            );

          case "heading_2":
            return (
              <h3
                key={id}
                className="font-[family-name:var(--font-noto)] text-[22px] font-black mt-8 mb-3"
              >
                <RichText richText={data.rich_text} />
              </h3>
            );

          case "heading_3":
            return (
              <h4
                key={id}
                className="font-[family-name:var(--font-noto)] text-[18px] font-bold mt-6 mb-2"
              >
                <RichText richText={data.rich_text} />
              </h4>
            );

          case "bulleted_list_item":
            return (
              <li
                key={id}
                className="font-[family-name:var(--font-noto)] text-[15px] leading-[1.9] text-text ml-6 list-disc"
              >
                <RichText richText={data.rich_text} />
              </li>
            );

          case "numbered_list_item":
            return (
              <li
                key={id}
                className="font-[family-name:var(--font-noto)] text-[15px] leading-[1.9] text-text ml-6 list-decimal"
              >
                <RichText richText={data.rich_text} />
              </li>
            );

          case "quote":
            return (
              <blockquote
                key={id}
                className="border-l-4 border-text pl-4 py-2 my-4 font-[family-name:var(--font-noto)] text-[15px] italic text-text-sub"
              >
                <RichText richText={data.rich_text} />
              </blockquote>
            );

          case "divider":
            return <hr key={id} className="border-t border-border my-8" />;

          case "image": {
            const src =
              data.type === "external" ? data.external.url : data.file.url;
            const caption = data.caption?.[0]?.plain_text ?? "";
            return (
              <figure key={id} className="my-6">
                <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={caption}
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
                {caption && (
                  <figcaption className="text-[12px] text-text-muted text-center mt-2">
                    {caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case "code":
            return (
              <pre
                key={id}
                className="bg-input-bg p-4 rounded my-4 overflow-x-auto text-[13px] font-mono"
              >
                <code>
                  <RichText richText={data.rich_text} />
                </code>
              </pre>
            );

          case "callout":
            return (
              <div
                key={id}
                className="bg-input-bg p-4 rounded my-4 flex gap-3"
              >
                {data.icon?.emoji && <span>{data.icon.emoji}</span>}
                <div className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.8]">
                  <RichText richText={data.rich_text} />
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
