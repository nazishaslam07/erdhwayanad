import { motion } from "framer-motion";

const PrincipleCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay }}
    className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border"
  >
    <Icon className="w-6 h-6 text-primary mb-3" strokeWidth={1.5} />
    <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
      {title}
    </h4>
    <p className="font-body text-sm text-muted-foreground leading-relaxed">
      {description}
    </p>
  </motion.div>
);

export default PrincipleCard;
