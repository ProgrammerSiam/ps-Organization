import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { CheckCircle, Clock, Crown, User } from "lucide-react";

export const categories = [
  {
    value: "income",
    label: "Income",
  },
  {
    value: "food",
    label: "Food",
  },
  {
    value: "utilities",
    label: "Utilities",
  },
  {
    value: "housing",
    label: "Housing",
  },
  {
    value: "health",
    label: "Health",
  },
  {
    value: "transport",
    label: "Transport",
  },
  {
    value: "work",
    label: "Work",
  },
  {
    value: "entertainment",
    label: "Entertainment",
  },
  {
    value: "education",
    label: "Education",
  },
  {
    value: "gifts",
    label: "Gifts",
  },
];

export const incomeType = [
  {
    label: "Income",
    value: "income",
    icon: ArrowUpIcon,
  },
  {
    label: "Expense",
    value: "expense",
    icon: ArrowDownIcon,
  },
];

export const statuses = [
  {
    value: "Joined",
    label: "Joined",
    icon: CheckCircle,
  },
  {
    value: "Pending",
    label: "Pending",
    icon: Clock,
  },
];

export const roles = [
  {
    value: "Owner",
    label: "Owner",
    icon: Crown,
  },
  {
    value: "Member",
    label: "Member",
    icon: User,
  },
];
