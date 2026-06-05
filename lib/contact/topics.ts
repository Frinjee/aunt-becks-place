export const contactTopics = [
  { value: "volunteer", label: "Volunteering" },
  { value: "donations", label: "Donations" },
  { value: "sunday-dinner", label: "Sunday Dinner" },
  { value: "community-support", label: "Community support" },
  { value: "other", label: "Other" },
] as const;

export type ContactTopicValue = (typeof contactTopics)[number]["value"];

const topicLabels = new Map<string, string>(
  contactTopics.map((topic) => [topic.value, topic.label]),
);

export function getContactTopicLabel(topic: ContactTopicValue): string {
  return topicLabels.get(topic) ?? topic;
}

export function isContactTopicValue(value: string): value is ContactTopicValue {
  return topicLabels.has(value);
}
