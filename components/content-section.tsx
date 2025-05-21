interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function ContentSection(props: ContentSectionProps) {
  const { title, children } = props;
  return (
    <div className="w-full h-fit flex flex-col gap-4">
      <h2 className="text-lg font-semibold border-b pb-2">{title}</h2>
      {children}
    </div>
  );
}
