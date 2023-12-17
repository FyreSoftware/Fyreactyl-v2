import { Badge, Group, Paper, type PaperProps, Text } from "@mantine/core";
import classes from "./stats.module.css";
import Surface from "../Surface/Surface";

type StatsCardProps = {
  data: { title: string; value: string; period?: string };
} & PaperProps;

const StatsCard = ({ data, ...others }: StatsCardProps) => {
  const { title, value, period } = data;

  return (
    <Surface component={Paper} {...others}>
      <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.title}>
          {title}
        </Text>
        {period && (
          <Badge variant="filled" radius="sm">
            {period}
          </Badge>
        )}
      </Group>

      <Group align="flex-end" gap="xs" mt={25}>
        <Text className={classes.value}>{value}</Text>
      </Group>
    </Surface>
  );
};

export default StatsCard;
