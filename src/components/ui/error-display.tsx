interface ErrorDisplayProps {
  title: string;
  description: string;
}

export const ErrorDisplay = ({ title, description }: ErrorDisplayProps) => (
  <div className="text-center py-10">
    <h2 className="text-2xl font-bold text-red-600">
      {title}
    </h2>
    <p className="text-gray-600 mt-2">
      {description}
    </p>
  </div>
);