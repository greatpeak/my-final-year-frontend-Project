import cancer from "./assets/icon-park-outline_cancer.svg";
import diabetes from "./assets/healthicons_diabetes-measure-outline.svg";
import malaria from "./assets/healthicons_malaria-pf-microscope-outline.svg";
import {
  Heart,
  Wind,
  Scale,
  Brain,
  Bone,
  Activity,
  Droplet,
  Stethoscope,
  Shield,
  Thermometer,
  Syringe,
  type LucideIcon,
} from "lucide-react";

interface Topic {
  img: string;
  name: string;
  description: string;
  icon?: LucideIcon;
  gradient: string;
}

export const topics: Topic[] = [
  {
    img: cancer,
    name: "Cancer",
    description: "Know more about cancer, symptoms and effects.",
    icon: Activity,
    gradient: "from-red-500 to-pink-600",
  },
  {
    img: diabetes,
    name: "Diabetes",
    description: "Know the stages of diabetes, causes and effects.",
    icon: Syringe,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    img: malaria,
    name: "Aids",
    description: "Difference between AIDS and HIV.",
    icon: Shield,
    gradient: "from-purple-500 to-violet-600",
  },
  {
    img: malaria,
    name: "Malaria",
    description: "Fast treatment, prevention, and control.",
    icon: Thermometer,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    img: cancer,
    name: "Tuberculosis",
    description: "Symptoms, prevention, and treatment of tuberculosis.",
    icon: Stethoscope,
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    img: diabetes,
    name: "Heart Disease",
    description: "Learn about heart disease, risk factors, and prevention.",
    icon: Heart,
    gradient: "from-rose-500 to-red-600",
  },
  {
    img: malaria,
    name: "Asthma",
    description: "Symptoms, triggers, and management of asthma.",
    icon: Wind,
    gradient: "from-sky-500 to-blue-600",
  },
  {
    img: cancer,
    name: "Obesity",
    description: "Understanding obesity and how to manage it effectively.",
    icon: Scale,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    img: diabetes,
    name: "Stroke",
    description: "Early signs, risk factors, and treatments for stroke.",
    icon: Brain,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    img: malaria,
    name: "Arthritis",
    description: "Types, causes, and treatments for arthritis.",
    icon: Bone,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    img: cancer,
    name: "Depression",
    description: "Recognizing depression and how to seek help.",
    icon: Brain,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    img: diabetes,
    name: "Hepatitis",
    description: "Learn about different types of hepatitis and prevention.",
    icon: Droplet,
    gradient: "from-orange-500 to-red-500",
  },
];
