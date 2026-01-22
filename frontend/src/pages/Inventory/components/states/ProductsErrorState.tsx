interface Props {
  message: string;
}

export default function ProductsErrorState({ message }: Props) {
  return (
    <div className="p-6 text-center text-red-600 bg-red-50 dark:bg-red-950/30 rounded-lg">
      {message}
    </div>
  );
}