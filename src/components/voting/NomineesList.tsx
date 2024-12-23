import React from "react";
import { NomineeCard } from "@/components/NomineeCard";
import { Category } from "@/types/airtable";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

interface NomineesListProps {
  category: Category;
  selections: Record<string, string>;
  onVote: (nomineeId: string) => void;
}

export const NomineesList = ({ category, selections, onVote }: NomineesListProps) => {
  const queryClient = useQueryClient();
  const nominees = Array.isArray(category?.nominees) ? category.nominees : [];

  // Préchargement des données de la catégorie suivante
  React.useEffect(() => {
    if (category?.id) {
      queryClient.prefetchQuery({
        queryKey: ['categories', category.id],
        queryFn: async () => {
          const { data, error } = await supabase
            .from('categories')
            .select(`
              id,
              name,
              nominees (
                id,
                name,
                description,
                image_url
              )
            `)
            .eq('id', category.id)
            .single();

          if (error) throw error;
          return data;
        },
      });
    }
  }, [category?.id, queryClient]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-12 px-8 sm:px-12 max-w-7xl mx-auto mt-12"
    >
      {nominees.map((nominee) => (
        <motion.div
          key={nominee.id}
          variants={item}
          className="w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          layoutId={`nominee-${nominee.id}`}
        >
          <NomineeCard
            nominee={nominee}
            isSelected={selections[category?.id || ""] === nominee.id}
            onSelect={onVote}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};