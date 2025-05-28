export interface ContentSectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

export default function ContentSection(props: ContentSectionProps) {
  const { title, children, id } = props;

  return (
    <div id={id} className="w-full h-fit flex flex-col gap-4">
      <h3 className="border-b pb-1">{title}</h3>
      {children}
    </div>
  );
}
