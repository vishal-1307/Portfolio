import { activity } from "@/content/activity";
import { Section } from "@/components/ui/Section";

export function Activity() {
  return (
    <Section id="activity" title="Activity">
      <ul className="max-w-xl border-t border-line">
        {activity.map((item) => (
          <li key={item} data-reveal className="border-b border-line py-4 text-base text-fg">
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
