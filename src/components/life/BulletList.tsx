const BulletList = ({ items }: { items: string[] }) => (
  <div className="space-y-3">
    {items.map((item) => (
      <div key={item} className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-sand shrink-0" />
        <p className="font-body text-sm text-primary-foreground/80">{item}</p>
      </div>
    ))}
  </div>
);

export default BulletList;
